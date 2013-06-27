function getCurrentUrl() {
	return decodeURIComponent(location.href.toString().split('?')[1]);
}

document.getElementById('current_url').innerText = getCurrentUrl();

document.getElementById('force_continue').onclick = function () {
	chrome.runtime.sendMessage({allowCurrentUrl: getCurrentUrl()});
}

document.getElementById('go_back').onclick = function () {
	window.history.back();
}
