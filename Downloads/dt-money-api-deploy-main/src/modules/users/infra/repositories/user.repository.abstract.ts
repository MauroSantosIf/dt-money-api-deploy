import { CreateUserDTO } from '../../dto/create-user.dto';
import { UpdateUserDTO } from '../../dto/update-user.dto';

export type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export abstract class IUserRepository {
  abstract create(data: CreateUserDTO): Promise<UserWithoutPassword>;
  abstract findAll(): Promise<UserWithoutPassword[]>;
  abstract findById(id: string): Promise<UserWithoutPassword | null>;
  abstract findByEmail(email: string): Promise<UserWithoutPassword | null>;
  abstract findByNameOrEmail(filters: { name?: string; email?: string }): Promise<UserWithoutPassword[]>;
  abstract update(id: string, data: UpdateUserDTO): Promise<UserWithoutPassword>;
  abstract delete(id: string): Promise<void>;
}
