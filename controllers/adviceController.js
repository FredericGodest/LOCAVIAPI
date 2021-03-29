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
    advice.address = req.body.address;
    advice.appartment_number = req.body.appartment_number;
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

    advice.ratings.thermal = thermal;
    advice.ratings.sound = sound;
    advice.ratings.district = district;
    advice.ratings.configuration = configuration;
    advice.ratings.storage = storage;
    advice.ratings.brightness = brightness;
    advice.ratings.final = (thermal + sound + district + configuration + storage + brightness)/6;
    
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

exports.searchById = function (req, res){
    Advice.findOne({ _id: req.params.id },function(err, advice){
        if (err) {
            res.json({
                status: "No advice",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Advice found",
            data: advice,
        });
    });
};

exports.update = function(req, res){
    var advice = new Advice();
    advice._id = req.params.id;
    advice.userId = req.body.userId;
    advice.address = req.body.address;
    advice.appartment_number = req.body.appartment_number;
    advice.longitude = req.body.longitude;
    advice.latitude = req.body.latitude;
    advice.type = req.body.type;
    advice.comments = req.body.comments;
    advice.imageUrl = req.body.imageUrl;
    advice.surface = req.body.surface;
    advice.description = req.body.description;

    thermal = req.body.ratings.thermal;
    sound = req.body.ratings.sound;
    district = req.body.ratings.district;
    configuration = req.body.ratings.configuration;
    storage = req.body.ratings.storage;
    brightness = req.body.ratings.brightness;

    advice.ratings.thermal = thermal;
    advice.ratings.sound = sound;
    advice.ratings.district = district;
    advice.ratings.configuration = configuration;
    advice.ratings.storage = storage;
    advice.ratings.brightness = brightness;
    advice.ratings.final = (thermal + sound + district + configuration + storage + brightness)/6;
    
    advice.update_date = Date.now();

    Advice.updateOne({ _id: req.params.id }, function(err, advice){
        if (err) {
            res.json({
                status: "No advice found",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Advice updated",
            data: advice
        });
    });
};

exports.delete = function(req, res){
    Advice.deleteOne({ _id: req.params.id }, function(err, advice){
        if (err) {
            res.json({
                status: "No advice",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Advice deleted",
            data: advice,
        });
    });
};