const express = require('express');
const app = express();
const routes = require("./routes");
const mongodb = require('./db/database.js');

const port = process.env.PORT || 3000;

app.use('/', routes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    };
});

