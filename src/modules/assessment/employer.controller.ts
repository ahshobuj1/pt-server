import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'prisma/generated/prisma/enums';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccessGuard } from 'src/common/guards/access.guard';

@Controller('assessment/employer')
@UseGuards(AccessGuard, RolesGuard)
@Roles(UserRole.EMPLOYER)
export class EmployerController {
  constructor(private assessmentService: AssessmentService) {}

  @Post('exams')
  async createExam(@Req() req: any, @Body() dto: CreateExamDto) {
    return this.assessmentService.createExam(req.user.id, dto);
  }

  @Get('exams')
  async getExams(@Req() req: any) {
    return this.assessmentService.getEmployerExams(req.user.id);
  }

  @Patch('exams/:id')
  async updateExam(@Req() req: any, @Param('id') id: string, @Body() dto: Partial<CreateExamDto>) {
    return this.assessmentService.updateExam(id, req.user.id, dto);
  }

  @Delete('exams/:id')
  async deleteExam(@Req() req: any, @Param('id') id: string) {
    return this.assessmentService.deleteExam(id, req.user.id);
  }

  @Post('questions')
  async createQuestion(@Body() dto: CreateQuestionDto) {
    return this.assessmentService.createQuestion(dto);
  }
}
