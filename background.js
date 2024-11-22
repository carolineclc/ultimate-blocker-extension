let count = 0;
let blockedTrackers = [];

// Changeing the count to 0 when the tab is changed
function handleActivated(activeInfo) {
  count = 0;
  blockedTrackers = [];
  browser.storage.local.set({count});
  console.log("tab has been swithed");
}


// Listen for network requests
browser.webRequest.onBeforeRequest.addListener(
  async (details) => {

    browser.tabs.onActivated.addListener(handleActivated);
    const { trackers } = await browser.storage.local.get("trackers");

    if (trackers && isTracker(details.url, trackers)) {

      blockedTrackers.push(details.url);
      
      console.log("Bloqueando URL:", details.url);
      count++;
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

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.action === "getBlockedTrackers") {
    console.log(blockedTrackers.length);
    sendResponse({count : blockedTrackers.length, blockedTrackers: blockedTrackers})
  }
});

