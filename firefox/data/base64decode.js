var urlSafeDecode = function(string, encoding) {
  // Add padding
  while (string.length % 4)
    string += '=';

  string = string.replace(/-/g, '+').replace(/_/g, '/')

  return atob(string);
};
