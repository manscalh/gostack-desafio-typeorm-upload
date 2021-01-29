import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id:number): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    let transaction = await transactionRepository.findOne(id);

    if(!transaction){
      throw new AppError('no exists transaction to delete');
    }

    await transactionRepository.delete(transaction);

  }
}

export default DeleteTransactionService;
