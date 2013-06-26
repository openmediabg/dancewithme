const {PageMod} = require("sdk/page-mod");
const {data}      = require("sdk/self");

const BAD_DOMAINS = [
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
].map(function(site) {
  return '*.' + site;
});

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
PageMod({
  include: BAD_DOMAINS,
  contentScriptFile: data.url("warning.js")
});

