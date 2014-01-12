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




require(['jquery','bootstrap','boots'],function($,bootstrap,boots){
    console.log("load OK");
    boots.init();
});
