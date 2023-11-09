const { WHITELIST_DOMAINS } = require("../utils/constants");

const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  optionsSuccessStatus: 200,

  credentials: true,
};

module.exports = { corsOptions };
