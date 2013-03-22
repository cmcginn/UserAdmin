define('models/pagedList',['knockout','lodash','knockout.mapping'], function (ko,_,mapping) {
    var Page=function(options){
        var self=this;
        this.index=ko.observable(options.index);
        this.list=ko.observable(options.list);
        this.label=ko.observable(options.label);
        var previous = options.index>0;
            this.hasPrevious=ko.observable(previous);
        this.hasNext = ko.observable(options.hasNext);
        this.events={
            page:'page'
        };
        this.select=function(){
            if(this.hasNext())
                $(document).trigger({type:this.events.page,args:{data:mapping.toJS(this)}});
        }

    }
    var PagedList = function (options) {
        var self = this;
        this.name=ko.observable(options.name);
        this.count=ko.observable(options.count);
        this.size=ko.observable(options.size);
        this.pages=ko.observableArray();
        this.addPage=function(options){
            this.pages.push(new Page(options))
        }
        var pageCount=0;
        if(options.count%options.size!=0)
            pageCount=Math.floor(options.count/options.size)+1;
        else
            pageCount=options.count/options.size;
        for(var i=0;i<pageCount;i++)
            this.addPage({index:i,label:i+1,list:options.name,hasNext:i<pageCount});

    };
    return{PagedList:PagedList}
});
