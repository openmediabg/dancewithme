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
    var fbPath = decodeURIComponent(url.replace(fbPattern, ''));
    return checkFacebookPage(fbPath);
  }

  return false;
}

function checkFacebookPage(fbPath) {
  var blockedFacebookPages = [
    "telegraphbg",
    "europost.eu",
    "TV7Bulgaria",
    "econ.bg",
    "iNews.bg",
    "www.jenite.bg",
    "Div.bg",
    "www.sporta.bg",
    "FitWell.bg",
    "Peika.bg",
    "kulinar.bg",
    "Sever.bg",
    "get.bg",
    "bnews.bg",
    "bsport.bg",
    "bsportnews",
    "bnews.bg",
    "BMediaGroup",
    "BLife.bg",
    "bmglife.blifebg",
    "bmobile.bg",
    "blitz.bg",
    "blitz.bgshow",
    "Blitz.bgSport",
    "blitzhealth",
    "blitzladies",
    "nad55",
    "standartnews",
    "pages/Strumabg/381955041882220",
    "marica.bg",
    "Vsekiden",
    "novinar.bg",
    "radiovitosha",
    "pages/Радио-Веселина/366784846671021",
    "radioveselina"
  ];


  var pathPattern;
  var pattern_base = "^http(s)?\\:\\/\\/(\w)*.facebook.com\\/"
  var index = blockedFacebookPages.indexOf(fbPath.replace(/\?.+/, ''));
  if (index != -1) {
    return {
      'reason': 'fbPage',
      'page': blockedFacebookPages[index]
    };
  }

  return false;
}

if (typeof exports !== 'undefined') {
  exports.checkForPeevskiDomain = checkForPeevskiDomain;
}
