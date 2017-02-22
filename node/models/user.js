module.exports = (mongoose) => {
  var Schema = mongoose.Schema;
  var schema = Schema({
    email: String,
    name: String
  });
  return mongoose.model('User', schema);
}
