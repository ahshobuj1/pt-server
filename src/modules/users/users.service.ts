import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryBuilder } from 'src/common/builder/QueryBuilder';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        role: createUserDto.role || 'CANDIDATE',
      },
    });
  }

  async findAll(query: Record<string, any>) {
    const queryBuilder = new QueryBuilder(this.prisma.user, query)
      .search(['email', 'name'])
      .filter()
      .sort()
      .pagination();

    const users = await queryBuilder.exec();
    const meta = await queryBuilder.countTotal();

    return {
      data: users,
      meta,
    };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
