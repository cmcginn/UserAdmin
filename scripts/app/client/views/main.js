define('views/main', ['jquery', 'notify'], function ($, notify) {
    var main = {
        notifyAccountCreated:function () {
            $('#notifications').notify("Account Saved");
        }
    };
    return{ main:main }
});