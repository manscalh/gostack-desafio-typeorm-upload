import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome',
  category: string,
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {

    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionRepository.getBalance();

    if( type === "outcome" && total < value){
      throw new AppError("You do not have enough balance.");
    }

    let tbcategory = await categoryRepository.findOne({ where: { title: category } })

    if (category !== undefined) {
      if (!tbcategory) {
        tbcategory = categoryRepository.create({
          title: category,
        });

        await categoryRepository.save(tbcategory);
      }
    }


    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: tbcategory,
    });

    await transactionRepository.save(transaction);

    return transaction;

  }
}

export default CreateTransactionService;
