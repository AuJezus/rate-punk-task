"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PiggyBankIllustration from "@/public/piggy-bank.svg";
import { Typography } from "./ui/typography";

export function ReferFriends() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
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

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <Input
          name="email"
          type="email"
          label="Email address"
          placeholder="Enter your email address"
        />

        <Button type="submit">Get Link</Button>
      </form>
    </section>
  );
}
