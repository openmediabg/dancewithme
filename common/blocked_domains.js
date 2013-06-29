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
			return {
                'reason': 'domain',
                'domain': blockedDomains[i]
            };
		}
	}

    var fbPattern = /^http(s)?\:\/\/(\w)*\.facebook.com\//;
    if (fbPattern.test(url)) {
        var fbPath = url.replace(fbPattern, '');
        return checkFacebookPage(fbPath);
    }

    return false;
}

function checkFacebookPage(fbPath) {
    var blockedFacebookPages = [
        "gafove",
        "pages/Мразя-лъжите-/157946291399",
        "bulgaria.nai.krasiva",
        "pages/Бъдеще-за-нас-на-инат/494175647296443",
        "lovefootball.eu",
        "purva.bundesliga",
        "jivei.kakto.mojesh",
        "obicham.sporta",
        "galena.payner",
        "bgjokes"
    ];


    var pathPattern;
    var pattern_base = "^http(s)?\\:\\/\\/(\w)*.facebook.com\\/"
    for (var i = i; i < blockedFacebookPages.length; ++i) {
        pathPattern = new RegExp(pattern_base + "(" + blockedFacebookPages[i] + ")");
        if (pathPattern.test(fbPath) {
            return {
                'reason': 'fbPage',
                'page': blockedFacebookPages[i]
            };
        }
    }
}

if (typeof exports !== 'undefined') {
	exports.checkForPeevskiDomain = checkForPeevskiDomain;
}
