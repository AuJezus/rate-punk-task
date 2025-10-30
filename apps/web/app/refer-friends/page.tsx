import { ReferFriends } from "@/components/refer-friends";
import { HowItWorks } from "@/components/how-it-works";
import { Typography } from "@/components/ui/typography";
import { FAQ } from "@/components/faq";

export default function ReferFriendsPage() {
  return (
    <>
      <Typography as="h1" variant="h1">
        Refer Friends and Get Real Rewards
      </Typography>

      <ReferFriends />
      <HowItWorks />
      <FAQ />
    </>
  );
}
