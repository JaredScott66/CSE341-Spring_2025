const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already Intitialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.DATA_BASE_URI)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};
const getDatabase = () => {
    if (!database) {
        throw Error('Database is not Intialized')
    }
    return database;
};

module.exports = {initDb, getDatabase};