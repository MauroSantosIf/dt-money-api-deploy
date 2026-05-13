import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../infra/repositories/user.repository.abstract';
import { FindUsersService } from './find-users.service';

describe('FindUsersService', () => {
  let service: FindUsersService;

  const userRepository = {
    findAll: jest.fn(),
    findByNameOrEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUsersService, { provide: IUserRepository, useValue: userRepository }],
    }).compile();

    service = module.get<FindUsersService>(FindUsersService);
    jest.clearAllMocks();
  });

  it('should list all users when filters are not sent', async () => {
    userRepository.findAll.mockResolvedValue([]);

    const result = await service.execute({});

    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should search by name or email when filters are sent', async () => {
    const filters = { name: 'Mauro', email: 'mauro@email.com' };
    userRepository.findByNameOrEmail.mockResolvedValue([]);

    await service.execute(filters);

    expect(userRepository.findByNameOrEmail).toHaveBeenCalledWith(filters);
  });
});
