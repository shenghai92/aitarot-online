(() => {
  const proxyPath = "/api/ga4-proxy";
  const gaHosts = new Set([
    "www.google-analytics.com",
    "region1.google-analytics.com",
    "region2.google-analytics.com"
  ]);

  function toProxyUrl(input) {
    try {
      const url = new URL(input, window.location.origin);
      if (!gaHosts.has(url.hostname) || !url.pathname.endsWith("/g/collect")) {
        return null;
      }
      return `${proxyPath}${url.search}`;
    } catch {
      return null;
    }
  }

  const originalSendBeacon = navigator.sendBeacon?.bind(navigator);
  if (originalSendBeacon) {
    navigator.sendBeacon = (url, data) => {
      const proxyUrl = toProxyUrl(url);
      if (!proxyUrl) return originalSendBeacon(url, data);
      try {
        return originalSendBeacon(proxyUrl, data);
      } catch {
        fetch(proxyUrl, {
          method: "POST",
          body: data,
          keepalive: true,
          credentials: "omit",
          mode: "cors"
        }).catch(() => {});
        return true;
      }
    };
  }

  const originalFetch = window.fetch?.bind(window);
  if (originalFetch) {
    window.fetch = (input, init) => {
      const requestUrl = typeof input === "string" ? input : input?.url;
      const proxyUrl = toProxyUrl(requestUrl);
      if (!proxyUrl) return originalFetch(input, init);

      if (typeof input === "string") {
        return originalFetch(proxyUrl, init);
      }

      return originalFetch(
        new Request(proxyUrl, input instanceof Request ? input : undefined),
        init
      );
    };
  }

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function open(method, url, ...rest) {
    const proxyUrl = toProxyUrl(url);
    return originalOpen.call(this, method, proxyUrl || url, ...rest);
  };
})();
