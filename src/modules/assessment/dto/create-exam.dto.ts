import { IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {
  @ApiProperty({ example: 'Fullstack Developer Assessment' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  totalCandidates: number;

  @ApiProperty({ example: 50 })
  @IsInt()
  totalSlots: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  questionSets: number;

  @ApiProperty({ example: '2026-04-11T10:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '2026-04-11T12:00:00Z' })
  @IsDateString()
  endTime: string;

  @ApiProperty({ example: 60 })
  @IsInt()
  duration: number;
}
