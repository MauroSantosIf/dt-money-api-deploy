import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { HashPasswordService } from './hash-password.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(id: string, data: UpdateUserDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email && data.email !== user.email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(data.email);

      if (emailAlreadyExists) {
        throw new ConflictException('Email already registered');
      }
    }

    const dataToUpdate = { ...data };

    if (data.password) {
      dataToUpdate.password = await this.hashPasswordService.execute(data.password);
    }

    return this.userRepository.update(id, dataToUpdate);
  }
}
