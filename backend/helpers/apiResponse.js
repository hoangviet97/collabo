exports.ErrorResponse = function (res, msg) {
  var data = {
    status: 400,
    message: msg
  };
  console.log(data);
  return res.status(400).json(data);
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
