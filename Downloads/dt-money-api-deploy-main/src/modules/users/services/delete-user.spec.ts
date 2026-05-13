import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { DeleteUserService } from './delete-user.service';

describe('DeleteUserService', () => {
  let service: DeleteUserService;

  const userRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUserService, { provide: IUserRepository, useValue: userRepository }],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    jest.clearAllMocks();
  });

  it('should delete an existing user', async () => {
    userRepository.findById.mockResolvedValue({ id: 'user-id' });

    await service.execute('user-id');

    expect(userRepository.delete).toHaveBeenCalledWith('user-id');
  });

  it('should throw not found when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(service.execute('wrong-id')).rejects.toBeInstanceOf(NotFoundException);
  });
});
