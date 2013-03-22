define('viewmodels/permissions',['knockout','models/permissions'],function(ko,permissions){
    var permissionsViewModel = {
        self:this,
        permissionlist:null,
        onGetPermissionsComplete:function(result){
            self.permissionlist = new permissions.PermissionList(result.data);
            ko.applyBindingsToNode(document.getElementById('permissionlist'), { template:{ name:'permissionlist-template', data:self.permissionlist} });
        },
         newPermission:function(){
            var item = new permissions.Permission();
            ko.applyBindingsToNode(document.getElementById('newpermission'), { template:{ name:'newpermission-template', data:item } });
        }
    };
    return {
        permissionsViewModel:permissionsViewModel
    };

});
