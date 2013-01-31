/********************************
* Replace RCInputs
* Created & copyright (c)  by Mike Behnke
*
* http://www.local-pc-guy.com
* Twitter: @LocalPCGuy
*
* Released under MIT License
*
* usage:
*        $("input[name=rDemo]").replaceRCInputs({hideInputs: false});
*        $("#checkboxDemo").replaceRCInputs({hideInputs: false});
********************************/
;(function($) {

    $.replaceRCInputs = function(element, options) {

        var defaults = {
				toggleClass: "toggle",
				checkedClass: "checked",
				hideInputs: true
			},
			plugin = this,
			$element = $(element),
			$customEl,
			buildCustomElement = function() {
				$element.after(function() {
					if ($element.is(":checked")) {
						return "<a href='#' class='" + plugin.settings.toggleClass + " " + plugin.settings.checkedClass + "'></a>";
					} else {
						return "<a href='#' class='" + plugin.settings.toggleClass + "'></a>";
					}
				});
				if (plugin.settings.hideInputs) {
					$element.hide();
				}
				$customEl = $element.next();
				$customEl.trigger('rc_elbuilt');
			},
			handleChange = function(e) {
				var $elementCollection = $element.attr("type") === "radio" ? $('input[name='+ $element.attr("name") +']') : $element,
					clickedLink = this;
				e.preventDefault();
				
				if (this.tagName !== "INPUT") {
					$elementCollection.each(function(k, el) {
						var $el = $(el);
						if ($el.is(":checked") || ($element.attr("type") === "radio" && $el.not(":checked") && clickedLink !== $el.next().get(0))) {
							$el.prop("checked", false);
							$el.next().removeClass(plugin.settings.checkedClass).trigger("rc_unchecked");
						} else {
							$el.prop("checked", true);
							$el.next().addClass(plugin.settings.checkedClass).trigger("rc_checked");
						}
					});
				} else {
					if ($element.attr("type") === "radio") {
						$('input[name='+ $element.attr("name") +']').each(function(){
							$(this).next().removeClass(plugin.settings.checkedClass).trigger("rc_unchecked");
						});
					}
					$element.next().toggleClass(plugin.settings.checkedClass).trigger("rc_checked");
				}
			},
			initEvents = function() {
				$element.next().bind("click", handleChange);
				$element.bind("change", handleChange);
			};

		
		plugin.settings = {};
        
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
			buildCustomElement();
			initEvents();
        };

        plugin.init();
    };
    $.fn.replaceRCInputs = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('replaceRCInputs')) {
                var plugin = new $.replaceRCInputs(this, options);
                $(this).data('replaceRCInputs', plugin);
            }
        });
    };

})(jQuery);