define('models/rolePermissions', ['knockout'], function (ko) {
    var RolePermission = function (options) {
        this.id = ko.observable(options.role.id);
        this.name = ko.observable(options.role.name);
        this.permissions = ko.observableArray();
        this.errors = ko.observableArray();
        this.system = ko.observable(options.role.system);
        this.availablePermissions = ko.observableArray();

        this.addPermission = function (options) {
            this.permissions.push(options);
        };
        this.addAvailablePermission=function(options){
            this.availablePermissions.push(options);
        };
        if(!options.permissions)
            options.permissions = [];
        if(!options.availablePermissions)
            options.availablePermissions = [];
        for (var i = 0; i < options.permissions.length; i++) {
            var args = {
                id:options.permissions[i].id,
                name:options.permissions[i].name,
                system:options.permissions[i].system
            };
            this.addPermission(args);
        }

        for(var i=0;i<options.availablePermissions.length;i++){
          var args = {
              id:options.availablePermissions[i].id,
              name:options.availablePermissions[i].name,
              selected:this.permissions.filterByProperty('id',options.availablePermissions[i].id)().length>0
          };
            this.addAvailablePermission(args);
        };
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
        {
            options.rolePermissions[i].availablePermissions = options.availablePermissions;
            this.addRolePermission(new RolePermission(options.rolePermissions[i]));
        }
    };

    return{
        RolePermissionList:RolePermissionList
    };

});
