define('views/main', ['jquery','knockout','knockout.mapping', 'lodash', 'client/dataservice', 'client/command', 'views/accounts'], function ($,ko,mapping, _, ds, command, accounts) {

    var
        self = this,
        init = function () {
            ds.subscribe(ds.events.getAccountsComplete, accounts.accountsViewModel.onGetAccountsComplete);
            ds.get.accounts();
            $(document).on('saveAccount', function (event) {
                ds.put.account(mapping.toJS(event.args.data));
            });
        };
    return {
        init:init
    }
})