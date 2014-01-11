require.config({
        baseUrl: 'static/js',
        paths: {
            "jquery": "jquery/jquery-1.10.2",
            "bootstrap": "bootstrap/bootstrap"
        },
        shim:{
             "bootstrap": {
                deps: ["jquery"]
              }
        } 
});
       
require(['jquery','bootstrap'],function($,bootstrap){
    console.log("load OK");
});
