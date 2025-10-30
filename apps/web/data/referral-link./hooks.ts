import { CREATE_REFERRAL_LINK, GET_REFERRAL_LINKS } from "./gql";
import { useGqlMutation, useGqlQuery } from "@/lib/gql-query-helpers";

export const useCreateReferralLink = () =>
  useGqlMutation({
    key: ["createReferralLink"],
    document: CREATE_REFERRAL_LINK,
  });

export const useReferralLinks = () =>
  useGqlQuery({
    key: ["referralLinks"],
    document: GET_REFERRAL_LINKS,
  });
