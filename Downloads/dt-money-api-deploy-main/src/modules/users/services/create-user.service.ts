import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { HashPasswordService } from './hash-password.service';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await this.hashPasswordService.execute(data.password);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}
