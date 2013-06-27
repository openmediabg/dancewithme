var domainExceptions = {};
var currentDomain;
var currentURL;

chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		currentURL = info.url;
		currentDomain = checkForPeevskiDomain(currentURL);
		if (currentDomain !== false) {
			var date = new Date();
			var time = date.getTime();
			if (domainExceptions[currentDomain] === undefined || time > domainExceptions[currentDomain]) {
				return {redirectUrl: chrome.extension.getURL('warning.html')};
			}
		}
		return null;
	},
	// filters
	{
		urls: [
			"http://*/*",
			"https://*/*"
		],
		types: [ "main_frame" ]
	},
	// extraInfoSpec
	[ "blocking" ]
);

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.allowCurrentDomain) {
			var date = new Date();
			var time = date.getTime();
			domainExceptions[currentDomain] = time + 10 * 60 * 1000;
			chrome.tabs.getSelected(null, function (tab) {
				chrome.tabs.update(tab.id, {url: currentURL});
			});
		}
	}
);
