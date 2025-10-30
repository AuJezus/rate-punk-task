import { gqlT } from "@/lib/graphql/gqlT";

export type ReferralLink = {
  id: string;
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type ReferralLinksQuery = {
  referralLinks: ReferralLink[];
};

export type CreateReferralLinkInput = {
  ownerEmail: string;
};

export type CreateReferralLinkMutation = {
  createReferralLink: ReferralLink;
};

export const GET_REFERRAL_LINKS = gqlT<ReferralLinksQuery>`
  query referralLinks {
    referralLinks {
      id
      ownerEmail
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_REFERRAL_LINK = gqlT<
  CreateReferralLinkMutation,
  { createReferralLinkInput: CreateReferralLinkInput }
>`
  mutation createReferralLink($createReferralLinkInput: CreateReferralLinkInput!) {
    createReferralLink(createReferralLinkInput: $createReferralLinkInput) {
      id
      ownerEmail
      createdAt
      updatedAt
    }
  }
`;
