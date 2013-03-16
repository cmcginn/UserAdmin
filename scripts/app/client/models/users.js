define('models/users', ['knockout'], function (ko) {
    User = function (options) {
        self:this;
        this.id=ko.observable(options.id);
        this.username = ko.observable(options.username);
        this.password = ko.observable(options.password);
        this.passwordConfirmation = ko.observable(options.password);
        this.errors=ko.observable([]);
        this.validate=function(){
            var errs=[]
            if(this.password() != this.passwordConfirmation())
                errs.push({error:'Passwords do not match'});
            this.errors(errs);
        }
        this.saveUser=function(){
            this.validate();
            if(this.errors().length==0)
                $(document).trigger({type:'saveUserClick',args:{data:this}});

        }
    };
    var Userlist = function (options) {
        this.users = ko.observableArray();
        this.addUser = function (user) {
            this.users.push(user);
        }
        for (var i = 0; i < options.users.length; i++) {
            var user = new User(options.users[i]);
            this.addUser(user);
        }

    }

    return{
        Userlist:Userlist
    }
})
