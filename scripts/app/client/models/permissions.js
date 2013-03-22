define('models/permissions', ['knockout'], function (ko) {
    var Permission=function(options){
        var self=this;
        options=options||{
            id:null,
            name:'null',
            system:''
        };
        this.id=ko.observable(options.id);
        this.name=ko.observable(options.name);
        this.system=false;
        this.errors=ko.observableArray();
        this.validate=function(){
            var errs=[];
            if(!self.name())
                errs.push({error:'Permission name is required'});
            self.errors(errs)
        }
        this.savePermission=function(){
            self.validate();
            if(self.errors().length==0)
                $(document).trigger({type:'savePermission',args:{data:this}});
        }
    };

    var PermissionList=function(options){
        var self=this;
        this.permissions=ko.observableArray();
        this.addPermission=function(options){
            this.permissions.push(new Permission(options));
        }
        for(var i=0;i<options.permissions.length;i++)
            this.addPermission(options.permissions[i]);
    };

    return{
        PermissionList:PermissionList,
        Permission:Permission
    };
});
