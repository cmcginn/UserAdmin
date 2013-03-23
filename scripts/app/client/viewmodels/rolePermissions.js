define('viewmodels/rolePermissions', ['knockout','knockout.mapping', 'models/rolePermissions'], function (ko, mapping, rolePermissions) {

    var rolePermissionsViewModel = {
        self:this,
        onGetRolesComplete:function(result){
          rolePermissionsViewModel.rolelist = result.data;
        },
        onGetRolePermissionsComplete:function (result) {
            result.data.availablePermissions = rolePermissionsViewModel.rolelist.roles;
            rolePermissionsViewModel.rolePermissionsList = new rolePermissions.RolePermissionList(result.data);

        },
        editRolePermission:function (options) {
             var item = rolePermissionsViewModel.rolePermissionsList.rolePermissions.filterByProperty('id',options.id)()[0];

             ko.applyBindingsToNode(document.getElementById(options.placeholder), { template:{ name:'roleedit-template', data:item} });
        },

        applyTemplate:function () {
            ko.applyBindingsToNode(document.getElementById('rolepermissionlist'), { template:{ name:'rolepermissionlist-template', data:rolePermissionsViewModel.rolePermissionsList} });
        },
        saveRolePermission:function(options){
            var item = rolePermissionsViewModel.rolePermissionsList.rolePermissions.filterByProperty('id',options.commandId)()[0];
            var event = {type:'saveRolePermission',args:{data:mapping.toJS(item)}}
            $(document).trigger(event);
        }


    }
    return{
        rolePermissionsViewModel:rolePermissionsViewModel
    }
})
