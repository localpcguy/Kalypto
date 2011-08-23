/********************************
*
*
* usage: $(function(){ $(".checkbox").replaceCheckbox(); });
********************************/
;(function($) {

    $.replaceCheckbox = function(element, options) {

        var defaults = {},
			 plugin = this,
			 $element = $(element),
             element = element;
		
		plugin.settings = {}
        
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
			buildCheckbox();
			initEvents();
        }
		
        var buildCheckbox = function() {
            $element.after(function() {
				if ($element.is(":checked")) {
					return "<a href='#' class='toggle checked' ref='" + element.id + "'></a>";
				} else {
					return "<a href='#' class='toggle' ref='" + element.id + "'></a>";
				}
			});			
		},
		initEvents = function() {
			$(".toggle").click(function(e) {
				e.preventDefault();
				
				var checkboxID = $(this).attr("ref");
				var $checkbox = $('#' + checkboxID);

				if ($checkbox.is(":checked")) {
					$checkbox.removeAttr("checked");
				} else {
					$checkbox.attr("checked", "true");
				}
				
				$(this).toggleClass("checked");
			});
		}
        plugin.init();

    }

    $.fn.replaceCheckbox = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('replaceCheckbox')) {
                var plugin = new $.replaceCheckbox(this, options);
                $(this).data('replaceCheckbox', plugin);
            }
        });
    }

})(jQuery);