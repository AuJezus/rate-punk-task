"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PiggyBankIllustration from "@/public/piggy-bank.svg";
import { Typography } from "./ui/typography";
import { useCreateReferralLink } from "@/data/referral-link./hooks";

export function ReferFriends() {
  const [email, setEmail] = useState("");
  const createReferralLink = useCreateReferralLink();

  useEffect(() => {
    if (createReferralLink.isSuccess) {
      setEmail("");
    }
  }, [createReferralLink.isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    createReferralLink.mutate({ ownerEmail: email });
  };

  return (
    <section className="flex w-full flex-col items-center rounded-[0.5rem] bg-white px-4 py-12 text-center">
      <PiggyBankIllustration className="mb-8" />

      <Typography as="h2" variant="h2" className="mb-4 text-center">
        Refer friends and get rewards
      </Typography>

      <Typography className="mb-8 max-w-152">
        Refer your friends to us and earn hotel booking vouchers. We'll give you
        1 coin for each friend that installs our extension. Minimum cash-out at
        20 coins.
      </Typography>

      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-4 md:max-w-120 md:flex-row md:gap-0">
          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
            className="md:rounded-l-[0.5rem]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            className="disabled:bg-accent rounded-l-none disabled:opacity-100 md:h-auto md:max-w-40"
            disabled={createReferralLink.isPending}
          >
            Get Link
          </Button>
        </div>

        {createReferralLink.isError && (
          <Typography className="text-destructive mt-2 text-left text-[0.75rem] leading-4">
            {(createReferralLink.error as Error).message}
          </Typography>
        )}
        {createReferralLink.isSuccess && (
          <Typography className="mt-2 text-left text-[0.75rem] leading-4 text-green-600">
            Link created for {createReferralLink.data.ownerEmail}
          </Typography>
        )}
      </form>
    </section>
  );
}
