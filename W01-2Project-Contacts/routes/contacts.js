const express = require('express');
const routes = express.Router();

routes.get('/contacts', getContact);




module.exports = routes;