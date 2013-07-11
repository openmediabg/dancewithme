(function() {
  'use strict';

  var firefox = typeof self !== 'undefined' && self.port;
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

  function getCurrentUrl() {
    return decodeURIComponent(location.href.toString().split('?')[1]);
  }

  document.getElementById('go_back').onclick = function() {
    history.back();
  };

  if (firefox) {
    document.getElementById('current_url').innerHTML = urlSafeDecode(getCurrentUrl());
    self.port.on("redirectTo", function(url) {
      location.href = url;
    });

    document.getElementById('force_continue').onclick = function() {
      self.port.emit("allowCurrentUrl", getCurrentUrl());
    };
  } else {
    document.getElementById('current_url').innerText = getCurrentUrl();
    document.getElementById('force_continue').onclick = function() {
      if (isSafari) {
        safari.self.tab.dispatchMessage('allowCurrentUrl', getCurrentUrl());
      } else {
        chrome.runtime.sendMessage({allowCurrentUrl: getCurrentUrl()});
      }
    };
  }
}).call(this);
