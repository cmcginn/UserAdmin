define('models/accounts', ['knockout'], function (ko) {
    var Account = function (options) {
        options=options||{
            userId:null,
            username:null,
            password:null,
            passwordConfirmation:null,
            availableRoles:[]
        };
        this.userId = ko.observable(options.userId);
        this.username = ko.observable(options.username);
        this.password = ko.observable(options.password);
        this.passwordConfirmation = ko.observable(options.password);

        if(!options.roles)
            options.roles=[];
        this.roles = ko.observableArray();
        if(!options.availableRoles)
            options.availableRoles = ko.observableArray();

        this.errors = ko.observable([]);
        this.availableRoles = ko.observableArray();

        this.validate = function () {
            var errs = []
            if(!this.username())
                errs.push({error:'Username is required'});
            if(!this.password())
                errs.push({error:'Password is required'});
            else if (this.password() != this.passwordConfirmation())
                errs.push({error:'Passwords do not match'});
            this.errors(errs);
        }
        this.saveAccount = function () {

            this.validate();
            if (this.errors().length == 0)
                $(document).trigger({type:'saveAccount', args:{data:this}});

        }
        this.addRole = function (options) {
            this.roles.push(options);
        }
        this.addAvailableRole=function(options){
            this.availableRoles.push(options);
        }
        for (var i = 0; i < options.roles.length; i++) {
            var item = options.roles[i];
            var args = {
                id:ko.observable(item.id),
                name:ko.observable(item.name)

            };
            this.addRole(args);
        }
        for(var i=0;i<options.availableRoles.length;i++){
            var item = options.availableRoles[i];
            var args = {
                id:ko.observable(item.id),
                name:ko.observable(item.name),
                selected:ko.observable(this.roles.filterByProperty('id',item.id)().length>0)
            };
            this.addAvailableRole(args);
        }

    }
    var AccountList = function (options) {
        this.accounts = ko.observableArray();
        this.addAccount = function (options) {
            this.accounts.push(new Account(options));
        }

        for (var i = 0; i < options.accounts.length; i++){
            var item = options.accounts[i];
            item.availableRoles = options.availableRoles;
            this.addAccount(item);
        }
    }
    return{
        AccountList:AccountList,
        Account:Account
    }
})
