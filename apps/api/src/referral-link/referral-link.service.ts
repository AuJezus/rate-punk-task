import { Injectable, ConflictException } from '@nestjs/common';
import { CreateReferralLinkInput } from './dto/create-referral-link.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReferralLinkService {
  constructor(private prismaService: PrismaService) {}

  async create(createReferralLinkInput: CreateReferralLinkInput) {
    const existingSubscriber = await this.prismaService.referralLink.findUnique(
      {
        where: { ownerEmail: createReferralLinkInput.ownerEmail },
      },
    );

    if (existingSubscriber) {
      throw new ConflictException(`Email already has a referral link`);
    }

    return await this.prismaService.referralLink.create({
      data: {
        ownerEmail: createReferralLinkInput.ownerEmail,
      },
    });
  }

  findAll() {
    return this.prismaService.referralLink.findMany();
  }
}
