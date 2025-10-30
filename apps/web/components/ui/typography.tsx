import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[2rem] leading-10 font-bold",
      h2: "text-2xl leading-8 font-semibold",
      h3: "font-bree text-[2.75rem] leading-[1.2] tracking-[-1%]",
      h4: "font-bree text-2xl xl:text-3xl",
      h5: "font-bree text-2xl",
      tagline: "font-base font-semibold",
      lg: "text-base xl:text-lg",
      base: "text-base leading-6",
      sm: "text-sm leading-5",
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

export function Typography({
  className,
  variant,
  as: Component = "p",
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }) {
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}
