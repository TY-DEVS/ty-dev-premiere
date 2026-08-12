async function searchInlineScripts() {
  const res = await fetch("https://ty-dev.site/contact");
  const html = await res.text();

  const inlineMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
  console.log("Found inline script tags:", inlineMatches.length);

  inlineMatches.forEach((m, idx) => {
    const text = m[1];
    if (text.includes("_serverFn")) {
      console.log(`Inline script #${idx} contains _serverFn!`);
      const hashes = [...text.matchAll(/_serverFn\/([a-f0-9]+)/g)];
      console.log("Hashes:", hashes.map(h => h[1]));
    }
  });

  // Check if manifest or window.__TSR__ is present in HTML
  if (html.includes("serverFn")) {
    console.log("HTML contains string 'serverFn'");
    const matches = [...html.matchAll(/_serverFn\/([a-f0-9]+)/g)];
    console.log("All hashes in HTML:", matches.map(m => m[1]));
  } else {
    console.log("HTML does not contain string 'serverFn'");
  }
}

searchInlineScripts();
