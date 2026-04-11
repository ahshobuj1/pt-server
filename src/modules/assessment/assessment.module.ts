import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { EmployerController } from './employer.controller';
import { CandidateController } from './candidate.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployerController, CandidateController],
  providers: [AssessmentService],
  exports: [AssessmentService],
})
export class AssessmentModule {}
