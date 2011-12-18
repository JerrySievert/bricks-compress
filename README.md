# BREAKING CHANGE
As of v0.2.0, `bricks-compress` is only available for node v0.6+

# bricks-compress #

`bricks-compress` adds output deflating using `gzip` to `bricks.js`.  To be most effective, this plugin should be added to the `post route`.

## Installing ##

    npm install bricks-compress

## Usage ##

    var compress = require('bricks-compress');
    
    appServer.addRoute(".+", compress, { section: "post" });
    
    // or selectively
    appServer.addRoute(".+css$", compress, { section: "post" });
