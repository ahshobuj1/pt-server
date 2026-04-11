import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @ResponseMessage('User has been created successfully!')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @ResponseMessage('Login successfully!')
  async login(@Body() dto: any) {
    return this.auth.login(dto);
  }
}
