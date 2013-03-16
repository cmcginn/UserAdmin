define('client/dataservice', ['jquery', 'amplify', 'jquery.mockjson'],
    function ($, amplify, mock) {
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
            subscribe = function (event, callback) {
                amplify.subscribe(event, callback);
            },
            result=function(data){
                return {data:data,status:'200',xhr:data};
            },
            get = {
                users:function () {
                    var data = $.mockJSON.generateFromTemplate({
                        'users|8-20':[
                            {
                                'id':1,
                                'username':'@LAST_NAME',
                                'password':'@LOREM'
                            }
                        ]
                    });
                  amplify.publish(events.getUsersComplete,result(data));
                }
            }
        return{
            init:init,
            events:events,
            subscribe:subscribe,
            get:get
        }
    });