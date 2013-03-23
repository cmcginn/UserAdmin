define('viewmodels/main', ['jquery', 'ko', 'knockout.mapping', 'lodash', 'notify', 'client/dataservice', 'client/command', 'client/bindinghandlers', 'viewmodels/accounts', 'viewmodels/rolePermissions', 'viewmodels/roles', 'viewmodels/permissions', 'views/main'], function ($, ko, mapping, _, notify, ds, command, handlers, accounts, rolePermissions, roles, permissions, view) {

    var
        self = this,
        commands = {
            addAccount:function () {
                accounts.accountsViewModel.newAccount();
            },
            addRole:function (args) {
                roles.rolesViewModel.addRole(args);
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
            saveRolePermission:function (args) {
                $(document).one('saveRolePermission', function (event) {
                    ds.put.rolePermissions({data:event.args.data});
                });
                rolePermissions.rolePermissionsViewModel.saveRolePermission(args);

            },
            saveRole:function (args) {
                roles.rolesViewModel.saveNewRole(args);
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
            ds.subscribe(ds.events.getPermissionsComplete, rolePermissions.rolePermissionsViewModel.onGetPermissionsComplete);
            ds.subscribe(ds.events.getRolePermissionsComplete, rolePermissions.rolePermissionsViewModel.onGetRolePermissionsComplete);
            ds.subscribe(ds.events.postRoleComplete,function(){
                ds.get.accounts();
                ds.get.rolePermissions();
                rolePermissions.rolePermissionsViewModel.applyTemplate();
            });
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
            $(document).on('saveNewRole', function (event) {
                ds.post.role({data:mapping.toJS(event.args.data)});
            });
        },
        navigateRoles = function () {


            $.when(ds.get.permissions()).then(function () {
                ds.get.rolePermissions();
            }).then(function () {
                    rolePermissions.rolePermissionsViewModel.applyTemplate();
                });


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