/* global process, require */
/* jshint node: true */
'use strict';

var fs = require('fs');

fs.readFile('node.pid', function (err, data) {
    if (err) { throw err; }
    console.log("Node PID: " + data);
    process.kill(data, 'SIGINT');

    // FIXME: The file is not removed on the FS.
    fs.unlink('node.pid', function(err) {
        if (err) { throw err; }
    });
});
