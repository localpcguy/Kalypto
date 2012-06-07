/********************************
*
*
* usage: $(function(){ $(".checkbox").replaceCheckbox(); });
********************************/
;(function($) {

    $.replaceCheckbox = function(element, options) {

        var defaults = {
				toggleClass: "toggle",
				checkedClass: "checked"
			},
			plugin = this,
			$element = $(element),
			buildCheckbox = function() {
				$element.after(function() {
					if ($element.is(":checked")) {
						return "<a href='#' class='" + plugin.settings.toggleClass + " " + plugin.settings.checkedClass + "' ref='" + element.id + "'></a>";
					} else {
						return "<a href='#' class='" + plugin.settings.toggleClass + "' ref='" + element.id + "'></a>";
					}
				}).hide();
			},
			handleChange = function(e) {
				e.preventDefault();
				
				var checkboxID = $(element).attr("ref");
				var $checkbox = $('#' + element.id);

				if (this.tagName != "INPUT") {
					if ($checkbox.is(":checked")) {
						$checkbox.prop("checked", false);
					} else {
						$checkbox.prop("checked", true);
					}
				}
				
				$checkbox.next().toggleClass(plugin.settings.checkedClass);
			},
			initEvents = function() {
				var $checkbox = $('#' + element.id);
				$element.next().bind("click", handleChange);
				$checkbox.bind("change", handleChange);
			};

		
		plugin.settings = {};
        
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
			buildCheckbox();
			initEvents();
        };

        plugin.init();
    };
    $.fn.replaceCheckbox = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('replaceCheckbox')) {
                var plugin = new $.replaceCheckbox(this, options);
                $(this).data('replaceCheckbox', plugin);
            }
        });
    };

})(jQuery);