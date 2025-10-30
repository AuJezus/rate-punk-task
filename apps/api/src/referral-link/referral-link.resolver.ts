import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReferralLinkService } from './referral-link.service';
import { ReferralLinkEntity } from './referral-link.entity';
import { CreateReferralLinkInput } from './dto/create-referral-link.input';

@Resolver(() => ReferralLinkEntity)
export class ReferralLinkResolver {
  constructor(private readonly referralLinkService: ReferralLinkService) {}

  @Mutation(() => ReferralLinkEntity)
  createReferralLink(
    @Args('createReferralLinkInput')
    createReferralLinkInput: CreateReferralLinkInput,
  ) {
    return this.referralLinkService.create(createReferralLinkInput);
  }

  @Query(() => [ReferralLinkEntity], { name: 'referralLinks' })
  findAll() {
    return this.referralLinkService.findAll();
  }
}
