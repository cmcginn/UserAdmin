define('viewmodels/roles', ['jquery','knockout', 'lodash','models/roles', 'client/command'], function ($,ko, _,rolesmodel, command) {
    var rolesViewModel = {
        self:this,
        rolelist:null,
        onGetRolesComplete:function (result) {
            self.rolelist = new rolesmodel.Rolelist(result.data);
            //
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