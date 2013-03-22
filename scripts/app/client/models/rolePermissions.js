define('models/rolePermissions', ['knockout'], function (ko) {
    var RolePermission = function (options) {
        this.id = ko.observable(options.id);
        this.name = ko.observable(options.name);
        this.permissions = ko.observableArray();
        this.errors = ko.observableArray();
        this.addPermission = function (options) {
            this.permissions.push(options);
        }
        for (var i = 0; i < options.permissions.length; i++) {
            var args = {
                id:options.permissions[i].id,
                name:options.permissions[i].name,
                selected:options.permissions[i].selected
            };
            this.addPermission(args);
        }
        this.validate=function(){

        }
        this.saveRolePermission = function () {
            this.validate();
            if (this.errors().length == 0)
                $(document).trigger({type:'saveRolePermission', args:{data:this}});

        }
    };

    var RolePermissionList = function (options) {
        this.rolePermissions = ko.observableArray();
        this.addRolePermission = function (options) {
            this.rolePermissions.push(options);
        }
        for (var i = 0; i < options.rolePermissions.length; i++)
            this.addRolePermission(new RolePermission(options.rolePermissions[i]));
    };

    return{
        RolePermissionList:RolePermissionList
    };

});
