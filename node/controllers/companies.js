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
    var comments = req.body.comments;
    var name = req.body.name;
    var state = req.body.state;

    var company = {
      city: city,
      comments: comments,
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
    var comments = req.body.comments;
    var name = req.body.name;
    var state = req.body.state;

    var company = {
      city: city,
      comments: comments,
      name: name,
      state: state
    };

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
}
