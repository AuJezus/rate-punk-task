import NextLink from "next/link";
import type { ComponentProps } from "react";

type NextLinkProps = ComponentProps<typeof NextLink>;

export default function Link({ href, target, rel, ...rest }: NextLinkProps) {
  const isExternal = /^https?:\/\//i.test(href.toString());
  const finalTarget = target ?? (isExternal ? "_blank" : undefined);
  const finalRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

  return <NextLink href={href} target={finalTarget} rel={finalRel} {...rest} />;
}
