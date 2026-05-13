import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UpdateUserService } from '../services/update-user.service';

@ApiTags('users')
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado.' })
  async handle(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return this.updateUserService.execute(id, data);
  }
}
