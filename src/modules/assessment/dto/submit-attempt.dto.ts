import { IsNotEmpty, IsUUID, IsInt, IsBoolean, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class UserAnswerDto {
  @ApiProperty({ example: 'question-uuid' })
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ example: 'Selected Answer' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class SubmitAttemptDto {
  @ApiProperty({ example: 'exam-uuid' })
  @IsUUID()
  @IsNotEmpty()
  examId: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  tabSwitchCount: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  fullscreenExitCount: number;

  @ApiProperty({ type: [UserAnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserAnswerDto)
  answers: UserAnswerDto[];
}
