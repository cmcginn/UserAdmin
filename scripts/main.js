requirejs.config({
    baseUrl:'../scripts/lib',
    paths:{
        'app':'../app',
        'client':'../app/client',
        'controls':'../app/client/controls',
        'views':'../app/client/views',
        'viewmodels':'../app/client/viewmodels',
        'mock':'../app/client/mock',
        'models':'../app/client/models'
    },
    waitSeconds:10
});
require(['client/bootstrapper'],function(bs){
    define('jquery',[],function(){return root.jQuery});
    bs.run();
});
