async function testRemoteServerFn() {
  const url = "https://ty-dev.site/_serverFn/c64036b5e91e6a43224197cd9cf225ccc4c4be2d2711f97e7a80aac4512d50ab";
  
  // Payload sent by front-end form
  const payload = [
    {
      data: {
        name: "Test Client",
        email: "benyaalamedyassine24@gmail.com",
        phone: "+33600000000",
        type: "Site Web / E-Commerce",
        budget: "1000 - 3000 €",
        desc: "Ceci est un test de soumission depuis le script de diagnostic.",
        source: "https://ty-dev.site"
      }
    }
  ];

  console.log("Sending test POST request to:", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/x-tss-framed, application/x-ndjson, application/json",
        "x-tsr-serverfn": "true",
        "Origin": "https://ty-dev.site",
        "Referer": "https://ty-dev.site/contact"
      },
      body: JSON.stringify(payload)
    });

    console.log("HTTP Status:", res.status, res.statusText);
    console.log("Headers:", Object.fromEntries(res.headers.entries()));
    const text = await res.text();
    console.log("Response Body:\n", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testRemoteServerFn();
