var mongoose = require('mongoose');

var adviceSchema = mongoose.Schema({
  userId: { type: String },
  create_date: {
    type: Date,
    default: Date.now
  },
  update_date: { type: Date },
  adress: { type: String },
  longitude: { type: Number }, //with Geocoder
  latitude: { type: Number }, //with Geocoder
  type: { type: String }, // Appart or house
  comments: { type: String },
  imageUrl: { type: String }, 
  surface: { type: Number }, //m2
  ratings: {
    thermal: { type: Number },
    sound: { type: Number },
    district: { type: Number },
    configuration: { type: Number },
    storage: { type: Number },
    brightness: { type: Number },
    final: {type: Number}
  },
});

// Export Advice model
var Advice = module.exports = mongoose.model('advice', adviceSchema)
