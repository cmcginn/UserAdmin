define('views/main', ['jquery', 'ko','knockout.mapping', 'lodash', 'client/dataservice', 'client/command','client/bindinghandlers', 'views/accounts', 'views/rolePermissions'], function ($, ko,mapping, _, ds, command,handlers, accounts, rolePermissions) {

    var
        self = this,

        init = function () {
            self.commands = {
                addAccount:function () {
                    accounts.accountsViewModel.newAccount();
                },
                cancelNewAccount:function(){
                    accounts.accountsViewModel.cancelNewAccount();
                }
            }
            ds.subscribe(ds.events.getAccountsComplete, accounts.accountsViewModel.onGetAccountsComplete);
            ds.subscribe(ds.events.postAccountComplete, accounts.accountsViewModel.onPostAccountComplete);
            ds.subscribe(ds.events.getRolePermissionsComplete, rolePermissions.rolePermissionsViewModel.onGetRolePermissionsComplete);
            ds.get.accounts();
            ds.get.rolePermissions();
            $(document).on('saveAccount', function (event) {
                if(!event.args.data.userId())
                    ds.post.account(mapping.toJS(event.args.data));
                else
                    ds.put.account(mapping.toJS(event.args.data));
            });
            $(document).on('saveRolePermission', function (event) {
                ds.put.rolePermission(mapping.toJS(event.args.data));
            });
        };
    return {
        init:init
    }
})