"use strict";

function getCurrentUrl() {
  return decodeURIComponent(location.href.toString().split('?')[1]);
}

document.getElementById('force_continue').onclick = function () {
  self.port.emit("allowCurrentUrl", getCurrentUrl());
}

self.port.on("redirectTo", function(url) {
  window.location.href = url;
});

document.getElementById('go_back').onclick = function () {
  window.history.back();
}
