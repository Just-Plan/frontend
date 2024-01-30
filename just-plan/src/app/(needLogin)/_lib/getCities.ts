export async function getCities() {
  const res = await fetch(`http://13.125.188.226:8080/api/cities/random/10`, {
    // next: { tags: ["trends"] },
    // cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
