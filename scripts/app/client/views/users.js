define('views/users', ['jquery','knockout', 'lodash','models/users', 'client/command'], function ($,ko, _,usermodel, command) {
    var usersViewModel = {
        self:this,
        userlist:null,
        onGetUsersComplete:function (result) {
            self.userlist = new usermodel.Userlist(result.data);
            ko.applyBindingsToNode(document.getElementById('userlist'), { template:{ name:'userlist-template', data:self.userlist} });

        }
    }
    return{
        usersViewModel:usersViewModel

    }
})