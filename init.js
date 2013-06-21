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
	var patt = null;
	var patt_txt = null;
	for (var i = 0; i < blockedDomains.length; i++) {
		patt_txt = "^http(s)?\:\/\/([^\/]*)?"+blockedDomains[i];
		patt = new RegExp(patt_txt);
		if (patt.test(document.location.href)) {
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
			height: 12em;\
			margin: 5% auto;\
			text-align: center;\
			background: #fff;\
			border-radius: 10px;\
			border: 1px solid #000;\
			padding: 20px;\
		}\
		.logo {\
			width: 20%;\
			float: left;\
			padding: 20px;\
		}\
		.text {\
			float: left;\
		}\
		.text p {\
			text-align: left;\
		}\
	</style>\
	</header>\
	<body>\
		<div class="main">\
			<img src="http://24.media.tumblr.com/243dfc6696cf71013636c403ee1473f2/tumblr_mon26lM2W71swvzfoo1_r1_1280.jpg" alt="" class="logo" />\
			<div class="text">\
				<p>Внимание! Сайтът, който искате да посетите, е част от медийната група на Делян Пеевски!</p>\
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
		var d = new Date();
		var t = d.getTime();
		global_result['continue_time_'+peevski] = t + 10 * 60 * 1000;
		chrome.storage.local.set(global_result);
		location.reload();
	}
}

var peevski = checkForPeevskiDomain();
var global_result = null;
if (peevski != false) {
	chrome.storage.local.get(function (result) {
		global_result = result;
		var d = new Date();
		var t = d.getTime();
		if (typeof result['continue_time_'+peevski] === "undefined" || t > global_result['continue_time_'+peevski]) {
			window.stop();
			showPeevskiDomainWarning();
		}
	});
}

