require.config({
        baseUrl: 'static/js',
        paths: {
            "jquery-ui":"jquery/jquery-ui-1.10.3",
            "jquery": "jquery/jquery-1.10.2",
            "bootstrap": "bootstrap/bootstrap"
        },
        shim:{
             "bootstrap": {
                deps: ["jquery-ui","jquery"]
              }
        } 
});




require(['jquery','bootstrap','boots'],function($,bootstrap,boots){
    console.log("load OK");
    boots.init();
});
