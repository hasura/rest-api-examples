"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objAggregate = exports.arrAggregate = void 0;
const knex_1 = require("knex");
const db = (0, knex_1.knex)({
    client: 'pg',
    connection: process.env.MAIN_DATABASE_URL,
});
exports.default = db;
const arrAggregate = (table) => db.raw(`coalesce(array_to_json(array_agg(row_to_json("${table}"))),'[]')`);
exports.arrAggregate = arrAggregate;
const objAggregate = (table) => db.raw(db.raw(`row_to_json("${table}")`));
exports.objAggregate = objAggregate;
