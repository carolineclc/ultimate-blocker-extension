function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}



async function showTrackersForTab() {
  const trackerList = document.getElementById("trackers");
  const blockedTrackers = document.getElementById("blocked-count");
  
  const url = "https://easylist.to/easylist/easylist.txt";
  try {
    const response = await fetch(url);
    const text = await response.text();

    // Filter lines that are likely to be tracking domains
    const trackers = text
      .split("\n")
      .map(line => line.replace("||", "").replace("^","").split("^")[0])
      .filter(line => (line.endsWith(".com")) || (line.endsWith(".net")) ||  (line.endsWith(".nz"))||  (line.endsWith(".de")) ||  (line.endsWith(".pro"))||  (line.endsWith(".in")));

    // Save to storage
    await browser.storage.local.set({trackers });
    console.log("Trackers updated!");


    
    const blocked_trackers = await browser.storage.local.get("count");
    console.log(blocked_trackers.count);
    blockedTrackers.innerHTML = blocked_trackers.count;

    if (!trackers || trackers.length === 0) {
      trackerList.innerHTML = "<li>No trackers found.</li>";
    } else {
      trackerList.innerHTML = "";
      trackers.forEach(tracker => {
        const li = document.createElement("li");
        li.textContent = tracker;
        trackerList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Failed to fetch trackers:", error);
  }
}




getActiveTab().then(showTrackersForTab);