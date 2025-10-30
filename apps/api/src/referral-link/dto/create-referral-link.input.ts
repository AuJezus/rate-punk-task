import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateReferralLinkInput {
  @Field()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  ownerEmail: string;
}
