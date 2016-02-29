"use strict";

var registry = require("./registry.js");
var http = require("http");

/**
 *
 * @param name
 * @param url
 */
module.exports = function (name, url) {
    name = "WEBSERVICE-" + name;

    registry.add(name, function () {
        return new Promise((resolve, reject) => {
            var responseTimeStart = new Date().getTime();
            http.get(url, (res) => {
                if (res.statusCode !== 200) {
                    return resolve({
                        connected: false,
                        error: new Error(name + " status code != 200")
                    });
                }

                var responseTimeEnd = new Date().getTime();
                return resolve({
                    connected: true,
                    response_time: responseTimeEnd - responseTimeStart
                });
            }).on('error', (e) => {
                return resolve({
                    connected: false,
                    error: e
                });
            });
        });
    });
}