module.exports = (mongoose) => {
  var Schema = mongoose.Schema;
  var schema = Schema({
    city: String,
    comments: [{
      comment: String,
      createdAt: Date,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }],
    name: String,
    state: String
  });
  return mongoose.model('Company', schema);
}
