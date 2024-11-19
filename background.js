let count = 0;

// Changeing the count to 0 when the tab is changed
function handleActivated(activeInfo) {
  count = 0;
  browser.storage.local.set({count});
}


// Listen for network requests
browser.webRequest.onBeforeRequest.addListener(
  async (details) => {

    browser.tabs.onActivated.addListener(handleActivated);
    const { trackers } = await browser.storage.local.get("trackers");
    if (trackers && isTracker(details.url, trackers)) {
      //console.log("Bloqueando URL:", details.url);
      count++;

      //console.log("Contador de URLs bloqueadas:", count);
      await browser.storage.local.set({count});
      
      //console.log("teste");
      return { cancel: true };
    }
    //console.log("Permitindo URL:", details.url);
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
