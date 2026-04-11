import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SubmitAttemptDto } from './dto/submit-attempt.dto';

@Injectable()
export class AssessmentService {
  constructor(private prisma: PrismaService) {}

  async createExam(employerId: string, dto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        ...dto,
        employerId,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      },
    });
  }

  async getEmployerExams(employerId: string) {
    return this.prisma.exam.findMany({
      where: { employerId },
      include: { _count: { select: { questions: true, attempts: true } } },
    });
  }

  async updateExam(id: string, employerId: string, dto: Partial<CreateExamDto>) {
    return this.prisma.exam.update({
      where: { id, employerId },
      data: {
        ...dto,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
      },
    });
  }

  async deleteExam(id: string, employerId: string) {
    return this.prisma.exam.delete({
      where: { id, employerId },
    });
  }

  async createQuestion(dto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: dto,
    });
  }

  async getAvailableExams() {
    return this.prisma.exam.findMany({
      where: {
        endTime: { gt: new Date() },
      },
    });
  }

  async getExamQuestions(examId: string) {
    return this.prisma.question.findMany({
      where: { examId },
      select: {
        id: true,
        questionTitle: true,
        type: true,
        options: true,
      },
    });
  }

  async submitAttempt(candidateId: string, dto: SubmitAttemptDto) {
    const questions = await this.prisma.question.findMany({
      where: { examId: dto.examId },
    });

    let score = 0;
    questions.forEach((q) => {
      const submitted = dto.answers.find((a) => a.questionId === q.id);
      if (submitted && submitted.answer === q.correctAnswer) {
        score++;
      }
    });

    return this.prisma.attempt.create({
      data: {
        candidateId,
        examId: dto.examId,
        score,
        tabSwitchCount: dto.tabSwitchCount,
        fullscreenExitCount: dto.fullscreenExitCount,
        isSubmitted: true,
      },
    });
  }
}
