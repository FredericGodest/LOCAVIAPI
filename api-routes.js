// api-routes.js
const auth = require('./middleware/auth');
// const dbConfig = require('./db.config');
var port = process.env.PORT || 8080;
// Initialize express router
let router = require('express').Router();

const http = require("http")
const io = require("socket.io");
const socket = io(http);

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'LOCAVI API is working',
        message: 'LOCAVI API'
    });
});

// Import controllers
var adviceController = require('./controllers/adviceController');

// Advice routes
router.get('/advice/all', adviceController.index);
router.post('/advice', adviceController.new);
router.get('/advice/:id', adviceController.searchById);
router.put('/advice/:id', adviceController.update);
router.delete('/advice/:id', adviceController.delete);

// Export API routes
module.exports = router;
