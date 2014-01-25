require.config({
        baseUrl: 'static/js',
        paths: {
            "jquery-ui":"jquery/jquery-ui-1.10.3",
            "jquery": "jquery/jquery-1.10.2",
            "bootstrap": "bootstrap/bootstrap",
            "underscore": "underscore/underscore",
            "boots.menu": "boots/menu",
            "less":"less/less-1.6.1.js"
        },
        shim:{
             "bootstrap": {
                deps: ["jquery-ui","jquery"]
              }
        } 
});




require(['jquery','bootstrap','boots'],function($,bootstrap,boots){
    console.log("load OK");
   // example.init();
});
