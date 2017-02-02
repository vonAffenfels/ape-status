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
                    error: new Error("Not connected")
                });
            }

            if (!collectionName) {
                return resolve({
                    connected: true
                });
            }

            var collection = connection.collection(collectionName);
            var responseTimeStart = new Date().getTime();
            var tooLongTriggered = false;
            var tooLong = setTimeout(function () {
                tooLongTriggered = true;
                return resolve({
                    connected: false,
                    error: new Error("Query took more than 5 seconds")
                });
            }, 5000);

            return collection.findOne({}).then(() => {
                if (tooLongTriggered) {
                    return;
                }

                clearTimeout(tooLong);
                var responseTimeEnd = new Date().getTime();
                return resolve({
                    connected: true,
                    response_time: responseTimeEnd - responseTimeStart
                });
            }, (err) => {
                if (tooLongTriggered) {
                    return;
                }

                clearTimeout(tooLong);
                return resolve({
                    connected: false,
                    error: err
                });
            })
        });
    });
}