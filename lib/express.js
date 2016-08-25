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
            var healthy = true;

            for (var name in data) {
                var obj = data[name];

                if (!obj.connected || obj.error) {
                    healthy = false;
                }
            }

            res.status(healthy ? 200 : 500);
            res.header("Cache-Control", "no-cache");
            res.json(data);
        }, (err) => {
            res.status(500);
            res.end(err.toString());
        });
        return;
    }

    next();
}