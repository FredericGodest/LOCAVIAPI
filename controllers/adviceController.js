Advice = require('../models/adviceModel');

exports.index = function (req, res) {
    Advice.find({}, function (err, advices) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Advices retrieved successfully",
            data: advices
        });
    });
};
exports.new = function (req, res) {
    var advice = new Advice();
    advice.userId = req.body.userId;
    advice.adress = req.body.title;
    advice.longitude = req.body.longitude;
    advice.latitude = req.body.latitude;
    advice.type = req.body.type;
    advice.comments = req.body.comments;
    advice.imageUrl = req.body.imageUrl;
    advice.surface = req.body.surface;
    advice.description = req.body.description;

    thermal = req.body.ratings.thermal
    sound = req.body.ratings.sound;
    district = req.body.ratings.district;
    configuration = req.body.ratings.configuration;
    storage = req.body.ratings.storage;
    brightness = req.body.ratings.brightness;

    advice.ratings.thermal = thermal
    advice.ratings.sound = sound;
    advice.ratings.district = district;
    advice.ratings.configuration = configuration;
    advice.ratings.storage = storage;
    advice.ratings.brightness = brightness;
    advice.ratings.final = (thermal + sound + district + configuration + storage + brightness)/6;
    
    advice.price = req.body.price;
    advice.update_date = Date.now();

    advice.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New advice created!',
            data: advice
        });
    });
};
