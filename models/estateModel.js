var mongoose = require('mongoose');
var locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});
var estateSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    create_date: {type: Date, default: Date.now },
    update_date: { type: Date },
    address: { type: String, required: true },
    type: { type: String, required: true }, // Appart or house
    appartment_number: { type: String }, // appartment number is filled by the prop
    description: { type: String, required: true },
    imageUrl: { type: String },
    surface: { type: Number, required: true },//m2
    location: [locationSchema]
});

// Export model
var Estate = module.exports = mongoose.model('estate', estateSchema)
