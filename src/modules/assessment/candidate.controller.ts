import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { SubmitAttemptDto } from './dto/submit-attempt.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'prisma/generated/prisma/enums';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccessGuard } from 'src/common/guards/access.guard';

@Controller('assessment/candidate')
@UseGuards(AccessGuard, RolesGuard)
@Roles(UserRole.CANDIDATE)
export class CandidateController {
  constructor(private assessmentService: AssessmentService) {}

  @Get('exams')
  async getExams() {
    return this.assessmentService.getAvailableExams();
  }

  @Get('exams/:id/questions')
  async getQuestions(@Param('id') id: string) {
    return this.assessmentService.getExamQuestions(id);
  }

  @Post('submit')
  async submit(@Req() req: any, @Body() dto: SubmitAttemptDto) {
    return this.assessmentService.submitAttempt(req.user.id, dto);
  }
}
