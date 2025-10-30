import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ReferralLinkEntity {
  @Field(() => Int)
  id: number;

  @Field()
  ownerEmail: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
