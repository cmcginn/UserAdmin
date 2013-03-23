/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/17/13
 * Time: 8:06 AM
 * To change this template use File | Settings | File Templates.
 */
define('viewmodels/accounts',['knockout','lodash','models/accounts','models/pagedList'],function(ko,_,accounts,pagedList){
    var accountsViewModel = {
        self:this,
        accountlist:null,
        rolelist:null,
        pagedlist:null,
        onGetPagedListComplete:function(result){
            self.pagedlist = new pagedList.PagedList(result.data);
        },
        onGetRolesComplete:function(result){
            self.rolelist=result.data;

        },
        onGetAccountsComplete:function (result) {
            result.data.availableRoles = rolelist.roles;
            self.accountlist = new accounts.AccountList(result.data);
            ko.applyBindingsToNode(document.getElementById('accountlist'), { template:{ name:'accountlist-template', data:self.accountlist} });
            ko.applyBindingsToNode(document.getElementById('accountlist-pager'), { template:{ name:'pager-template', data:self.pagedlist} });
        },
        onPostAccountComplete:function(result){
          self.accountlist.addAccount(result.data);
        },
        editAccount:function(args){
            var item = self.accountlist.accounts.filterByProperty('userId',args.id)()[0];
            ko.applyBindingsToNode(document.getElementById(args.placeholder), { template:{ name:'accountedit-template',data:item}});

        },
        newAccount:function(){
            var item = new accounts.Account();
            ko.applyBindingsToNode(document.getElementById('newaccount'), { template:{ name:'newaccount-template', data:item } });
        },
        cancelNewAccount:function(){
            console.log('canceled');
        }
    }
    return{
        accountsViewModel:accountsViewModel
    }
})