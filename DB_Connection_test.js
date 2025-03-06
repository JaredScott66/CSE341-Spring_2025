/* Database practice */

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bobswag21:Q91WSOBGnt5FsiyX@cluster0.ybi52.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Mongo Client with options set to stable client version
const client = new MongoClient(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function run() {
    try {
        //connect client to server
        await client.connect();
        //send ping to confirm connection
        await client.db("admin").command({ ping: 1});
        console.log("Pinged your deployment. You are connected!")
        //Print database List
        await listDatabases(client);
    } finally {
        // Ensures that client will close when you finish/error
        console.log("\nConnection close")
        await client.close();
    }
}

// List databases in Mongo cluster0
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    });
}

run().catch(console.dir)