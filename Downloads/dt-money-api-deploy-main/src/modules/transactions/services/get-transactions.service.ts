import { Injectable } from "@nestjs/common";
import { ITransactionRepository } from "src/modules/transactions/infra/repositories/transaction.repository.abstract";
import { FindTransactionsQueryDTO } from "../dto/find-transactions-query.dto";
@Injectable()
export class GetTransactionsService {
  constructor( private readonly transactionRepository: ITransactionRepository){

  }
  async execute(filters?: FindTransactionsQueryDTO) {
    const transactions = await this.transactionRepository.findAll(filters);
    
    return transactions;
  }
}
