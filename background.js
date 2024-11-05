// Log each network request made by the browser
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log("URL:", details.url);
      console.log("Method:", details.method);
    },
    { urls: ["<all_urls>"] }  // Filters: apply to all URLs
  );
  
