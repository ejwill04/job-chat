//include npm modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//load environment configuration
if (!process.env.NODE_ENV) process.env.NODE_ENV = "dev";
global.config = require('./config/config')[process.env.NODE_ENV];
console.log('loaded environment: ' + process.env.NODE_ENV);

//connect to mongoDB
var mongooseUrl = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`;
mongoose.connect(mongooseUrl);

//listen for connect and error events from mongoose
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('successfully connected to mongo at: ', mongooseUrl);

  //load models
  require('./models/user')(mongoose);
  require('./models/company')(mongoose);

  startExpress();
});

/**
 * config express and start web server
 */
function startExpress() {
  let app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({limit: '50mb'}));

  //load controllers
  require('./controllers/users')(app);
  require('./controllers/companies')(app);

  //start express
  let server = app.listen(config.server.port, () => {
    console.log('web server running on port: ' + config.server.port);
  });
}
