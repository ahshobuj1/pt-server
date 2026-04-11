import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        role: dto.role || 'CANDIDATE',
      },
    });
    const accessToken = await this.generateToken(user);
    return { user, accessToken };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateToken(user);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }

  async generateToken(user: any) {
    return this.jwt.signAsync(
      { id: user.id, email: user.email, role: user.role },
      {
        secret:
          this.configService.get<string>('ACCESS_TOKEN_SECRET') || 'secret',
        expiresIn: (this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN') ||
          '1d') as any,
      },
    );
  }
}
