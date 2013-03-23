define('viewmodels/main', ['jquery', 'ko', 'knockout.mapping', 'lodash', 'notify', 'client/dataservice', 'client/command', 'client/bindinghandlers', 'viewmodels/accounts', 'viewmodels/rolePermissions', 'viewmodels/permissions', 'views/main'], function ($, ko, mapping, _, notify, ds, command, handlers, accounts, rolePermissions, permissions, view) {

    var
        self = this,
        commands = {
            addAccount:function () {
                accounts.accountsViewModel.newAccount();
            },
            pageAccount:function () {

            },
            editAccount:function (args) {
                accounts.accountsViewModel.editAccount(args);
            },
            editRolePermission:function (args) {
                rolePermissions.rolePermissionsViewModel.editRolePermission(args);
            },
            cancelNewAccount:function () {
                accounts.accountsViewModel.cancelNewAccount();
            },
            saveRole:function(args){
                $(document).one('saveRolePermission',function(event){
                   ds.put.rolePermissions({data:event.args.data});
                });
                rolePermissions.rolePermissionsViewModel.saveRolePermission(args);

            },
            navigate:function (args) {
                switch (args.commandLocation) {
                    case 'roles':
                        navigateRoles();
                    default:
                        break;
                }
            }
        },
        init = function () {
            self.commands = commands;
            var accountPageSize = 5;
            ds.subscribe(ds.events.getPagedListComplete, accounts.accountsViewModel.onGetPagedListComplete);
            ds.subscribe(ds.events.getAccountsComplete, accounts.accountsViewModel.onGetAccountsComplete);
            ds.subscribe(ds.events.getRolesComplete, accounts.accountsViewModel.onGetRolesComplete);
            ds.subscribe(ds.events.getRolesComplete, rolePermissions.rolePermissionsViewModel.onGetRolesComplete);
            $.when(ds.get.pagedList({list:'accounts', size:accountPageSize}))
                .then(ds.get.roles())
                .then(ds.get.accounts({start:0, count:accountPageSize}));
            //wire up paging
            $(document).on('page', function (event) {
                switch (event.args.data.list) {
                    case 'accounts':
                        ds.get.accounts({start:event.args.data.index * accountPageSize, count:accountPageSize});
                        break;
                    default:
                        break;
                }

            });
        },
        navigateRoles = function () {
            ds.subscribe(ds.events.getRolePermissionsComplete, function (data) {
                rolePermissions.rolePermissionsViewModel.onGetRolePermissionsComplete(data);
                rolePermissions.rolePermissionsViewModel.applyTemplate();
            });

            ds.get.rolePermissions();

        }
    /*init = function () {
     self.events={
     onGetAccountsComplete:'onPostAccountComplete'
     };
     self.commands = {
     addAccount:function () {
     accounts.accountsViewModel.newAccount();
     },
     editAccount:function(args){
     accounts.accountsViewModel.editAccount(args);
     },
     cancelNewAccount:function () {
     accounts.accountsViewModel.cancelNewAccount();
     }
     }
     ds.subscribe(ds.events.getPagedListComplete,accounts.accountsViewModel.onGetPagedListComplete);
     ds.subscribe(ds.events.getAccountsComplete, accounts.accountsViewModel.onGetAccountsComplete);
     ds.subscribe(ds.events.postAccountComplete,function(){
     accounts.accountsViewModel.onPostAccountComplete;
     view.main.notifyAccountCreated();
     //$('#notifications').notify("Account Saved");

     });
     ds.subscribe(ds.events.getRolePermissionsComplete, rolePermissions.rolePermissionsViewModel.onGetRolePermissionsComplete);
     ds.subscribe(ds.events.getPermissionsComplete, permissions.permissionsViewModel.onGetPermissionsComplete);
     $.when(ds.get.pagedList({list:'accounts',size:5})).then(ds.get.accounts({start:0,count:5}));
     ds.get.rolePermissions();
     ds.get.permissions();
     $(document).on('page',function(event){
     ds.get.accounts({start:event.args.data.index*5,count:5});
     });
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
     };*/
    return {
        init:init
    }
})