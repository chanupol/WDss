/**
 * Created by chanupolphermpoon on 3/28/2016 AD.
 */

'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();

//
// Create server
server.connection({
    host: "localhost",
    port: 8009,
    routes: {
        cors: true
    }
});

//
// Add routes
var plugins = [
    {
        register: require("inert")
    },
    {
        register: require("./server/routes/security/security.js")
    },
    {
        register: require("./server/routes/index.js")
    },
    {
        register: require('./server/routes/import/video.js')
    },
    {
        register: require('./server/routes/import/teacher.js')
    },
    {
        register: require('./server/routes/report/report.js')
    }];

server.register(plugins, function (err) {
    if (err) {
        throw err;
    }

    if (!module.parent) {
        server.start(function (err) {
            if (err) {
                throw err;
            }

            console.log("info", "server running at: " + server.info.uri);
        });
    }
});

module.exports = server;