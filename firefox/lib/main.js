var {data} = require("sdk/self");
var {Class} = require('sdk/core/heritage');
var {Unknown, Factory} = require('sdk/platform/xpcom');
var {Cc, Ci} = require("chrome");
var {checkForPeevskiDomain} = require('./blocked_domains');

var contractId = '@ignorepeevski.tumblr.com/dancewithme';

var PeevskiPolicy = Class({
  extends: Unknown,
  interfaces: ['nsIContentPolicy'],
  get wrappedJSObject() this,

  shouldLoad: function(aContentType, aContentLocation, aRequestOrigin, aContext, aMimeTypeGuess, aExtra) {
    var result = Ci.nsIContentPolicy.ACCEPT;
    var isPeevskiDomain = checkForPeevskiDomain(aContentLocation.spec);

    // we should check for TYPE_SUBDOCUMENT as well if we want frames.
    if ((Ci.nsIContentPolicy.TYPE_DOCUMENT == aContentType) && isPeevskiDomain) {
      aContext.loadURI(data.url('warning.html'), aRequestOrigin);
      result = Ci.nsIContentPolicy.REJECT_SERVER;
    }
    return result;
  }
});

var factory = Factory({
  contract: contractId,
  Component: PeevskiPolicy
});

categoryManager = Cc["@mozilla.org/categorymanager;1"]
                      .getService(Ci.nsICategoryManager);

categoryManager.addCategoryEntry('content-policy', 'ignorepeevski', contractId, false, false);
