const { ENV } = require("../config/environment");

const WHITELIST_DOMAINS = [`http://localhost:${ENV.PORT}`];

module.exports = { WHITELIST_DOMAINS };
