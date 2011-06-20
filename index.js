var path = require('path');
var fs = require('fs');

exports.mkdirp = exports.mkdirP = function mkdirP (p, mode, f) {
    var cb = f || function () {};
    if (p.charAt(0) != '/') { cb(new Error('Relative path: ' + p)); return }
    
    var ps = path.normalize(p).split('/');
    path.exists(p, function (exists) {
        if (exists) cb(null);
        else mkdirP(ps.slice(0,-1).join('/'), mode, function (err) {
            if (err && err.errno != process.EEXIST) cb(err)
            else fs.mkdir(p, mode, cb);
        });
    });
};
