import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { HashPasswordService } from './hash-password.service';
import { UpdateUserService } from './update-user.service';

describe('UpdateUserService', () => {
  let service: UpdateUserService;

  const userRepository = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
  };

  const hashPasswordService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        { provide: IUserRepository, useValue: userRepository },
        { provide: HashPasswordService, useValue: hashPasswordService },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    jest.clearAllMocks();
  });

  it('should update a user and hash password when password is sent', async () => {
    const currentUser = { id: 'user-id', name: 'Mauro', email: 'old@email.com' };
    const updatedUser = { ...currentUser, email: 'new@email.com' };

    userRepository.findById.mockResolvedValue(currentUser);
    userRepository.findByEmail.mockResolvedValue(null);
    hashPasswordService.execute.mockResolvedValue('new-hashed-password');
    userRepository.update.mockResolvedValue(updatedUser);

    const result = await service.execute('user-id', {
      email: 'new@email.com',
      password: '12345678',
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith('new@email.com');
    expect(hashPasswordService.execute).toHaveBeenCalledWith('12345678');
    expect(userRepository.update).toHaveBeenCalledWith('user-id', {
      email: 'new@email.com',
      password: 'new-hashed-password',
    });
    expect(result).toEqual(updatedUser);
  });

  it('should throw not found when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(service.execute('wrong-id', { name: 'Novo nome' })).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw conflict when new email already exists', async () => {
    userRepository.findById.mockResolvedValue({ id: 'user-id', email: 'old@email.com' });
    userRepository.findByEmail.mockResolvedValue({ id: 'other-user-id', email: 'new@email.com' });

    await expect(service.execute('user-id', { email: 'new@email.com' })).rejects.toBeInstanceOf(ConflictException);
  });
});
