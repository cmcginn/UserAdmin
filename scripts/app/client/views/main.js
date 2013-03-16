/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/16/13
 * Time: 8:21 AM
 * To change this template use File | Settings | File Templates.
 */
define('views/main', ['jquery','knockout','knockout.mapping', 'lodash', 'client/dataservice', 'client/command', 'views/users'], function ($,ko,mapping, _, ds, command, users) {

    var
        self = this,
        init = function () {
            ds.subscribe(ds.events.getUsersComplete, users.usersViewModel.onGetUsersComplete);
            ds.get.users();
            $(document).on('saveUserClick', function (event) {
                ds.post.user(mapping.toJS(event.args.data));
            });
        };
    return {
        init:init
    }
})