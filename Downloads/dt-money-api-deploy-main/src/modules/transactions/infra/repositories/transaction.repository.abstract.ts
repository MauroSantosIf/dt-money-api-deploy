import { CreateTransactionDTO } from "../../dto/create-transaction.dto";
import { UpdateTransactionDTO } from "../../dto/update-transaction.dto";
import { FindTransactionsQueryDTO } from "../../dto/find-transactions-query.dto";

export abstract class ITransactionRepository {
   abstract create(data: CreateTransactionDTO); 
   abstract findAll(filters?: FindTransactionsQueryDTO); 
   abstract findById(id: string);
   abstract delete(id: string);
   abstract update(id: string, data: UpdateTransactionDTO);
}