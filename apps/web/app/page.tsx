import { Button } from "@/components/ui/button";
import { GET_REFERRAL_LINKS } from "@/data/referral-link";
import { fetchGQL } from "@/lib/graphql/fetchGQL";
import Link from "next/link";

export default async function Home() {
  const data = await fetchGQL(GET_REFERRAL_LINKS);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Rate Punk task</h1>

      <Button asChild className="mb-8">
        <Link href="/refer-friends">Go to refer friends page</Link>
      </Button>

      <div className="flex flex-col items-center">
        <p className="font-semibold text-2xl">Referral links:</p>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
