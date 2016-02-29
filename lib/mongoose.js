"use strict";

var registry = require("./registry.js");

/**
 *
 * @param connection
 */
module.exports = function (connection, collectionName) {
    var name = "MONGOOSE-" + connection.name;

    registry.add(name, function () {
        return new Promise((resolve, reject) => {
            if (connection._readyState != 1) {
                return resolve({
                    connected: false,
                    error: err
                });
            }

            if (!collectionName) {
                return resolve({
                    connected: true
                });
            }

            var collection = connection.collection(collectionName);
            var responseTimeStart = new Date().getTime();

            return collection.findOne({}).then(() => {
                var responseTimeEnd = new Date().getTime();
                return resolve({
                    connected: true,
                    response_time: responseTimeEnd - responseTimeStart
                });
            }, (err) => {
                return resolve({
                    connected: false,
                    error: err
                });
            })
        });
    });
}