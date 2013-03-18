define('client/api', ['lodash', 'amplify', 'jquery.mockjson'], function (_, amplify, mock) {
    var api = {
        result:function (data) {
            return {data:data, status:'200', xhr:data};
        },
        get:{
            accounts:function (options) {
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
                    for (var i = 0; i < data.accounts.length; i++) {
                        data.accounts[i].roles = [
                            {id:1, name:'Administrators', system:true, selected:false},
                            {id:2, name:'System', system:true, selected:false},
                            {id:3, name:'Editors', system:false, selected:false},
                            {id:4, name:'Registered', system:false, selected:false}
                        ];
                    }
                    amplify.store("accounts", data);
                }
                amplify.publish(options.completed, api.result(amplify.store("accounts")));

            },
            rolePermissions:function (options) {
                if (amplify.store("rolePermissions") == undefined) {
                    var data = {rolePermissions:[
                        {id:1, name:'Administrators', system:true},
                        {id:2, name:'System', system:true},
                        {id:3, name:'Editors', system:false},
                        {id:4, name:'Registered', system:false}

                    ]};
                    for (var i = 0; i < data.rolePermissions.length; i++) {
                        data.rolePermissions[i].permissions = [
                            {id:1, name:'Edit Users', selected:false},
                            {id:2, name:'Edit Posts', selected:false},
                            {id:3, name:'Message Users', selected:false}
                        ];
                    }
                    amplify.store("rolePermissions", data);
                }
                amplify.publish(options.completed, api.result(amplify.store("rolePermissions")));
            }
        },
        put:{
            account:function (options) {
                var data = amplify.store("accounts");
                var item = _.first(data.accounts, {userId:options.userId})[0];
                item.username = options.username;
                item.password = options.password;
                for (var i = 0; i < options.roles.length; i++) {
                    item.roles[i].selected = options.roles[i].selected;
                }
                amplify.store("accounts", data);
            },
            rolePermission:function (options) {
                var data = amplify.store("rolePermissions");
                var item = _.first(data.rolePermissions, {id:options.id})[0];
                for (var i = 0; i < options.permissions.length; i++) {
                    item.permissions[i].selected = options.permissions[i].selected;
                }
                amplify.store("rolePermissions", data);
            }
        },
        post:{
            account:function (options) {
                var data = amplify.store("accounts");

                var item = {
                    userId:data.accounts.length + 1,
                    username:options.username,
                    password:options.password,
                    roles:[
                        {id:1, name:'Administrators', system:true, selected:false},
                        {id:2, name:'System', system:true, selected:false},
                        {id:3, name:'Editors', system:false, selected:false},
                        {id:4, name:'Registered', system:false, selected:false}
                    ]
                };
                data.accounts.push(item);
                amplify.store("accounts", data);
                if(options.completed)
                    amplify.publish( options.completed,api.result(item));
            }
        }

    }
    return{
        get:api.get,
        put:api.put,
        post:api.post
    }
});