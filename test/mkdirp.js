var mkdirp = require('mkdirp').mkdirp;
var path = require('path');
var fs = require('fs');

exports.woo = function (assert) {
    var x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    var file = '/tmp/' + [x,y,z].join('/');
    
    mkdirp(file, 0755, function (err) {
        if (err) assert.fail(err);
        else path.exists(file, function (ex) {
            if (!ex) assert.fail('file not created')
            else fs.stat(file, function (err, stat) {
                if (err) assert.fail(err)
                else {
                    assert.eql(stat.mode & 0777, 0755);
                    assert.ok(stat.isDirectory(), 'target not a directory');
                }
            })
        })
    });
};
