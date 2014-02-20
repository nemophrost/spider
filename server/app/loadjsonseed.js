module.exports = function() {
  var jsonSeed;
  jsonSeed = {
    todoApp: {
      items: ['Check how this React component is rendered on server :-)']
    }
  };
  return function(callback) {
    return callback(jsonSeed);
  };
};
