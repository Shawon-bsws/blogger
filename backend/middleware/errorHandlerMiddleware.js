'use strict';
const statusCode = require('../helpers/statusCode');
const fs = require('fs');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error('Error in here middleware===========>', err);

  let customError = {
    //Set Defaults
    statusCode: err.statusCode || statusCode.Internal_Server_Error,
    msg: err.message || 'Something went wrong please try again later',
  };

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name.toLowerCase() == 'validationerror') {
    customError.statusCode = statusCode.Bad_Request;
  }
  let errStr = err.stack.split('\n');
  let errPath = errStr[1];
  let errPathArr = errPath.split(':');
  let errData = `DATE-TIME :${new Date()}, TYPE :${
    errStr[0]
  } ,FILE PATH :${errPathArr[0].trim()} ,LINE NO :${errPathArr[1]}:${
    errPathArr[2]
  }
`;
  // let errObj = {
  //   TYPE: errStr[0],
  //   'FILE PATH': errPathArr[0],
  //   'LINE NO': errPathArr[1] + ':' + errPathArr[2],
  // };

  // console.log('error string', errStr);
  // console.log('error path', errPathArr);
  // // console.log('error object', errObj);
  // console.log('error data', errData);

  fs.open('./logs/errorlog.log', 'a', (error, fd) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.writeFileSync('./logs/errorlog.log', errData);
      } else {
        console.log('fs Error', error);
      }
    } else {
      fs.write(fd, errData, (error) => {
        if (error) {
          console.log('fs Error', error);
        }
        fs.close(fd, () => {});
      });
    }
  });

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
