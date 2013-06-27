function checkForPeevskiDomain(url) {
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
		'novinar.bg',
		'radiovitosha.com',
		'radioveselina.bg',
		'magicfm.bg',
		'thevoice.bg'
	];

	var urlPattern;
	for (var i = 0; i < blockedDomains.length; i++) {
		urlPattern = new RegExp("^http(s)?\\:\\/\\/([^\\/]+\\.)?" + blockedDomains[i]);
		if (urlPattern.test(url)) {
			return blockedDomains[i];
		}
	}

	return false;
}

if (typeof exports !== 'undefined') {
	exports.checkForPeevskiDomain = checkForPeevskiDomain;
}
