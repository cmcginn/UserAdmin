define('client/dataservice', ['lodash', 'amplify', 'client/api'],
    function (_, amplify, api) {
        var
            self = this,

            context = {
                accounts:[],
                roles:[],
                rolePermissions:[],
                permissions:[]
            },

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
                if(!amplify.store("context"))
                {
                    amplify.store("context", context);
                    api.init();
                }
            },
            events = {
                getUsersComplete:'getUsersComplete',
                getRolesComplete:'getRolesComplete',
                getUserRolesComplete:'getUserRolesComplete',
                getAccountsComplete:'getAccountsComplete',
                getRolePermissionsComplete:'getRolePermissionsComplete',
                postAccountComplete:'postAccountComplete',
                getPermissionsComplete:'getPermissionsComplete',
                getPagedListComplete:'getPagedListComplete',
                postRoleComplete:'postRoleComplete'
            },
            subscribe = function (event, callback) {
                amplify.subscribe(event, callback);
            },
            result = function (data) {
                return {data:data, status:'200', xhr:data};
            },
            get = {
                rolePermissions:function (options) {
                    options = options||{};
                    options.completed = events.getRolePermissionsComplete
                    api.get.rolePermissions(options);
                },
                accounts:function (options) {
                    options.completed = events.getAccountsComplete;
                    api.get.accounts(options);
                },
                permissions:function (options) {
                    api.get.permissions({completed:events.getPermissionsComplete});
                },
                pagedList:function (options) {
                    options.completed = events.getPagedListComplete;
                    api.get.pagedList(options);
                },
                roles:function (options) {
                    options = options || {};
                    options.completed = events.getRolesComplete;
                    api.get.roles(options);
                }
            },
            put = {

                account:function (options) {
                    api.put.account(options);

                },
                rolePermissions:function (options) {
                    api.put.rolePermissions(options);
                },
                permission:function (options) {
                    api.put.permission(options);
                }

            },
            post = {
                account:function (options) {
                    options.completed = function (result) {
                        context.accounts = result.data;
                        events.postAccountComplete(result);
                    };
                    api.post.account(options);
                },
                permission:function (options) {
                    options.completed = events.postPermissionComplete;
                    api.post.permission(options);
                },
                role:function(options){
                    options.completed=events.postRoleComplete;
                    api.post.role(options);
                }
            }
        return{
            init:init,
            context:context,
            events:events,
            subscribe:subscribe,
            get:get,
            put:put,
            post:post
        }
    });