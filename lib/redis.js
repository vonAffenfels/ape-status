"use strict";

var registry = require("./registry.js");

/**
 *
 * @param name
 * @param url
 */
module.exports = function (client, name) {
    name = "REDIS-" + name;

    registry.add(name, function () {
        return new Promise((resolve, reject) => {
            if(client.connected) {
                return resolve({
                    connected: true
                });
            } else {
                return resolve({
                    connected: false,
                    error: "Redis not connected"
                });
            }
        });
    });
}