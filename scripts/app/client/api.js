define('client/api', ['lodash', 'amplify', 'jquery.mockjson'], function (_, amplify, mock) {

    _permissions = {permissions:[
        {id:1, name:'Edit Users', system:false, selected:false},
        {id:2, name:'Edit Posts', system:false, selected:false},
        {id:3, name:'Message Users', system:false, selected:false}
    ]};
    var api = {
        init:function () {

            var ctx = amplify.store("context");
            ctx.roles = [
                {id:1, name:'Administrators', system:true},
                {id:2, name:'System', system:true},
                {id:3, name:'Editors', system:false},
                {id:4, name:'Registered', system:false}
            ];
            var accountList = $.mockJSON.generateFromTemplate({
                'accounts|8-20':[
                    {
                        'userId|+1':1,
                        'username':'@LAST_NAME',
                        'password':'@LOREM'

                    }
                ]
            });
            ctx.permissions = [
                {id:1, name:'All', system:true},
                {id:2, name:'Edit Posts', system:true},
                {id:3, name:'Create Posts', system:true},
                {id:4, name:'Third Party Authentication', system:true}
            ];

            ctx.rolePermissions = [
                {role:ctx.roles[0],
                    permissions:ctx.permissions},
                {role:ctx.roles[1],
                    permissions:[
                        ctx.permissions[1],
                        ctx.permissions[2]
                    ]},
                {role:ctx.roles[2], permissions:[]},
                {role:ctx.roles[3], permissions:[]}
            ];

            for (var i = 0; i < accountList.accounts.length; i++)
                ctx.accounts.push(accountList.accounts[i]);
            for (var i = 0; i < ctx.accounts.length; i++)
                ctx.accounts[i].roles = [ctx.roles[3]];

            amplify.store("context", ctx);
        },
        result:function (data) {
            return {data:data, status:'200', xhr:data};
        },
        get:{
            accounts:function (options) {
                var result = amplify.store("context").accounts;
                if (options.start)
                    result = result.slice(options.start);
                if (options.count)
                    result = result.slice(0, options.count);
                amplify.publish(options.completed, api.result({accounts:result}));

            },
            roles:function (options) {
                options = options || {};
                var result = amplify.store("context").roles;
                amplify.publish(options.completed, api.result({roles:result}));
            },
            rolePermissions:function (options) {
                options = options || {};
                var result = amplify.store("context").rolePermissions;
                amplify.publish(options.completed, api.result({rolePermissions:result}));
            },
            permissions:function (options) {
                options=options||{};
                var result = amplify.store("context").permissions;
                amplify.publish(options.completed, api.result(result));
            },
            pagedList:function (options) {
                var data = {name:'', count:0, size:options.size};
                switch (options.list) {
                    case 'accounts':
                        if (amplify.store("accounts") != undefined)
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
            rolePermissions:function (options) {
                var ctx = amplify.store("context");
                var selectedItem = _.where(ctx.rolePermissions,{'role':{'id':options.data.id}})[0];
                selectedItem.permissions=_.where(options.data.availablePermissions,{'selected':true});
                amplify.store("context",ctx);

            },
            permission:function (options) {

                var item = _.first(_permissions.permissions, {id:options.id})[0];
                item.name = options.name;
                item.system = options.system;
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
            },
            role:function(options){
                var ctx = amplify.store("context");
                var args  = {
                    id:ctx.roles.length+1,
                    name:options.data.name,
                    system:options.data.system
                };
                ctx.roles.push(args);
                ctx.rolePermissions.push({role:args,permissions:[]});
                amplify.store("context",ctx);
                amplify.publish(options.completed,api.result(args));
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