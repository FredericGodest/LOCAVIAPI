// api-routes.js
const auth = require('./middleware/auth');
// const dbConfig = require('./db.config');
var port = process.env.PORT || 8080;
// Initialize express router
let router = require('express').Router();

// Import controllers
var adviceController = require('./controllers/adviceController');
var estateController = require('./controllers/estateController');
var userController = require('./controllers/userController');

// Advice routes
router.get('/advice/all', auth, adviceController.index);
//router.post('/advice', auth, adviceController.new);
router.post('/advice', adviceController.new); // sans auth pour debug
router.get('/advice/:id', adviceController.searchById);
router.put('/advice/:id', auth, adviceController.update);
router.delete('/advice/:id', auth, adviceController.delete);

// Estate routes
router.get('/estate/all', auth, estateController.index);
router.get('/estate/location', estateController.searchByLocation);
router.post('/estate', auth, estateController.new);
router.get('/estate/:id', estateController.searchById);
router.put('/estate/:id', auth, estateController.update);
router.delete('/estate/:id', auth, estateController.delete);

// Users routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Export API routes
module.exports = router;
