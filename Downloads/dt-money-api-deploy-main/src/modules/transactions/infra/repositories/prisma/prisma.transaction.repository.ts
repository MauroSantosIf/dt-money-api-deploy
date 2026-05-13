import { Injectable } from "@nestjs/common";
import { CreateTransactionDTO } from "../../../dto/create-transaction.dto";
import { FindTransactionsQueryDTO } from "../../../dto/find-transactions-query.dto";
import { UpdateTransactionDTO } from "../../../dto/update-transaction.dto";
import { ITransactionRepository } from "../transaction.repository.abstract";
import { PrismaService } from "src/shared/prisma.service";

@Injectable()
export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTransactionDTO) {
    return this.prisma.transaction.create({ data });
  }

  async findAll(filters?: FindTransactionsQueryDTO) {
    return this.prisma.transaction.findMany({
      where: {
        ...(filters?.type ? { type: filters.type } : {}),
        ...((filters?.startDate || filters?.endDate)
          ? {
              data: {
                ...(filters.startDate ? { gte: filters.startDate } : {}),
                ...(filters.endDate ? { lte: filters.endDate } : {}),
              },
            }
          : {}),
      },
      orderBy: { data: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  async delete(id: string) {
    await this.prisma.transaction.delete({ where: { id } });
  }

  async update(id: string, data: UpdateTransactionDTO) {
    return this.prisma.transaction.update({ where: { id }, data });
  }
}
