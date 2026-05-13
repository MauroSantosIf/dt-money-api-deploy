import { CreateUserService } from './create-user.service';
import { DeleteUserService } from './delete-user.service';
import { FindUserByIdService } from './find-user-by-id.service';
import { FindUsersService } from './find-users.service';
import { HashPasswordService } from './hash-password.service';
import { UpdateUserService } from './update-user.service';

export const userServices = [
  CreateUserService,
  DeleteUserService,
  FindUserByIdService,
  FindUsersService,
  HashPasswordService,
  UpdateUserService,
];
