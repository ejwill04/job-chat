module.exports = (mongoose) => {
  var Schema = mongoose.Schema;
  var schema = Schema({
    city: String,
    comments: String,
    name: String,
    state: String
  });
  return mongoose.model('Company', schema);
}
