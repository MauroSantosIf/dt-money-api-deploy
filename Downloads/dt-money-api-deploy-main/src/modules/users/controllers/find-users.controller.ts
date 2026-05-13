import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserQueryDTO } from '../dto/find-user-query.dto';
import { FindUsersService } from '../services/find-users.service';

@ApiTags('users')
@Controller('users')
export class FindUsersController {
  constructor(private readonly findUsersService: FindUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar usuários ou buscar por nome/email' })
  @ApiQuery({ name: 'name', required: false, example: 'Mauro' })
  @ApiQuery({ name: 'email', required: false, example: 'mauro@email.com' })
  @ApiResponse({ status: 200, description: 'Usuários retornados com sucesso.' })
  async handle(@Query() query: FindUserQueryDTO) {
    return this.findUsersService.execute(query);
  }
}
