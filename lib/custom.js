"use strict";

var registry = require("./registry.js");

/**
 *
 * @param connection
 */
module.exports = function (name, func) {
    registry.add(name, function () {
        return func();
    });
}