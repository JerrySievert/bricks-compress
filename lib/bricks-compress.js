(function () {
    var compress = require('compress-buffer').compress;

    exports.plugin = function (request, response, options) {
        if (response.statusCode() === 200 && 
            (request.headers['accept-encoding'].match('gzip') || request.headers['accept-encoding'].match('*'))) {
            var buffers = [ ];
            var length = 0;

            for (var i = 0; i < response.buffers.length; i++) {
                var data = compress(response.buffers[i]);
                if (data) {
                    length += data.length;
                    buffers.push(data);
                }
            }
            
            if (buffers.length) {
                response.setHeader('Content-Encoding', 'gzip');
                response.setHeader('Content-Length', length);
                response.buffers = buffers;
            }
        }
        
        response.end();
    };
})();