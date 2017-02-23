module.exports = (mongoose) => {
  var bcrypt = require('bcrypt-nodejs');

  var Schema = mongoose.Schema;
  var schema = Schema({
    email: String,
    name: String,
    password: String
  });

  schema.statics.getPasswordHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  schema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  return mongoose.model('User', schema);
}
