const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged the deployment. Successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
