var mongoose = require('mongoose');
var Company = mongoose.model('Company');

module.exports = (app) => {

  //list companies
  app.get('/companies', (req, res) => {
    Company
      .find({}, (err, companies) => {
        if (err) console.error(err);

        res.json({
          companies: companies
        });
      });
  });

  //create company
  app.post('/companies', (req, res) => {
    var city = req.body.city;
    var name = req.body.name;
    var state = req.body.state;

    var company = {
      city: city,
      name: name,
      state: state
    };

    Company.create(company, (err, company) => {
      if (err) console.error(err);

      res.json({
        company: company
      });
    });
  });

  //show company
  app.get('/companies/:id', (req, res) => {
    var id = req.params.id;

    Company.findOne({
      _id: id
    }, (err, company) => {
      if (err) console.error(err);

      res.json({
        company: company
      });
    });
  });

  //update company
  app.put('/companies/:id', (req, res) => {
    var id = req.params.id;
    var city = req.body.city;
    var name = req.body.name;
    var state = req.body.state;

    var company = {
      city: city,
      name: name,
      state: state
    };

    // Company.findOne({
    //   _id: id
    // }, (err, dbcompany) => {
    //   dbcompany.city = company.city
    //
    //   dbcompany.save((err, dbcompany) ==> {
    //
    //   })
    // });

    Company.findOneAndUpdate({
      _id: id
    }, company, {
      new: true
    }, (err, company) => {
      if (err) console.error(err);

      res.json({
        company: company
      });
    });
  });

  //delete company
  app.delete('/companies/:id', (req, res) => {
    var id = req.params.id;
    Company.remove({_id: id}, (err, raw) => {
      if (err) console.error(err);
      res.json(raw);
    });
  });

  //nested comments object
  app.post('/companies/:id/comments', (req, res) => {
    var id = req.params.id;
    var comment = req.body.comment;
    var createdAt = new Date();
    var user = req.user.id;

    var comment = {
      comment: comment,
      createdAt: createdAt,
      user: user
    };

    Company.findOneAndUpdate({
      _id: id
    }, {
      $push: {
        comments: comment
      }
    }, {
      new: true
    }, (err, company) => {
      if (err) console.error(err);
      res.json({
        company: company
      });
    });
  });

  app.put('/companies/:id/comments/:commentId', (req, res) => {
    var id = req.params.id;
    var commentId = req.params.commentId;
    var comment = req.body.comment;

    Company.findOneAndUpdate({
      _id: id,
      "comments._id": commentId
    }, {
      $set: {
        "comments.$.comment": comment
      }
    }, {
      new: true
    }, (err, company) => {
      if (err) console.error(err);

      res.json({
        company: company
      });
    });
  });

  app.delete('/companies/:id/comments/:commentId', (req, res) => {
    var id = req.params.id;
    var commentId = req.params.commentId;

    Company.findOneAndUpdate({
      _id: id,
    }, {
      $pull: {
        "comments": {
          _id: commentId
        }
      }
    }, {
      new: true
    }, (err, company) => {
      if (err) console.error(err);

      res.json({
        company: company
      });
    });
  });

  app.get('/com/populate', (req, res) => {
    Company
      .find({})

      // add to get methods to link user to company
      //exec
      .populate("comments.user")
      .exec((err, companies) => {
        if (err) console.error(err);

        res.json({
          companies: companies
        });
      });
  });
}
