!function ($) {

  "use strict"; // jshint ;_;

   /* COMMAND PUBLIC CLASS DEFINITION
  * ================================ */

  var Command = function (element, options) {

    this.$element = $(element)
    this.options = $.extend({}, $.fn.command.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }


  }
  //closure on prototype
  Command.prototype = {
      //needs constructor def
      constructor:Command,
      execute:function(options){
          window[options.target]['commands'][options.action] && window[options.target]['commands'][options.action].apply(Command,[].slice.call(arguments));
      }
  }

   /* COMMAND PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.command

  $.fn.command = function (option) {
    return this.each(function () {
      var $this = $(this)
        ,data = $this.data('command')
        ,options = $.extend({}, $.fn.command.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('command', (data = new Command(this, options)))
      data.execute(options);
    })
  }

  $.fn.command.defaults = {
    target: 'viewmodel'
  }

  $.fn.command.Constructor = Command


 /* COMMAND NO CONFLICT
  * ==================== */

  $.fn.command.noConflict = function () {
    $.fn.command = old
    return this
  }

   /* COMMAND DATA-API
  * ================= */

 $(document).on('click', '.command', function (e) {
     var $this = $(this);
     var option = {action:$this.data('action'),target:$this.data('target')};
    $(this).command(option)
  })

}(window.jQuery)
