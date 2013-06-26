function checkForPeevskiDomain(url) {
	var currentDomains = [
		'monitor.bg',
		'telegraph.bg',
		'politika.bg',
		'europost.eu',
		'europost.bg',
		'borbabg.com',
		'tv7.bg',
		'news7.bg',
		'super7.bg',
		'3bay.bg',
		'econ.bg',
		'inews.bg',
		'jenite.bg',
		'div.bg',
		'sporta.bg',
		'fitwell.bg',
		'sportuvaj.bg',
		'peika.bg',
		'kulinar.bg',
		'sever.bg',
		'get.bg',
		'bnews.bg',
		'bsport.bg',
		'blife.bg',
		'bpost.bg',
		'bmobile.bg',
		'blitz.bg',
		'standartnews.com',
		'struma.bg',
		'marica.bg',
		'vsekiden.com',
		'novinar.bg',
		'radiovitosha.com',
		'radioveselina.bg',
		'magicfm.bg',
		'thevoice.bg'
	]
	var urlPattern;
	for (var i = 0; i < currentDomains.length; i++) {
		urlPattern = new RegExp("^http(s)?\:\/\/([^\/]*)?" + currentDomains[i]);
		if (urlPattern.test(url)) {
			return currentDomains[i];
		}
	}
	return false;
};

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
