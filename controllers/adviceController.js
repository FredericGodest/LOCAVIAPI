//const e = require('cors');

Advice = require('../models/adviceModel');

exports.index = (req, res, next) => {
    Advice.find().then(
      (advices) => {
        res.status(200).json(advices);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.new = (req, res, next) => {
    let thermal = req.body.ratings.thermal;
    let sound = req.body.ratings.sound;
    let district = req.body.ratings.district;
    let configuration = req.body.ratings.configuration;
    let storage = req.body.ratings.storage;
    let brightness = req.body.ratings.brightness;
    let final = (thermal + sound + district + configuration + storage + brightness)/6;

    const advice = new Advice({
        estateId: req.body.estateId,
        userId: req.body.userId,
        date_in: req.body.date_in,
        date_out: req.body.date_out,
        comments: req.body.comments,
        
        ratings:{
            thermal: thermal,
            sound: sound,
            district: district,
            configuration: configuration,
            storage: storage,
            brightness: brightness,
            final: final,
        },
        create_date : Date.now(),
        update_date : Date.now(),
    });

    advice.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.searchById = (req, res, next) => {
    Advice.findOne({
      _id: req.params.id
    }).then(
      (advice) => {
        res.status(200).json(advice);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.update = (req, res, next) => {
    let thermal = req.body.ratings.thermal;
    let sound = req.body.ratings.sound;
    let district = req.body.ratings.district;
    let configuration = req.body.ratings.configuration;
    let storage = req.body.ratings.storage;
    let brightness = req.body.ratings.brightness;
    let final = (thermal + sound + district + configuration + storage + brightness)/6;

    const advice = new Advice({
        _id: req.params.id,
        estateId: req.body.estateId,
        userId: req.body.userId,
        date_in: req.body.date_in,
        date_out: req.body.date_out,
        comments: req.body.comments,
        
        ratings:{
            thermal: thermal,
            sound: sound,
            district: district,
            configuration: configuration,
            storage: storage,
            brightness: brightness,
            final: final,
        },
        
        update_date : Date.now(),
    });

    Advice.updateOne({_id: req.params.id}, advice).then(
      () => {
        res.status(201).json({
          message: 'Advice updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.delete = (req, res, next) => {
    Advice.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Advice deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};
  