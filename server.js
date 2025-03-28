const express = require('express');
const app = express();
const routes = require("./routes");
const mongodb = require('./db/database.js');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origen, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next()
    })
    .use('/', routes);
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.use('/', routes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    };
});

