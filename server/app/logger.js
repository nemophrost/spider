module.exports = function(winston) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        uncaughtException: true
      })
    ]
  });
};
