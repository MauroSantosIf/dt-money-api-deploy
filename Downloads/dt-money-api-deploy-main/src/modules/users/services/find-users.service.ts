import { Injectable } from '@nestjs/common';
import { FindUserQueryDTO } from '../dto/find-user-query.dto';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';

@Injectable()
export class FindUsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(filters: FindUserQueryDTO) {
    if (filters.name || filters.email) {
      return this.userRepository.findByNameOrEmail(filters);
    }

    return this.userRepository.findAll();
  }
}
