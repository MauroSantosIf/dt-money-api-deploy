import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDTO } from 'src/modules/users/dto/update-user.dto';
import { IUserRepository } from 'src/modules/users/infra/repositories/user.repository.abstract';
import { PrismaService } from 'src/shared/prisma.service';

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({ data, select: userSelect });
  }

  async findAll() {
    return this.prisma.user.findMany({ select: userSelect, orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id }, select: userSelect });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }, select: userSelect });
  }

  async findByNameOrEmail(filters: { name?: string; email?: string }) {
    return this.prisma.user.findMany({
      where: {
        AND: [
          filters.name ? { name: { contains: filters.name, mode: 'insensitive' } } : {},
          filters.email ? { email: { contains: filters.email, mode: 'insensitive' } } : {},
        ],
      },
      select: userSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: UpdateUserDTO) {
    return this.prisma.user.update({ where: { id }, data, select: userSelect });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}
