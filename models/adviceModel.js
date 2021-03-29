var mongoose = require('mongoose');

var adviceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  create_date: {type: Date, default: Date.now },
  update_date: { type: Date },
  //date_in: {type: DataCue, required: true},
  //date_out: {type: DataCue, required: true},
  address: { type: String, required: true },
  appartment_number: { type: String }, // appartment number is filled by the prop
  longitude: { type: Number, required: true }, //with Geocoder
  latitude: { type: Number, required: true }, //with Geocoder
  type: { type: String, required: true }, // Appart or house
  comments: { type: String }, 
  imageUrl: { type: String }, 
  surface: { type: Number, required: true }, //m2
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
