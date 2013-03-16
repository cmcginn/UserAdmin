define('client/bootstrapper',
    ['jquery','client/dataservice','views/main'],
    function ($, ds,main) {
        var
            run = function () {
                ds.init();
                main.init();
            };

        return {
            run: run
        };
    });