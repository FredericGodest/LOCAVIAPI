var mongoose = require('mongoose');

var adviceSchema = mongoose.Schema({
  estateId: { type: String, required: true },
  userId: { type: String, required: true },
  create_date: {type: Date, default: Date.now },
  update_date: { type: Date },
  date_in: {type: Date, required: true},
  date_out: {type: Date, required: true},
  comments: { type: String }, 
  
  ratings: {
    thermal: { type: Number, required: true },
    sound: { type: Number, required: true },
    district: { type: Number },
    configuration: { type: Number, required: true },
    storage: { type: Number, required: true },
    brightness: { type: Number, required: true },
    final: {type: Number, required: true}
  },
});

// Export Advice model
var Advice = module.exports = mongoose.model('advice', adviceSchema)
