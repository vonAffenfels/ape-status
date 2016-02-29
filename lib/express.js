"use strict";

var registry = require("./registry.js");

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {

    var config = require("../ape-status.js").config;
    var statusPath = config.path || "/ape/status";
    var statusBackendsPath = config.pathBackends || "/ape/status/backends";

    if (req.path == statusPath) {
        res.status(200);
        res.end();
        return;
    }

    if (req.path == statusBackendsPath) {
        registry.processAll().then((data) => {
            res.status(200);
            res.json(data);
        }, (err) => {
            res.status(500);
            res.end(err.toString());
        });
        return;
    }

    next();
}