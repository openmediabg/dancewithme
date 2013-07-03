var base64 = require("sdk/base64");

urlSafeEncode = function(string, encoding) {
  return base64.encode(string, encoding)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

urlSafeDecode = function(string, encoding) {
  // Add padding
  while (string.length % 4)
    string += '=';

  string = string.replace(/-/g, '+').replace(/_/g, '/')

  return base64.decode(string);
};

if (typeof exports !== 'undefined') {
  exports.urlSafeEncode = urlSafeEncode;
  exports.urlSafeDecode = urlSafeDecode;
}
