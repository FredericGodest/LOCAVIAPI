var mongoose = require('mongoose');

var estateSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    create_date: {type: Date, default: Date.now },
    update_date: { type: Date },
    address: { type: String, required: true },
    type: { type: String, required: true }, // Appart or house
    appartment_number: { type: String }, // appartment number is filled by the prop
    longitude: { type: Number, required: true }, //with Geocoder
    latitude: { type: Number, required: true }, //with Geocoder
    description: { type: String, required: true },
    imageUrl: { type: String }, 
    surface: { type: Number, required: true },//m2
});

// Export model

var Estate = module.exports = mongoose.model('estate', estateSchema)