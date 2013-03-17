define('model/userRole',['knockout'],function(ko){
    var UserRole=function(options){
        this.id=ko.observable(options.id);
        this.userId=ko.observable(options.userId);
        this.roleId=ko.observable(options.roleId);
    }
    var UserRoleList=function(options){
        this.userRoles=ko.observableArray();
        this.addUserRole=function(options){
            userRoles.push(options);
        }
        for(var i=0;i<options.userRoles.length;i++)
            this.addUserRole(options.userRoles[i]);

    }
})