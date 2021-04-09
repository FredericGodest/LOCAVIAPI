const Advice = require('../models/adviceModel');

exports.index = (req, res, next) => {
    Advice.find().then(
      (advices) => {
        res.status(200).json(advices); // request OK
      }
    ).catch(
      (error) => {
        res.status(400).json({ // bad request
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
        dateIn: req.body.dateIn,
        dateOut: req.body.dateOut,
        comment: req.body.comment,

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
    delta = (advice.dateOut - advice.dateIn)/(1000*60*60*24); // in days

    if (delta < 0){
      let error =  "date de départ avant date d'arrivée";
      res.status(400).json({error: error});
    } else if ( delta < 90 ){
      let error =  "différence entre date d'arrivée et de départ inférieure à 3 mois";
      res.status(400).json({error: error});
    } else {
      advice.save().then(
        (advice) => {
          res.status(201).json({ // creation code status
            id: advice.id,
            message: 'Advice saved successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({ // bad request
            error: error
          });
        }
      );
    };
};

exports.searchById = (req, res, next) => {
    Advice.findOne({_id: req.params.id})
    .then(
      (advice) => {
        res.status(200).json(advice); // request OK
      }
    ).catch(
      (error) => {
        res.status(404).json({ // not found
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
        dateIn: req.body.dateIn,
        dateOut: req.body.dateOut,
        comment: req.body.comment,

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
        res.status(202).json({ // Request accepted
          message: 'Advice updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ // bad request
          error: error
        });
      }
    );
};

exports.delete = (req, res, next) => {
    Advice.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({ // request OK
          message: 'Advice deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ // bad request
          error: error
        });
      }
    );
};
