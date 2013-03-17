define('models/accounts', ['knockout'], function (ko) {
    var Account = function (options) {
        this.userId = ko.observable(options.userId);
        this.username = ko.observable(options.username);
        this.password = ko.observable(options.password);
        this.passwordConfirmation = ko.observable(options.password);

        this.roles = ko.observableArray();
        this.errors = ko.observable([]);
        this.validate = function () {
            var errs = []
            if (this.password() != this.passwordConfirmation())
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
        for (var i = 0; i < options.roles.length; i++) {
            var item = options.roles[i];
            var args = {
                id:ko.observable(item.id),
                name:ko.observable(item.name),
                selected:ko.observable(item.selected)
            };
            this.addRole(args);
        }

    }
    var AccountList = function (options) {
        this.accounts = ko.observableArray();
        this.addAccount = function (options) {
            this.accounts.push(new Account(options));
        }
        for (var i = 0; i < options.accounts.length; i++)
            this.addAccount(options.accounts[i]);
    }
    return{
        AccountList:AccountList
    }
})
