"use strict";

var registry = require("./registry.js");

/**
 *
 * @param name
 * @param pool
 */
module.exports = function (name, pool, query) {
    var name = "MYSQL-" + name;

    registry.add(name, function () {
        return new Promise((resolve, reject) => {
            var responseTimeStart = new Date().getTime();
            pool.getConnection((err, connection) => {
                if (err) {
                    return resolve({
                        connected: false,
                        error: err
                    });
                }

                if (query) {
                    return connection.query(query, {}, (err, result) => {
                        if (err) {
                            return resolve({
                                connected: false,
                                error: err
                            });
                        }

                        var responseTimeEnd = new Date().getTime();
                        connection.release();
                        return resolve({
                            connected: true,
                            response_time: responseTimeEnd - responseTimeStart
                        });
                    });
                } else {
                    connection.release();
                    return resolve({
                        connected: true
                    });
                }

            });
        });
    });
}