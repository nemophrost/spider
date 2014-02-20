module.exports = function(http, app, config) {
  return function() {
    return http.createServer(app).listen(config.server.port, function() {
      return console.log("Express server listening on port " + config.server.port);
    });
  };
};
