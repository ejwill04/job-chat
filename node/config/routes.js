var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (app) => {
  app.post('/signup', (req, res) => {
    var email = req.body.email;
    // var password = User.getPasswordHash(req.body.password);
    var password = req.body.password;
    var name = req.body.name;

    var user = {
      email: email,
      name: name,
      password: password
    };
    var exists;
    User.findOne({email: user.email}, (err, user) => {
      exists = user;
    })
    if(!exists){
      User.create(user, (err, user) => {
        if (err) console.error(err);

        res.json({
          user: user
        });
      })
    };
  });

  app.post('/login', (req, res) => {
    var email = req.body.email;
    // var password = User.getPasswordHash(req.body.password);
    var password = req.body.password;


    User.findOne({
      email: email
    }, (err, user) => {

      if (err) console.error(err);

      res.json({
        isValid: user
        // isValid: user && user.isValidPassword(password)
      });
    });
  });

  app.use((req, res, next) => {
    var header = req.get("authorization");
    var email = header.split(":")[0];
    var password = header.split(":")[1];

    User.findOne({
      email: email
    }, (err, user) => {
      if (err) console.error(err);

      // if (user && user.isValidPassword(password)) {
      if (user && password) {
        req.user = user;
        return next();
      } else {
        res.json({
          error: "Your login info was incorrect"
        });
      }
    });
  });
}
