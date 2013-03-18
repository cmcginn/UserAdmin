define('views/main', ['jquery', 'knockout', 'knockout.mapping', 'lodash', 'client/dataservice', 'client/command', 'views/accounts', 'views/rolePermissions'], function ($, ko, mapping, _, ds, command, accounts, rolePermissions) {

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
                if(event.args.data.id==null)
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