async function callLiveServerFn() {
  const url = "https://ty-dev.site/_serverFn/c64036b5e91e6a43224197cd9cf225ccc4c4be2d2711f97e7a80aac4512d50ab";
  
  const payload = {
    data: {
      name: "Test User",
      email: "benyaalamedyassine24@gmail.com",
      phone: "+33600000000",
      type: "Site Web",
      budget: "1000€ - 3000€",
      desc: "Ceci est un test automatique d'envoi d'email depuis ty-dev.site.",
      source: "https://ty-dev.site"
    }
  };

  console.log("Sending POST to live server function:", url);
  console.log("Payload:", JSON.stringify(payload));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/x-tss-framed, application/x-ndjson, application/json",
      "x-tsr-serverfn": "true",
      "origin": "https://ty-dev.site",
      "referer": "https://ty-dev.site/contact"
    },
    body: JSON.stringify(payload)
  });

  console.log("\nResponse Status:", res.status);
  console.log("Response Headers:", Object.fromEntries(res.headers.entries()));
  const text = await res.text();
  console.log("Response Body:\n", text);
}

callLiveServerFn();
