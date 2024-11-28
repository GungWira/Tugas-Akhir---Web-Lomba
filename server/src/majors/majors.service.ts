import { Injectable } from '@nestjs/common';
import { Major } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MajorsService {
  constructor(private prisma: PrismaService) {}
  async getAllMajor(): Promise<Major[]> {
    return this.prisma.major.findMany()
  }
}
