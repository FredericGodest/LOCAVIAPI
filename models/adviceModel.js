var mongoose = require('mongoose');

var adviceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  comments: { type: String },
  imageUrl: { type: String },
  userId: { type: String },
  price: { type: Number },
  create_date: {
    type: Date,
    default: Date.now
  },
  update_date: { type: Date }
});

// Export Advice model
var Advice = module.exports = mongoose.model('advice', adviceSchema)
