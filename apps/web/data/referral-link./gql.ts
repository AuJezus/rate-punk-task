import { gqlT, withGqlMapping } from "@/lib/gql";
import {
  CreateReferralLinkInput,
  CreateReferralLinkMutation,
  ReferralLinksQuery,
} from "./types";

export const GET_REFERRAL_LINKS = withGqlMapping(
  gqlT<ReferralLinksQuery>`
    query referralLinks {
      referralLinks {
        id
        ownerEmail
        createdAt
        updatedAt
      }
    }
  `,
  {
    select: (d) => d.referralLinks,
  },
);

export const CREATE_REFERRAL_LINK = withGqlMapping(
  gqlT<
    CreateReferralLinkMutation,
    { createReferralLinkInput: CreateReferralLinkInput }
  >`
    mutation createReferralLink($createReferralLinkInput: CreateReferralLinkInput!) {
      createReferralLink(createReferralLinkInput: $createReferralLinkInput) {
        id
        ownerEmail
      }
    }
  `,
  {
    select: (d) => d.createReferralLink,
    mapVariables: (v: CreateReferralLinkInput) => ({
      createReferralLinkInput: v,
    }),
  },
);
