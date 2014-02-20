module.exports = function(loadJsonSeed, renderReact, appVersion) {
  return function(req, res) {
    res.locals = {
      title: 'Spider'
    };

    if (process.env.NODE_ENV == 'development') {
      res.locals.isDev = true;
    }

    res.render('home');
  };
};
