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
                    return reject(new Error(name + " status code != 200"));
                }

                var responseTimeEnd = new Date().getTime();
                return resolve({
                    available: true,
                    response_time: responseTimeEnd - responseTimeStart
                });
            }).on('error', (e) => {
                return reject(e);
            });
        });
    });
}