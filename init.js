function checkForPeevskiDomain() {
	var blockedDomains = [
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
		'novinar.bg'
	]
	var urlPattern;
	for (var i = 0; i < blockedDomains.length; i++) {
		urlPattern = new RegExp("^http(s)?\:\/\/([^\/]*)?" + blockedDomains[i]);
		if (urlPattern.test(document.location.href)) {
			return blockedDomains[i];
		}
	}
	return false;
};

function showPeevskiDomainWarning() {
	document.documentElement.innerHTML = '\
<html>\
	<header>\
	<style>\
		body {\
			background: #ecee00;\
			font-family: sans-serif;\
			font-size: 1em;\
		}\
		.main {\
			width: 80%;\
			min-height: 12em;\
			margin: 5% auto;\
			background: #fff;\
			border-radius: 10px;\
			border: 1px solid #000;\
			padding: 4%;\
			line-height: 140%;\
			overflow: hidden;\
		}\
		.main h3 {\
			margin-top: 0;\
		}\
		.logo {\
			width: 20%;\
			float: left;\
			padding: 0 5% 5% 0;\
		}\
		.text {\
			margin-left: 25%;\
		}\
		.text p {\
			text-align: left;\
		}\
		.main ul {\
			text-align: left;\
		}\
	</style>\
	</header>\
	<body>\
		<div class="main">\
			<img src="' + chrome.extension.getURL('ignore.jpg') + '" alt="" class="logo" />\
			<div class="text">\
				<h3>Внимание! Сайтът е част от групата на Делян Пеевски!</h3>\
				<p>Материалът може да бъде:</p>\
				<ul>\
					<li>Необективен</li>\
					<li>Съдържащ непроверени или неверни факти</li>\
					<li>Без втора гледна точка</li>\
					<li>Силно манипулативен</li>\
				</ul>\
				<p>Ако отворите страницата, подкрепяте некачествената журналистика.</p>\
				<p>Импресия по импресия - медийна империя!</p>\
				<p><br /><input class="ignore" type="button" value="&#65513; #ignore" onclick="window.history.back();" /> <input id="force_continue" class="continue" type="button" value="все пак ще продължа &#65515;" /><?p>\
				\
			</div>\
		</div>\
	</body>\
</html>\
<div style="display: none;">\
<!--\
';

	document.getElementById('force_continue').onclick = function () {
		var date = new Date();
		var time = date.getTime();
		domainExceptions['continue_time_' + blockedDomain] = time + 10 * 60 * 1000;
		chrome.storage.local.set(domainExceptions);
		location.reload();
	}
}

var blockedDomain = checkForPeevskiDomain();
var domainExceptions = {};

if (blockedDomain !== false) {
	chrome.storage.local.get(null, function (result) {
		domainExceptions = result;
		var date = new Date();
		var time = date.getTime();
		var domainKey = 'continue_time_' + blockedDomain;
		if (result[domainKey] === undefined || time > domainExceptions[domainKey]) {
			window.stop();
			showPeevskiDomainWarning();
		}
	});
}

