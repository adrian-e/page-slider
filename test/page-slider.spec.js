var jsdom = require('jsdom');
var connect = require('connect');


describe('PageSlider', function () {
    var $;
    var staticServer;

    beforeAll(function (done) {
        // Start a local server for lib files
        var serveStatic = require('serve-static');
        staticServer = connect().use(serveStatic(__dirname + '/..')).listen(4242);
        done();
    });

    beforeEach(function (done) {
        jsdom.env({
            html: '<html><body></body></html>',
            scripts: [
                'http://localhost:4242/bower_components/jquery/dist/jquery.min.js',
                'http://localhost:4242/lib/page-slider.min.js',
            ],
            done: function (err, window) {
                if (err) console.log(err);
                $ = window.jQuery;
                PageSlider = window.PageSlider;
                done();
            }
        });
    });

    it('should add inline style to the container', function () {
        var $container = $('body');
        var slider = new PageSlider($container);

        expect($container.css('height')).toEqual('100%');
        expect($container.css('width')).toEqual('100%');
        expect($container.css('overflow')).toEqual('hidden');
    });

    afterAll(function (done) {
        staticServer.close();
        done();
    });
});
