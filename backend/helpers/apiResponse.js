exports.ErrorResponse = function (res, msg) {
  return res.status(400).json({ message: msg });
};

exports.notFoundResponse = function (res, msg) {
  var data = {
    status: 404,
    message: msg
  };
  return res.status(404).json(data);
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: 401,
    message: msg
  };
  return res.status(401).json(data);
};
