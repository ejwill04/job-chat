// GET /companies/index
Company
  .find({})
  .select("_id name")
  .exec((err, company) => {

  });

// GET /companies/with-user-data
Company
  .findOne({ _id: id })
  .populate("users")
  .exec((err, company) => {

  });
