var domainExceptions = {};

chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		var blocking = checkForPeevskiDomain(info.url);
		if (blocking !== false) {
			var date = new Date();
			var time = date.getTime();
			if (domainExceptions[blocking['domain']] === undefined || time > domainExceptions[blocking['domain']]) {
				return {redirectUrl: chrome.extension.getURL('warning.html') + '?' + encodeURIComponent(info.url)};
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
		if (request.allowCurrentUrl) {
			var url    = request.allowCurrentUrl;
			var blocking = checkForPeevskiDomain(url);
			var date   = new Date();
			var time   = date.getTime();
			domainExceptions[blocking.domain] = time + 10 * 60 * 1000;
			chrome.tabs.getSelected(null, function (tab) {
				chrome.tabs.update(tab.id, {url: url});
			});
		}
	}
);
