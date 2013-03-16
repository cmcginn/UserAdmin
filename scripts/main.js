requirejs.config({
    baseUrl:'../scripts/lib',
    paths:{
        'app':'../app',
        'client':'../app/client',
        'views':'../app/client/views',
        'mock':'../app/client/mock',
        'models':'../app/client/models'
    },
    waitSeconds:10
});
require(['client/bootstrapper'],function(bs){
    define('jquery',[],function(){return root.jQuery});
    bs.run();
});
