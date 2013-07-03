const base64url = require('./base64url');

var testEncodeDecode = function(test, original, encoded) {
  test.assertEqual(base64url.urlSafeEncode(original), encoded);
  test.assertEqual(base64url.urlSafeDecode(encoded), original);
}

exports.testPlusSubstitution = function(test) {
  testEncodeDecode(test, '~~~', 'fn5-');
}

exports.testSlashSubstitution = function(test) {
  testEncodeDecode(test, 'ÿÿÿ', '____');
}

exports.testPadding = function(test) {
  testEncodeDecode(test, 'a', 'YQ');
}

exports.testURL = function(test) {
  testEncodeDecode(test, 'http://example.com', 'aHR0cDovL2V4YW1wbGUuY29t');
}
