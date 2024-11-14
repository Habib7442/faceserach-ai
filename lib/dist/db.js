"use strict";
exports.__esModule = true;
exports.query = void 0;
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
exports.query = function (text, params) { return pool.query(text, params); };
