import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { ReimbursementModule } from './reimbursement/reimbursement.module';
import { TeamsModule } from './teams/teams.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [UsersModule, CompetitionsModule, ReimbursementModule, TeamsModule, AchievementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
