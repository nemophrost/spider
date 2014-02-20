module.exports = function(app, homeController) {
  return function() {
    return app.get('/', homeController);
  };
};
