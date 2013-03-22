!function ($) {
  var _dom =this;
  "use strict"; // jshint ;_;

   /* COMMAND PUBLIC CLASS DEFINITION
  * ================================ */

  var Pager = function (element, options) {

    this.$element = $(element)
    this.options = $.extend({}, $.fn.pager.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }


  }
  //closure on prototype
  Pager.prototype = {
      //needs constructor def
      constructor:Pager
      /*execute:function(options){
          window[options.target][options.action] && window[options.target][options.action].apply(Command,[].slice.call(arguments));
      }*/
  }

   /* COMMAND PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.pager

  $.fn.pager = function (option) {
    return this.each(function () {
      var $this = $(this)
        ,data = $this.data('pager')
        ,options = $.extend({}, $.fn.pager.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('pager', (data = new Pager(this, options)))
      //data.execute(options);
    })
  }

  $.fn.pager.defaults = {
    pageSize:15
  }

  $.fn.pager.Constructor = Pager


 /* COMMAND NO CONFLICT
  * ==================== */

  $.fn.pager.noConflict = function () {
    $.fn.pager = old
    return this
  }

   /* Pager DATA-API
  * ================= */

 $(document).on('ready', '.pager', function (e) {
     var $this = $(this);
     var option = {list:$this.data('list'),pageSize:$this.data('size'),count:('count')};
    $(this).pager(option)
  })

}(window.jQuery)
