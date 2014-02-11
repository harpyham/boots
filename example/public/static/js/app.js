require.config({
        baseUrl: 'static/js',
        paths: {
            "underscore":"underscore/underscore",
            "backbone":"backbone/backbone",
            "jquery-ui":"jquery-ui/jquery-ui-1.10.3.custom",
            "jquery": "jquery/jquery-1.10.2",
            "jquery.cookie": "jquery/jquery.cookie.min",
            "bootstrap": "bootstrap/bootstrap",
            "underscore": "underscore/underscore",
            "boots.menu": "boots/menu",
            "less":"less/less-1.6.1.js",
            "boots.events":"boots/events",
            "boots.app":"boots/app"
        },
        shim:{
             "bootstrap": {
                deps: ["jquery-ui","jquery"]
              },
             'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
             },
             'underscore': {
                 exports: '_'
             }
        } 
});


