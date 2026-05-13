import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user.service';

@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email já cadastrado.' })
  @ApiBody({ type: CreateUserDTO })
  async handle(@Body() data: CreateUserDTO) {
    return this.createUserService.execute(data);
  }
}
