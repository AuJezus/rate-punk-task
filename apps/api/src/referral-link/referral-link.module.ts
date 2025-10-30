import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReferralLinkResolver } from './referral-link.resolver';
import { ReferralLinkService } from './referral-link.service';

@Module({
  providers: [ReferralLinkResolver, ReferralLinkService, PrismaService],
})
export class ReferralLinkModule {}
