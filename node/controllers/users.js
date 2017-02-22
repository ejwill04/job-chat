var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (app) => {

  //list users
  app.get('/users', (req, res) => {
    User
      .find({}, (err, users) => {
        if (err) console.error(err);

        res.json({
          users: users
        });
      });
  });

  //create user
  app.post('/users', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;

    var user = {
      email: email,
      name: name
    };

    User.create(user, (err, user) => {
      if (err) console.error(err);

      res.json({
        user: user
      });
    });
  });

  //show user
  app.get('/users/:id', (req, res) => {
    var id = req.params.id;

    User.findOne({
      _id: id
    }, (err, user) => {
      if (err) console.error(err);

      res.json({
        user: user
      });
    });
  });

  //update user
  app.put('/users/:id', (req, res) => {
    var id = req.params.id;
    var email = req.body.email;
    var name = req.body.name;

    var user = {
      email: email,
      name: name
    };

    User.findOneAndUpdate({
      _id: id
    }, user, {
      new: true
    }, (err, user) => {
      if (err) console.error(err);

      res.json({
        user: user
      });
    });
  });

  //delete user
  app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    User.remove({_id: id}, (err, raw) => {
      if (err) console.error(err);
      res.json(raw);
    });
  });
}
