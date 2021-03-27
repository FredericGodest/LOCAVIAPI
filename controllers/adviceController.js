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
    advice.title = req.body.title ? req.body.title : "Unknown Advice";
    advice.description = req.body.description;
    advice.comments = req.body.comments;
    advice.imageUrl = req.body.imageUrl;
    advice.userId = req.body.userId;
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
