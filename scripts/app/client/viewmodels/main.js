define('views/main', ['jquery', 'ko', 'knockout.mapping', 'lodash','notify','client/dataservice', 'client/command', 'client/bindinghandlers','views/accounts', 'views/rolePermissions', 'views/permissions'], function ($, ko, mapping, _, notify, ds, command, handlers, accounts, rolePermissions, permissions) {

    var
        self = this,
        init = function () {
            self.events={
                onGetAccountsComplete:'onPostAccountComplete'
            };
            self.commands = {
                addAccount:function () {
                    accounts.accountsViewModel.newAccount();
                },
                cancelNewAccount:function () {
                    accounts.accountsViewModel.cancelNewAccount();
                }
            }

            ds.subscribe(ds.events.getAccountsComplete, accounts.accountsViewModel.onGetAccountsComplete);
            ds.subscribe(ds.events.postAccountComplete,function(){
                accounts.accountsViewModel.onPostAccountComplete;
                $(document).trigger({type:self.events.onGetAccountsComplete});
                //$('#notifications').notify("Account Saved");

            });
            ds.subscribe(ds.events.getRolePermissionsComplete, rolePermissions.rolePermissionsViewModel.onGetRolePermissionsComplete);
            ds.subscribe(ds.events.getPermissionsComplete, permissions.permissionsViewModel.onGetPermissionsComplete);
            ds.get.accounts();
            ds.get.rolePermissions();
            ds.get.permissions();
            $(document).on('savePermission', function (event) {
                if (!event.args.data.id())
                    ds.post.permission(mapping.toJS(event.args.data));
                else
                    ds.put.permission(mapping.toJS(event.args.data));
            });
            $(document).on('saveAccount', function (event) {
                if (!event.args.data.userId())
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