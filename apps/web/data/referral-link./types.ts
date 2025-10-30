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
