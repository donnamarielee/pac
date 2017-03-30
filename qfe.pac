var proxy = {
  dev9501: "PROXY dev-proxy.db.rakuten.co.jp:9501",
  dev9502: "PROXY dev-proxy.db.rakuten.co.jp:9502",
  direct: "DIRECT",
  local80: "PROXY localhost:80",
  local443: "PROXY localhost:443",
  proxyIntl9511: "PROXY proxyintl101z.prod.jp.local:9511",
  proxyIntl9512: "PROXY proxyintl101z.prod.jp.local:9512",
  proxyIntl9513: "PROXY proxyintl101z.prod.jp.local:9513",
  stgGecp9511: "PROXY stg-proxy.gecp.rakuten.co.jp:9511",
  stgGecp9512: "PROXY stg-proxy.gecp.rakuten.co.jp:9512",
  stgGecp9513: "PROXY stg-proxy.gecp.rakuten.co.jp:9513",
  stgGecp9515: "PROXY stg-proxy.gecp.rakuten.co.jp:9515",
  stgGecp9516: "PROXY stg-proxy.gecp.rakuten.co.jp:9516",
  stgGecp9517: "PROXY stg-proxy.gecp.rakuten.co.jp:9517",
  stgIntraTool9502: "PROXY stg-proxy.intra-tool.rakuten.co.jp:9502",
};

function FindProxyForURL(url, host) {
  // ========== common start ==========
  if (shExpMatch(host, "qa-armsgmesos202.stg.hnd2.bdd.local") ||
      shExpMatch(host, "qfe-armsgmesos204.stg.hnd2.bdd.local") ||
      shExpMatch(host, "armsgmesos204.prod.hnd1.bdd.local") ||
      shExpMatch(host, "qa-xrmsgope002.stg.hnd2.bdd.local")) {
    return proxy.dev9501;
  }
  // ========== common end ==========

  if (shExpMatch(host, "qfe-global.rakuten.com") ||
      shExpMatch(host, "qfe-*.rakuten.com*")) {
    if (/https:.*(www.rakuten.com.*|global.rakuten.com)/.test(url)) {
      return proxy.stgGecp9511;
    }
    return proxy.stgGecp9517;
  }

  if (shExpMatch(host, "ap.accounts.global.rakuten.com") ||
      shExpMatch(host, "*shop.r10s.com") ||
      shExpMatch(host, "point.widget.rakuten.co.jp") ||
      shExpMatch(host, "global.rakuten.co.jp")) {
    return proxy.stgGecp9511;
  }

  if (shExpMatch(host, "*.r10s.jp") ||
      shExpMatch(host, "grp0[12].id.rakuten.co.jp") ||
      shExpMatch(host, "*ashiato.rakuten.co.jp")) {
    return proxy.dev9502;
  }

  if (shExpMatch(host, "thumbnail.image.rakuten.co.jp")) {
    return proxy.stgGecp9512;
  }

  // invalid domain where something gets loaded from GTM
  if (shExpMatch(host, "jdlin.com")) {
    return null;
  }

  if (shExpMatch(host, "review.rakuten.co.jp")) {
    return proxy.stgIntraTool9502;
  }

  return proxy.direct;
}
tm
