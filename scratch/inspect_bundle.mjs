async function inspectBundle() {
  const url = "https://ty-dev.site/assets/index-DIfK68d1.js";
  const res = await fetch(url);
  const text = await res.text();
  
  const fnMatches = [...text.matchAll(/_serverFn\/([a-f0-9]+)/g)];
  console.log("ServerFn hashes found in index-DIfK68d1.js:", fnMatches.map(f => f[1]));

  // Find contact related code snippets in bundle
  const contactIdx = text.indexOf("sendContactEmailFn");
  if (contactIdx !== -1) {
    console.log("Snippet around sendContactEmailFn:\n", text.slice(contactIdx - 100, contactIdx + 300));
  } else {
    console.log("sendContactEmailFn not found in text directly");
  }
}

inspectBundle();
