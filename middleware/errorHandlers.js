module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(status).send([{status:status, message}]);
};

// [
//   { status: 200, title: '' },
//   { status: 200, title: '' },
// ];
