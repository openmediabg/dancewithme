document.getElementById('force_continue').onclick = function () {
	chrome.runtime.sendMessage({allowCurrentDomain: true});
}

document.getElementById('go_back').onclick = function () {
	window.history.back();
}
