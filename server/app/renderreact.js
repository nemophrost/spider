var getComponentFromGlobal;

module.exports = function(React) {
  return function(name, params, callback) {
    var component;
    goog.require(name);
    component = getComponentFromGlobal(name);
    return React.renderComponentToString(component(params), function(html) {
      return callback(html);
    });
  };
};

getComponentFromGlobal = function(name) {
  var component, n, _i, _len, _ref;
  component = global;
  _ref = name.split('.');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    n = _ref[_i];
    component = component[n];
  }
  return component;
};
