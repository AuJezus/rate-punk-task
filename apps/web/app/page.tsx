import { GET_REFERRAL_LINKS } from "@/data/referral-link";
import { fetchGQL } from "@/lib/graphql/fetchGQL";

export default async function Home() {
  const data = await fetchGQL(GET_REFERRAL_LINKS);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
