const { MongoClient, ServerApiVersion } = require("mongodb");
const { ENV } = require("../config/environment");

let instance = null;

const client = new MongoClient(ENV.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const CONNECT_DB = async () => {
  await client.connect();

  instance = client.db(ENV.DATABASE_NAME);
};

const GET_DB = () => {
  if (!instance) throw new Error("Hãy kết nối DataBase !");
  return instance;
};

module.exports = { CONNECT_DB, GET_DB };
