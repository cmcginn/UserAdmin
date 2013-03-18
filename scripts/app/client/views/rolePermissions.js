define('views/rolePermissions',['knockout','models/rolePermissions'],function(ko,rolePermissions){

    var rolePermissionsViewModel={
        self:this,
        rolePermissionsList:null,
        onGetRolePermissionsComplete:function(result){
            self.rolePermissionsList = new rolePermissions.RolePermissionList(result.data);
            ko.applyBindingsToNode(document.getElementById('rolepermissionlist'), { template:{ name:'rolepermissionlist-template', data:self.rolePermissionsList} });
        }

    }
    return{
        rolePermissionsViewModel:rolePermissionsViewModel
    }
})
