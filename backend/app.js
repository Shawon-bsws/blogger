'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: './configs/.env' });
const config = require('./configs/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/route.js');
const helmet = require('helmet');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware.js');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();

function initExpressMiddleware() {
  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.json({ limit: '60mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '60mb' }));
  app.use(helmet());
  app.use(
    morgan('combined', {
      stream: fs.createWriteStream('./logs/access.log', { flags: 'a' }),
    })
  );
}

function initRoutes() {
  app.use('/v1', router);
  app.use(errorHandlerMiddleware);
  app.use('/public', express.static(path.join(__dirname, 'public')));
}
initExpressMiddleware();
initRoutes();

app.listen(config.PORT || 5000, function (error) {
  if (error) {
    console.log('Server Not Started yet ' + error);
  } else {
    console.log({
      message: 'server connected at',
      port: config.PORT || 5000,
      level: 'info',
      operation: 'server start',
    });
  }
});
