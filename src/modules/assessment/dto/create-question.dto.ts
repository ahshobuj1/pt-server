import { IsNotEmpty, IsString, IsEnum, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from 'prisma/generated/prisma/enums';

export class CreateQuestionDto {
  @ApiProperty({ example: 'uuid-of-exam' })
  @IsUUID()
  @IsNotEmpty()
  examId: string;

  @ApiProperty({ example: 'What is NestJS?' })
  @IsString()
  @IsNotEmpty()
  questionTitle: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.RADIO })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type: QuestionType;

  @ApiProperty({ example: ['A Framework', 'A Library', 'A Database', 'A Language'] })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @ApiProperty({ example: 'A Framework' })
  @IsString()
  @IsNotEmpty()
  correctAnswer: string;
}
