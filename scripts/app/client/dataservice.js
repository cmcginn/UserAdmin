define('client/dataservice', ['jquery','lodash', 'amplify', 'jquery.mockjson'],
    function ($,_, amplify, mock) {
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
                           if(amplify.store("users")==undefined)
                            {
                                var data = $.mockJSON.generateFromTemplate({
                                    'users|8-20':[
                                        {
                                            'id|+1':1,
                                            'username':'@LAST_NAME',
                                            'password':'@LOREM'
                                        }
                                    ]
                                });
                                amplify.store("users",data);
                             }
                  amplify.publish(events.getUsersComplete,result(amplify.store("users")));
                }
            },
            post={
                user:function(options){

                    var data = amplify.store("users");
                    console.log(data);
                    var item = _.where(data.users,{id:options.id})[0];
                    var index = _.indexOf(data.users,item);
                    data.users[index].username=options.username;
                    amplify.store("users",data);
                }
            }

        return{
            init:init,
            events:events,
            subscribe:subscribe,
            get:get,
            post:post
        }
    });