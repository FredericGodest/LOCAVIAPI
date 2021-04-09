const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10; //for crypting

const User = require('../models/userModel');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRound)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "User created ! "})) // creation
                .catch(error => res.status(400).json({ error })); // Bad request
        })
        .catch(error => res.status(500).json({ error })); // internal servor error
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ error: "User not found ! "}); // Bad Request
            } else {
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Wrong password! "}); // Unauthorised status code
                    }
                    res.status(202).json({ // accepted status code
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET', // à modifier pour la prod
                            { expiresIn: '24h'}
                        ),
                        message: "Connected"
                    });
                })
                .catch(error => res.status(500).json({ error })); // internal servor error
            };
        })
        .catch(error => res.status(500).json({ error })); // internal servor error
};


exports.delete = (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({ // request OK
          message: 'User deleted!'
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


exports.passwordUpdate = (req, res, next) => {
    const oldPassword = req.body.oldPassword;
    const newPassword1 = req.body.newPassword1; 
    const newPassword2 = req.body.newPassword2; 

    // check if user exist
    User.findOne({ _id: req.params.id})
    .then((user) => {
        if (!user) {
            return res.status(400).json({ error: "User not found ! "}); // bad request
        } else {
            // check if old password is correct
            bcrypt.compare(oldPassword, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Wrong current password! "}); // Unauthorised Error
                    // check if current password and old password are identical
                    } else if (newPassword1 === oldPassword) {
                        res.status(400).json({ error: "current and new password are identical" }); // bad request
                    // check if password 1 and 2 are identical
                    } else if (newPassword1 === newPassword2 ) { 
                        bcrypt.hash(newPassword1, saltRound)
                            .then(hash => {
                                const user = new User({
                                    _id: req.params.id,
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: hash
                                });

                                User.updateOne({_id: req.params.id}, user)
                                    .then(() => res.status(202).json({ message: "User password updated ! "})) // Request accepted
                                    .catch(error => res.status(400).json({ error }));
                                })
                            .catch(error => res.status(500).json({ error })); // Servor Error
                    
                    } else {
                        res.status(400).json({ error: "Password 1 and 2 are not identical" }); // bad request
                    }
                })
                .catch(error => res.status(500).json({ error })); // internal servor error
        }
    })
    .catch(error => res.status(500).json({ error })); // internal servor error
}
