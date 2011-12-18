(function () {
    var zlib = require('zlib');
    require('bufferjs');

    exports.name = 'bricks compress';

    exports.plugin = function (request, response, options) {
        if (response.statusCode() === 200 && response.getHeader('Content-Encoding') !== 'gzip' && response.getHeader('Content-Encoding') !== 'deflate') {
            if (request.headers['accept-encoding'].match('gzip')) {
                var buffer = Buffer.concat(response.buffers);
                zlib.gzip(buffer, function (err, output) {
                    if (err) {
                        console.log(err);
                        response.next();
                    } else {
                        if (output.length >= buffer.length) {
                            response.next();
                        } else {
                            response.setHeader('Content-Encoding', 'gzip');
                            response.setHeader('Content-Length', output.length);
                            response.buffers = [ output ];
                            response.end();
                        }
                    }
                });
            } else if (request.headers['accept-encoding'].match('deflate')) {
                var buffer = Buffer.concat(response.buffers);

                zlib.deflate(buffer, function (err, output) {
                    if (err) {
                        console.log(err);
                        response.next();
                    } else {
                        response.setHeader('Content-Encoding', 'deflate');
                        response.setHeader('Content-Length', output.length);
                        response.buffers = [ output ];
                        response.end();
                    }
                });
            } else {
                response.next();
            }
        } else {
            response.next();
        }
    };
})();
