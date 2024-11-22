browser.runtime.sendMessage({action: "getBlockedTrackers"}).then((response) => {
console.log(response.count);
const count = response.count;
const trackerList = response.blockedTrackers;

document.getElementById("blocked-count").textContent = count;

const trackerListElement = document.getElementById("blocked-trackers");
trackerListElement.innerHTML = "";

if (trackerList.length > 0) {
trackerList.forEach(url =>{
const li = document.createElement("li");
li.textContent = url;
trackerListElement.appendChild(li); 

});
};
});