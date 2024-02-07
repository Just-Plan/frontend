export async function getPlanInfo(planId: string) {
  const res = await fetch(`http://13.125.188.226:8080/api/plan/${planId}`, {
    // next: { tags: ["trends"] },
    // cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
