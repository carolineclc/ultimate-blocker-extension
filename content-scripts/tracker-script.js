
function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }


  async function showTrackersForTab() {
    const trackerList = document.getElementById("trackers");
    const url = "https://easylist.to/easylist/easylist.txt";
    //try {
      const response = await fetch(url);
      const text = await response.text();
  
      // Filter lines that are likely to be tracking domains
      const trackers = text
        .split("\n")
        .filter(line => line.startsWith("||"))
        .map(line => line.replace("||", "").split("^")[0]);
  
      // Save to storage
//      await browser.storage.local.set({ trackers });
//      console.log("Trackers updated!");
//    } catch (error) {
//      console.error("Failed to fetch trackers:", error);
//    }

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
}



  getActiveTab().then(showTrackersForTab);