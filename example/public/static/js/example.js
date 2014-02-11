define('example', [ 'jquery', 'boots.app' ], function ($, app) {
    "use strict";
    return app({
        name: 'example',
        init: function () {
            this.base_init();
            console.log("start app:" + this.name);
        }
    });
});



