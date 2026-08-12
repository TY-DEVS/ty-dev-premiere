async function findServerFns() {
  console.log("Fetching https://ty-dev.site/contact...");
  const res = await fetch("https://ty-dev.site/contact");
  const html = await res.text();
  
  const matches = [...html.matchAll(/_serverFn\/([a-f0-9]+)/g)];
  console.log("Found _serverFn hashes in HTML:", matches.map(m => m[1]));

  // Also check script src tags
  const scriptMatches = [...html.matchAll(/src="([^"]+)"/g)];
  for (const m of scriptMatches) {
    const src = m[1];
    if (src.startsWith("/") || src.includes("ty-dev.site")) {
      const scriptUrl = src.startsWith("http") ? src : `https://ty-dev.site${src}`;
      console.log("Fetching bundle script:", scriptUrl);
      try {
        const scriptRes = await fetch(scriptUrl);
        const scriptText = await scriptRes.text();
        const fnMatches = [...scriptText.matchAll(/_serverFn\/([a-f0-9]+)/g)];
        if (fnMatches.length > 0) {
          console.log(`Hashes in ${src}:`, fnMatches.map(f => f[1]));
        }
      } catch (e) {
        console.error("Failed to fetch script:", src);
      }
    }
  }
}

findServerFns();
