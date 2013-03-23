define('models/roles', ['knockout'], function (ko) {
    var Role = function (options) {
        this.id = ko.observable(options.id);
        this.name = ko.observable(options.name);
        this.system = ko.observable(options.system);
        this.errors=ko.observableArray();
        this.validate=function(){
            var err=[];
            if(!this.name())
                err.push({error:'Role Name is Required'});
            this.errors(err);
        }
        this.saveNewRole=function(){
            this.validate();
            if(this.errors().length==0)
                $(document).trigger({type:'saveNewRole',args:{data:this}});
        }
    }
    var Rolelist = function (options) {
        this.roles = ko.observableArray();
        this.addRole = function (options) {
            this.roles.push(options);
        }
        for (var i = 0; i < options.roles.length; i++) {
            var role = new Role(options.roles[i]);
            this.addRole(role);
        }
    }

    return{
        Rolelist:Rolelist,
        Role:Role
    }
})
