define('client/dataservice', ['jquery', 'lodash', 'amplify', 'jquery.mockjson'],
    function ($, _, amplify, mock) {
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
                getUsersComplete:'getUsersComplete',
                getRolesComplete:'getRolesComplete',
                getUserRolesComplete:'getUserRolesComplete',
                getAccountsComplete:'getAccountsComplete'
            },
            subscribe = function (event, callback) {
                amplify.subscribe(event, callback);
            },
            result = function (data) {
                return {data:data, status:'200', xhr:data};
            },
            get = {
                users:function () {
                    if (amplify.store("users") == undefined) {
                        var data = $.mockJSON.generateFromTemplate({
                            'users|8-20':[
                                {
                                    'id|+1':1,
                                    'username':'@LAST_NAME',
                                    'password':'@LOREM'
                                }
                            ]
                        });
                        amplify.store("users", data);
                    }
                    amplify.publish(events.getUsersComplete, result(amplify.store("users")));
                },
                roles:function () {
                    if (amplify.store("roles") == undefined) {
                        var data = {roles:[
                            {id:1, name:'Administrators', system:true},
                            {id:2, name:'System', system:true},
                            {id:3, name:'Editors', system:false},
                            {id:4, name:'Registered', system:false}
                        ]};

                        amplify.store("roles", data);
                    }
                    amplify.publish(events.getRolesComplete, result(amplify.store("roles")));
                },
                userRoles:function () {
                    if (amplify.store("userRoles") == undefined) {
                        var data = {userRoles:[]};
                        amplify.store("userRoles", data);
                    }
                    amplify.publish(events.getUserRolesComplete, result(amplify.store("userRoles")));
                },
                accounts:function () {
                    if (amplify.store("accounts") == undefined) {
                        var data = $.mockJSON.generateFromTemplate({
                            'accounts|8-20':[
                                {
                                    'userId|+1':1,
                                    'username':'@LAST_NAME',
                                    'password':'@LOREM'

                                }
                            ]
                        });
                        for(var i =0;i<data.accounts.length;i++)
                        {
                            data.accounts[i].roles = [
                                        {id:1, name:'Administrators', system:true,selected:false},
                                        {id:2, name:'System', system:true,selected:false},
                                        {id:3, name:'Editors', system:false,selected:false},
                                        {id:4, name:'Registered', system:false,selected:false}
                                    ];
                        }
                        amplify.store("accounts",data);
                    }
                    amplify.publish(events.getAccountsComplete,result(amplify.store("accounts")));
                }
            },
            put = {
                user:function (options) {

                    var data = amplify.store("users");
                    var item = _.where(data.users, {id:options.id})[0];
                    var index = _.indexOf(data.users, item);
                    data.users[index].username = options.username;
                    amplify.store("users", data);
                },
                role:function (options) {
                    var data = amplify.store("roles");
                    var item = _.where(data.roles, {id:options.id})[0];
                    var index = _.indexOf(data.roles, item);
                    data.roles[index].name = options.name;
                    data.roles[index].system = options.system;
                    amplify.store("roles", data);
                },
                userRoles:function (options) {
                    var data = amplify.store("userRoles");
                    var item = _.where(data.userRoles, {id:options.id});
                    if (item != null) {
                        item = item[0];
                        var index = _.indexOf(data.userRoles, item);
                        data.userRoles[index].userId = options.userId;
                        data.userRoles[index].roleId = options.roleId;
                    } else {
                        //refactor put and post
                        data.push(options);
                    }
                    amplify.store("userRoles", data);
                },
                account:function(options){
                    var data = amplify.store("accounts");
                    var item = _.first(data.accounts, {userId:options.userId})[0];
                    item.username=options.username;
                    item.password=options.password;
                    for(var i=0;i<options.roles.length;i++){
                        item.roles[i].selected = options.roles[i].selected;
                    }
                    amplify.store("accounts", data);

                }
            }

        return{
            init:init,
            events:events,
            subscribe:subscribe,
            get:get,
            put:put
        }
    });