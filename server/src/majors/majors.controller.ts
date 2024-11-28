import { Controller, Get } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { Major } from '@prisma/client';

@Controller('majors')
export class MajorsController {
  constructor(
    private majorsService: MajorsService
  ) {}

  @Get()
  async getAllMajors() {
    return ["Informatika", "Sistem Informasi", "Bisnis Digital", "Manajemen", "Akuntansi", "Sistem Informasi Akuntansi"]
  }
}
