define('viewmodels/roles', ['jquery','knockout','knockout.mapping', 'lodash','models/roles', 'client/command'], function ($,ko,mapping, _,rolesmodel, command) {
    var rolesViewModel = {
        self:this,

        rolelist:null,
        onGetRolesComplete:function (result) {
            self.rolelist = new rolesmodel.Rolelist(result.data);
            //
        },
        addRole:function(options){
            var args = {id:null,name:null,system:null};
            rolesViewModel.newRole= new rolesmodel.Role(args);
            ko.applyBindingsToNode(document.getElementById(options.placeholder), { template:{ name:'newrole-template', data: rolesViewModel.newRole} });
        },
        saveNewRole:function(options){
             rolesViewModel.newRole.saveNewRole();
        },
        editRole:function(options){
            var item = self.rolelist.roles.filterByProperty('id',options.id)()[0];
            ko.applyBindingsToNode(document.getElementById(options.placeholder), { template:{ name:'roleedit-template', data:item} });
        },
        applyTemplate:function(options){
            ko.applyBindingsToNode(document.getElementById('rolepermissionlist'), { template:{ name:'rolepermissionlist-template', data:self.rolelist} });
        }
    }
    return{
        rolesViewModel:rolesViewModel

    }
})