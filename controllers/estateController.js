const Estate = require('../models/estateModel');

exports.index = (req, res, next) => {
    Estate.find().then(
      (estates) => {
        res.status(200).json(estates); // Request OK
      }
    ).catch(
      (error) => {
        res.status(400).json({ // Bad request
          error: error
        });
      }
    );
};

exports.new = (req, res, next) => {
    const estate = new Estate({
        userId: req.body.userId,
        title: req.body.title,
        create_date : Date.now(),
        update_date : Date.now(),
        address: req.body.address,
        type: req.body.type,
        appartment_number: req.body.appartment_number,
        location: {
         type: "Point",
         coordinates: [ req.body.longitude, req.body.latitude]
        },
        description: req.body.description,
        image_url: req.body.image_url,
        surface: req.body.surface,

    });

    estate.save().then(
      (estate) => {
        res.status(201).json({ // Creation code status
          id: estate.id,
          message: 'Estate saved successfully!'
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

exports.searchById = (req, res, next) => {
    Estate.findOne({
      _id: req.params.id
    }).then(
      (estate) => {
        res.status(200).json(estate); // Code status OK
      }
    ).catch(
      (error) => {
        res.status(404).json({ // Code status not found
          error: error
        });
      }
    );
};

exports.searchByLocation = function (req, res) {
 Estate.find({
   "location": {
       "$geoWithin": {
           "$centerSphere": [ [ req.body.longitude, req.body.latitude ], req.body.radius / 6378.1 ] //Divide radians by the equatorial radius of Earth
       }
   }
 }).then(
   (estates) => {
     res.status(200).json(estates); // Code status OK
   }
 ).catch(
   (error) => {
     res.status(404).json({ // Code status not found
       error: error
     });
   }
 );
};

exports.update = (req, res, next) => {
    const estate = new Estate({
        _id: req.params.id,
        userId: req.body.userId,
        title: req.body.title,
        update_date : Date.now(),
        address: req.body.address,
        type: req.body.type,
        appartment_number: req.body.appartment_number,
        location: {
         type: "Point",
         coordinates: [ req.body.longitude, req.body.latitude]
        },
        description: req.body.description,
        image_url: req.body.image_url,
        surface: req.body.surface,
    });

    Estate.updateOne({_id: req.params.id}, estate).then(
      () => {
        res.status(202).json({ // request accepted
          message: 'Estate updated successfully!'
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
    Estate.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({ // request ok
          message: 'Estate deleted!'
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
