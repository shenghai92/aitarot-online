export async function onRequestGet(context) {
  return proxyGa4Request(context.request);
}

export async function onRequestPost(context) {
  return proxyGa4Request(context.request);
}

async function proxyGa4Request(request) {
  const url = new URL(request.url);
  const upstreamUrl = new URL("https://www.google-analytics.com/g/collect");

  for (const [key, value] of url.searchParams) {
    upstreamUrl.searchParams.set(key, value);
  }

  const headers = new Headers();
  const userAgent = request.headers.get("user-agent");
  const contentType = request.headers.get("content-type");

  if (userAgent) headers.set("user-agent", userAgent);
  if (contentType) headers.set("content-type", contentType);

  const init = {
    method: request.method,
    headers,
    redirect: "follow"
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const upstream = await fetch(upstreamUrl.toString(), init);

  return new Response(null, {
    status: upstream.status || 204,
    headers: {
      "access-control-allow-origin": "*",
      "cache-control": "no-store"
    }
  });
}
