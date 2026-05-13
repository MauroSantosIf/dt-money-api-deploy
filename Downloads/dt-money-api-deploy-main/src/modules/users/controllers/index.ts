import { CreateUserController } from './create-user.controller';
import { DeleteUserController } from './delete-user.controller';
import { FindUserByIdController } from './find-user-by-id.controller';
import { FindUsersController } from './find-users.controller';
import { UpdateUserController } from './update-user.controller';

export const userControllers = [
  CreateUserController,
  DeleteUserController,
  FindUserByIdController,
  FindUsersController,
  UpdateUserController,
];
