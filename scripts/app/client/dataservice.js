define('client/dataservice', ['lodash', 'amplify','client/api'],
    function (_, amplify,api) {
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
                getAccountsComplete:'getAccountsComplete',
                getRolePermissionsComplete:'getRolePermissionsComplete',
                postAccountComplete:'postAccountComplete'
            },
            subscribe = function (event, callback) {
                amplify.subscribe(event, callback);
            },
            result = function (data) {
                return {data:data, status:'200', xhr:data};
            },
            get = {
                rolePermissions:function (options) {
                    api.get.rolePermissions({completed:events.getRolePermissionsComplete});
                },
                accounts:function (options) {
                    api.get.accounts({completed:events.getAccountsComplete});
                }
            },
            put = {

                account:function (options) {
                    api.put.account(options);

                },
                rolePermission:function (options) {
                    api.put.rolePermission(options);
                }
            },
            post = {
                account:function (options) {
                    options.completed=events.postAccountComplete;
                    api.post.account(options);
                }
            }
        return{
            init:init,
            events:events,
            subscribe:subscribe,
            get:get,
            put:put,
            post:post
        }
    });