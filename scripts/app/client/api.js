define('client/api', ['lodash', 'amplify', 'jquery.mockjson'], function (_, amplify, mock) {

    _permissions = {permissions:[
        {id:1, name:'Edit Users', system:false,selected:false},
        {id:2, name:'Edit Posts', system:false,selected:false},
        {id:3, name:'Message Users', system:false,selected:false}
    ]};
    var api = {
        init:function(){
            var ctx = amplify.store("context");
            ctx.roles = [
                            {id:1, name:'Administrators', system:true},
                            {id:2, name:'System', system:true},
                            {id:3, name:'Editors', system:false},
                            {id:4, name:'Registered', system:false}
                        ];
            var accountList=$.mockJSON.generateFromTemplate({
                        'accounts|8-20':[
                            {
                                'userId|+1':1,
                                'username':'@LAST_NAME',
                                'password':'@LOREM'

                            }
                        ]
                    });
            for(var i=0;i<accountList.accounts.length;i++)
                ctx.accounts.push(accountList.accounts[i]);
            for(var i=0;i<ctx.accounts.length;i++)
                ctx.accounts[i].roles=[ctx.roles[3]];

            amplify.store("context",ctx);
        },
        result:function (data) {
            return {data:data, status:'200', xhr:data};
        },
        get:{
            accounts:function (options) {
                var result=amplify.store("context").accounts;
                if(options.start)
                    result = result.slice(options.start);
                if(options.count)
                    result = result.slice(0,options.count);
                amplify.publish(options.completed, api.result({accounts:result}));

            },
            roles:function(options){
                var result=amplify.store("context").roles;
                amplify.publish(options.completed, api.result({roles:result}));
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
                        data.rolePermissions[i].permissions = _permissions.permissions;

                    }
                    amplify.store("rolePermissions", data);
                }
                amplify.publish(options.completed, api.result(amplify.store("rolePermissions")));
            },
            permissions:function (options) {
                if (amplify.store('permissions') == undefined) {
                    var data = _permissions;
                    amplify.store("permissions", data);
                }
                amplify.publish(options.completed, api.result(amplify.store("permissions")));
            },
            pagedList:function(options){
                var data = {name:'',count:0,size:options.size};
                switch(options.list)
                {
                    case 'accounts':
                        if(amplify.store("accounts") != undefined)
                            data.name = 'accounts';
                            data.count = amplify.store("context").accounts.length;
                        break;
                    default:
                        break;
                }
                amplify.publish(options.completed, api.result(data));
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
            },
            permission:function (options) {

                var item = _.first(_permissions.permissions, {id:options.id})[0];
                item.name = options.name;
                item.system=options.system;
                amplify.store("permissions", _permissions);
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
                if (options.completed)
                    amplify.publish(options.completed, api.result(item));
            },
            permission:function (options) {
                var item = {
                    id:options.id,
                    name:options.name,
                    selected:options.selected
                };
                _permissions.permissions.push(item);
                amplify.store("permissions", _permissions);
                if (options.completed)
                    amplify.publish(options.completed, api.result(item));
            }
        }

    }
    return{
        init:api.init,
        get:api.get,
        put:api.put,
        post:api.post
    }
});