import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserByIdService } from '../services/find-user-by-id.service';

@ApiTags('users')
@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserByIdService: FindUserByIdService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async handle(@Param('id') id: string) {
    return this.findUserByIdService.execute(id);
  }
}
