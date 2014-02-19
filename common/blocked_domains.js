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
    'sportuvai.bg',
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

  for (var i = 0; i < blockedDomains.length; i++) {
    var urlPattern = new RegExp("^http(s)?\\:\\/\\/([^\\/]+\\.)?" + blockedDomains[i].replace(".", "\\."));
    if (urlPattern.test(url)) {
      return {reason: 'domain', url: blockedDomains[i]};
    }
  }

  return checkFacebookPage(url);
}

function checkFacebookPage(path) {
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

  var facebookPattern = /^http(s)?\:\/\/(\w)*\.facebook.com\//;
  if (!facebookPattern.test(path)) return;

  path = path
    .replace(facebookPattern, '')
    .replace(/\?.+/, '');

  if (blockedFacebookPages.indexOf(path) != -1) {
    return {reason: 'fbPage', url: path};
  }
}

if (typeof exports !== 'undefined') {
  exports.checkForPeevskiDomain = checkForPeevskiDomain;
}
