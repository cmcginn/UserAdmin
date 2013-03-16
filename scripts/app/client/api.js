define('client/api',
    ['jquery', 'amplify'],
    function ($, amplify) {
        var
            init = function () {
                amplify.request.define("get", "ajax", {
                    url:"/api/{type}/{id}",
                    dataType:"json",
                    type:"GET"
                });
                amplify.request.define("post", "ajax", {
                    url:"/api/{type}/{id}",
                    dataType:"json",
                    type:"POST"
                });
            },
            events = {
                getUsersComplete:'getUsersComplete'
            },
            subscribe=function(event,callback){
                amplify.subscribe(event,callback);
            },
            get={
                users:function(options){

                }
            }

        return {
            init:init,
            events:events,
            subscribe:subscribe,
            get:get
        };
    });