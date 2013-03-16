/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/16/13
 * Time: 8:21 AM
 * To change this template use File | Settings | File Templates.
 */
define('views/main',['jquery','lodash','client/dataservice'],function($,_,ds){
    var
        users,
        onGetUsersComplete=function(result){
            console.log(result.data);
        }
        init=function(){
            ds.subscribe(ds.events.getUsersComplete,onGetUsersComplete);
            ds.get.users();
        };
    return {
        init:init
    }
})