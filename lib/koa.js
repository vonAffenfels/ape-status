"use strict";

var registry = require("./registry.js");

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function (ctx, next) {
    return new Promise((resolve, reject) => {
        var config = require("../ape-status.js").config;
        var statusPath = config.path || "/ape/status";
        var statusBackendsPath = config.pathBackends || "/ape/status/backends";

        if (ctx.path == statusPath) {
            ctx.body = "";
            return resolve();
        }

        if (ctx.path == statusBackendsPath) {
            return registry.processAll().then((data) => {
                var healthy = true;

                for (var name in data) {
                    var obj = data[name];

                    if (!obj.connected || obj.error) {
                        healthy = false;
                    }
                }

                ctx.response.status = healthy ? 200 : 500;
                ctx.response.set("Cache-Control", "no-cache");
                ctx.body = data;
                return resolve();
            }, (err) => {
                ctx.response.status = 500;
                ctx.body = err.toString();
                return resolve();
            });
        }

        return next().then(resolve, reject);
    });
}