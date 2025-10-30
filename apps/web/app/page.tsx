import { Button } from "@/components/ui/button";
import { GET_REFERRAL_LINKS } from "@/data/referral-link./gql";
import { fetchGQLMapped } from "@/lib/gql";
import Link from "next/link";

export default async function Home() {
  const data = await fetchGQLMapped(GET_REFERRAL_LINKS);

  return (
    <div className="mt-8 text-center">
      <h1 className="mb-4 text-4xl font-bold">Rate Punk task</h1>

      <Button asChild className="mb-8">
        <Link href="/refer-friends">Go to refer friends page</Link>
      </Button>

      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">{`Referral links (${data.length}):`}</p>

        <div className="flex flex-col gap-2 text-lg">
          {data.map((link) => (
            <p>{link.ownerEmail}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
