import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { CreateUserService } from './create-user.service';
import { HashPasswordService } from './hash-password.service';

describe('CreateUserService', () => {
  let service: CreateUserService;

  const userRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const hashPasswordService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: IUserRepository, useValue: userRepository },
        { provide: HashPasswordService, useValue: hashPasswordService },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    jest.clearAllMocks();
  });

  it('should create a user with hashed password', async () => {
    const dto = { name: 'Mauro Santos', email: 'mauro@email.com', password: '123456' };
    const createdUser = {
      id: 'user-id',
      name: dto.name,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.findByEmail.mockResolvedValue(null);
    hashPasswordService.execute.mockResolvedValue('hashed-password');
    userRepository.create.mockResolvedValue(createdUser);

    const result = await service.execute(dto);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(hashPasswordService.execute).toHaveBeenCalledWith(dto.password);
    expect(userRepository.create).toHaveBeenCalledWith({ ...dto, password: 'hashed-password' });
    expect(result).toEqual(createdUser);
  });

  it('should throw conflict when email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue({ id: 'user-id', email: 'mauro@email.com' });

    await expect(
      service.execute({ name: 'Mauro Santos', email: 'mauro@email.com', password: '123456' }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
