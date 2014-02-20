var appName, currentEnv, env, port;

appName = require('../../package').name;

currentEnv = process.env.NODE_ENV || 'development';

port = process.env.PORT || 8000;

env = {
  development: false,
  staging: false,
  production: false
};

env[currentEnv] = true;

module.exports = {
  appName: appName,
  currentEnv: currentEnv,
  env: env,
  server: {
    port: port,
    apiKey: 'put-guid-here',
    url: env.development ? "http://localhost:" + port + "/" : "http://" + process.env.SUBDOMAIN + ".jit.su/"
  },
  db: {
    url: env.development ? "mongodb://localhost/" + (appName.toLowerCase()) : "__production config__"
  }
};
