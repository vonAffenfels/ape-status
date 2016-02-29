"use strict";

var registry = require("./registry.js");

/**
 *
 * @param connection
 */
module.exports = function (connection) {
    var name = "MONGOOSE-" + connection.name;

    registry.add(name, function () {
        return new Promise((resolve, reject) => {
            if (connection._readyState != 1) {
                throw new Error(name + " disconnected!");
            }

            return resolve({
                connected: true
            });
        });
    });
}