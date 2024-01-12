const env = require("dotenv");
env.config();

const ENV = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SECRET: process.env.SECRET,
};

module.exports = { ENV };
