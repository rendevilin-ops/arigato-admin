export async function apiGet(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

export async function apiPost(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
}
