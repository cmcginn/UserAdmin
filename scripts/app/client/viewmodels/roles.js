define('viewmodels/roles', ['jquery','knockout', 'lodash','models/roles', 'client/command'], function ($,ko, _,rolesmodel, command) {
    var rolesViewModel = {
        self:this,
        rolelist:null,
        onGetRolesComplete:function (result) {
            self.rolelist = new rolesmodel.Rolelist(result.data);
            //
        },
        applyTemplate:function(options){
            ko.applyBindingsToNode($(options.selector)[0], { template:{ name:'rolelist-template', data:self.rolelist} });
        }
    }
    return{
        rolesViewModel:rolesViewModel

    }
})