"use strict";

var registry = require("./registry.js");

/**
 *
 * @param name
 * @param pool
 */
module.exports = function (name, pool) {
    var name = "MYSQL-" + name;

    registry.add(name, function () {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.release();

                return resolve({
                    connected: true
                });
            });
        });
    });
}