"use strict";

var fs = require("fs");
var path = require("path");

module.exports = {
    mongoose: require("./lib/mongoose.js"),
    express: require("./lib/express.js"),
    webservice: require("./lib/webservice.js"),
    mysql: require("./lib/mysql.js"),

    /**
     *
     * @param config
     */
    configure: function (config) {
        this.config = config || {};
        this.infoObj = config.info || {};

        if (!this.config.root) {
            throw new Error("Please supply the application root directory to ape-status!");
        }

        this.config.root = path.resolve(this.config.root);

        if (!this.config.infoName) {
            this.config.infoName = "APPINFO.json";
        }
    },

    /**
     *
     */
    saveJSONInfo: function () {
        fs.writeFileSync(this.config.root + "/" + this.config.infoName, JSON.stringify(this.getInfoObj()));
    },

    /**
     *
     * @param name
     * @param val
     */
    info: function (name, val) {
        this.infoObj[name] = val;
    },

    /**
     *
     * @returns {module.exports.info}
     */
    getInfoObj: function () {
        return this.infoObj;
    }
};