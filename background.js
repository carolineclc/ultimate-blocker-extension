let count = 0;
let blockedTrackers = [];

function handleActivated() {
  count = 0;
  blockedTrackers = [];
  browser.storage.local.set({ count });
  console.log("Tab has been switched");
}

browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    browser.tabs.onActivated.addListener(handleActivated);

    const { lists = [] } = await browser.storage.local.get("lists");
    const activeLists = lists.filter(list => list.active !== false);

    const urlObj = new URL(details.url);
    for (const list of activeLists) {
      if (list.domains.some(domain => urlObj.hostname.includes(domain))) {
        blockedTrackers.push(details.url);
        console.log(`Blocking URL: ${details.url} (Blocked by: ${list.name || list.url})`);
        count++;
        return { cancel: true };
      }
    }

    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getBlockedTrackers") {
    sendResponse({ count: blockedTrackers.length, blockedTrackers });
  }
});

// Inicializar listas padrão
browser.runtime.onInstalled.addListener(async () => {
  const { lists = [] } = await browser.storage.local.get("lists");
  if (!lists.some(list => list.name === "EasyList")) {
    try {
      const response = await fetch("https://easylist.to/easylist/easylist.txt");
      const text = await response.text();
      const domains = text
        .split("\n")
        .map(line => line.replace("||", "").replace("^", "").split("^")[0])
        .filter(line => line.endsWith(".com") || line.endsWith(".net"));

      lists.push({ name: "EasyList", domains, active: true });
      await browser.storage.local.set({ lists });
    } catch (error) {
      console.error("Failed to fetch EasyList:", error);
    }
  }
});
