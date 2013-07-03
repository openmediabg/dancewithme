var {data} = require("sdk/self");
var {Class} = require('sdk/core/heritage');
var {Unknown, Factory} = require('sdk/platform/xpcom');
var {Cc, Ci} = require("chrome");
var {PageMod} = require('sdk/page-mod');
var {checkForPeevskiDomain} = require('./blocked_domains');
var base64url = require('./base64url');

exports.main = function() {
  var domainExceptions = {};

  var addDomainException = function(url) {
    var domain = checkForPeevskiDomain(url);
    var date = new Date();
    var time = date.getTime();
    domainExceptions[domain] = time + 10 * 60 * 1000;
  }

  var checkForDomainException = function(domain) {
    return(domainExceptions[domain] !== undefined && new Date().getTime() < domainExceptions[domain]);
  }

  var contractId = '@ignorepeevski.tumblr.com/dancewithme';

  var PeevskiPolicy = Class({
    extends: Unknown,
    interfaces: ['nsIContentPolicy'],
    get wrappedJSObject() this,

    shouldLoad: function(aContentType, aContentLocation, aRequestOrigin, aContext, aMimeTypeGuess, aExtra) {
      var result = Ci.nsIContentPolicy.ACCEPT;
      var url = aContentLocation.spec;
      var peevskiDomain = checkForPeevskiDomain(url);

      if ((Ci.nsIContentPolicy.TYPE_DOCUMENT == aContentType) && peevskiDomain && !checkForDomainException(peevskiDomain)) {
        let redirectUrl = data.url("warning.html") + "?" + base64url.urlSafeEncode(url);
        aContext.loadURI(redirectUrl, aRequestOrigin);
        result = Ci.nsIContentPolicy.REJECT_SERVER;
      }
      return result;
    }
  });

  var factory = Factory({
    contract: contractId,
    Component: PeevskiPolicy
  });

  var categoryManager = Cc["@mozilla.org/categorymanager;1"].getService(Ci.nsICategoryManager);
  categoryManager.addCategoryEntry('content-policy', 'ignorepeevski', contractId, false, false);

  PageMod({
    include: /resource:\/\/.*\/dancewithme\/data\/warning\.html.*/,
    contentScriptFile: data.url('warning.js'),
    onAttach: function(worker) {
      worker.port.on("allowCurrentUrl", function(encodedURL) {
        var url = base64url.urlSafeDecode(encodedURL);
        addDomainException(url);
        worker.port.emit("redirectTo", url);
      });
    }
  });
}
