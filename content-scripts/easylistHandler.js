async function getEasylistTrackerList() {
    const url = "https://easylist.to/easylist/easylist.txt";
    try {
      const response = await fetch(url);
      const text = await response.text();
  
      // Filter lines that are likely to be tracking domains
      const trackers = text
        .split("\n")
        .map(line => line.replace("||", "").replace("^","").split("^")[0])
        .filter(line => (line.endsWith(".com")) || (line.endsWith(".net")) ||  (line.endsWith(".nz"))||  (line.endsWith(".de")) ||  (line.endsWith(".pro"))||  (line.endsWith(".in")));
  
      return trackers;
  
    } catch (error) {
      console.error("Failed to fetch trackers:", error);
    }
  }


  