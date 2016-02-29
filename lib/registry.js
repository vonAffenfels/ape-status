"use strict";

module.exports = {

    backends: [],

    /**
     *
     * @param name
     * @param func
     */
    add: function (name, func) {
        this.backends.push({
            name: name,
            func: func
        });
    },

    /**
     *
     * @returns {bluebird|exports|module.exports}
     */
    processAll: function () {
        return new Promise((resolve, reject) => {
            return Promise.map(this.backends, (backend) => {
                return backend.func();
            }).then((results) => {
                var statusObj = {};

                for (var i = 0; i < this.backends.length; i++) {
                    var backend = this.backends[i];
                    statusObj[backend.name] = results[i];
                }

                return resolve(statusObj);
            }, reject);
        });
    }

};