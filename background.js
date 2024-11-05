// Log each network request made by the browser
browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const { trackers } = await browser.storage.local.get("trackers");
    if (trackers && isTracker(details.url, trackers)) {
      console.log("Bloqueando URL:", details.url);
      return { cancel: true };
    }
    console.log("Permitindo URL:", details.url);
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },  // Filters: apply to all URLs
  ["blocking"]
);

// Verificar se o domínio está na lista de rastreadores
function isTracker(url, trackers) {
  const urlObj = new URL(url);
  return trackers.some(tracker => urlObj.hostname.includes(tracker));
}
