async function getAllScripts() {
  const res = await fetch("https://ty-dev.site/contact");
  const html = await res.text();
  console.log("HTML length:", html.length);

  const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);
  console.log("All script URLs:", scripts);

  for (const s of scripts) {
    const url = s.startsWith("http") ? s : `https://ty-dev.site${s}`;
    console.log("\nChecking script:", url);
    const scriptRes = await fetch(url);
    const scriptText = await scriptRes.text();
    const matches = [...scriptText.matchAll(/_serverFn\/([a-f0-9]+)/g)];
    if (matches.length > 0) {
      console.log(`FOUND ${matches.length} _serverFn hashes in ${url}:`, matches.map(m => m[1]));
    }
  }
}

getAllScripts();
