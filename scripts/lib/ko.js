/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/19/13
 * Time: 7:47 AM
 * To change this template use File | Settings | File Templates.
 */
define(['knockout'],function(ko){
    ko.bindingHandlers.collapsed = {
        update: function(element, valueAccessor) {

            if(valueAccessor().length>0)
                $(element).addClass('in');
            else
                $(element).removeClass('in');
        }
    }
})