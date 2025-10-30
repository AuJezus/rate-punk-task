import { Link2Icon, GiftIcon, EyeIcon } from "lucide-react";
import { Typography } from "./ui/typography";

const steps = [
  {
    icon: Link2Icon,
    title: "Share your link",
    description:
      "Invite your friends to join RatePunk using your personal referral link.",
  },
  {
    icon: GiftIcon,
    title: "Earn $5 each",
    description:
      "You'll both receive $5 when your friend signs up for RatePunk using your referral link.",
  },
  {
    icon: EyeIcon,
    title: "Earn $10 rewards",
    description:
      "If your friend becomes a paid subscriber to RatePunk, you'll get an extra $10 reward.",
  },
];

export function HowItWorks() {
  return (
    <section>
      <Typography as="h2" variant="h2" className="mb-6">
        How it works?
      </Typography>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {steps.map((step) => (
          <div key={step.title} className="flex items-start gap-4">
            <div className="bg-accent rounded-[0.5rem] p-2">
              <step.icon className="size-6" />
            </div>

            <div className="flex flex-col gap-4">
              <Typography className="font-semibold">{step.title}</Typography>
              <Typography variant="sm" className="text-muted-foreground">
                {step.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
