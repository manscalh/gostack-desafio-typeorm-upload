import { getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
import csvParse from 'csv-parse';
import fs from 'fs';
import Category from '../models/Category';

interface CSVTransaction {
  title: string,
  type: "income" | "outcome",
  value: number,
  category: string,
}

class ImportTransactionsService {

  async execute(filePath: string): Promise<Transaction[]> {

    const categoryRepository = getRepository(Category);
    const transactonRepository = getRepository(Transaction);

    const readFileCSV = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = readFileCSV.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async (line) => {
      const [title, type, value, category] = line.map((cell: string) => {
        return cell.trim();
      });

      if (!title || !type || !value) { return; }

      categories.push(category);

      transactions.push({ title, type, value, category });

    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const categoriesExists = await categoryRepository.find({
      where: {
        title: In(categories),
      }
    });

    const existentCategoriesTitles = categoriesExists.map(
      (category: Category) => {
        return category.title;
      }
    );

    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      .filter((elem, index, self) => index === self.indexOf(elem));

    const newCategories = categoryRepository.create(
      addCategoryTitles.map(
        title => ({ title })
      )
    );

    await categoryRepository.save(newCategories);

    const finalCategories = [...newCategories, ...categoriesExists];

    const newTransaction = transactonRepository.create(
      transactions.map(
        transaction => ({
          title: transaction.title,
          type: transaction.type,
          value: transaction.value,
          category: finalCategories.find(
            category => category.title === transaction.title
          )
        })
      )
    );

    await transactonRepository.save(newTransaction);

    await fs.promises.unlink(filePath);

    return newTransaction;

  }
}

export default ImportTransactionsService;
