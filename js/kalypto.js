/********************************
* Kalypto - Replace checkboxes and radio buttons
* Created & copyright (c)  by Mike Behnke
* v.0.1.0
* http://www.local-pc-guy.com
* Twitter: @LocalPCGuy
*
* Released under MIT License
*
* usage:
*        $("input[name=rDemo]").kalypto({hideInputs: false});
*        $("#checkboxDemo").kalypto({hideInputs: false});
* events: (bound on the new element)
*        rc_elbuilt: when an element is built
* events: (bound on the input)
*        rc_checked: when an element is checked
*        rc_unchecked: when an element is checked
********************************/
;(function($, undefined) {

    $.kalypto = function(element, options) {

        var plugin = this,
			$element = $(element),
			defaults = {
				toggleClass: "toggle",
				checkedClass: "checked",
				hideInputs: true,
				dataLabel: $element.data("label") || ""
			},
			$customEl,
			buildCustomElement = function() {
				$element.after(function() {
					if ($element.is(":checked")) {
						return "<a href='#' class='" + plugin.settings.toggleClass + " " + plugin.settings.checkedClass + "'>" + plugin.settings.dataLabel + "</a>";
					} else {
						return "<a href='#' class='" + plugin.settings.toggleClass + "'>" + plugin.settings.dataLabel + "</a>";
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
						if (($el.is(":checked") && $element.attr("type") === "checkbox") || ($element.attr("type") === "radio" && $el.not(":checked") && clickedLink !== $el.next().get(0))) {
							$el.prop("checked", false).trigger("rc_unchecked");
							$el.next().removeClass(plugin.settings.checkedClass);
						} else {
							$el.prop("checked", true).trigger("rc_checked");
							$el.next().addClass(plugin.settings.checkedClass);
						}
					});
				} else {
					if ($element.attr("type") === "radio") {
						$('input[name='+ $element.attr("name") +']').each(function(){
							$(this).trigger("rc_unchecked").next().removeClass(plugin.settings.checkedClass);
						});
					}
					if ($element.is(":checked")) {$element.trigger("rc_checked"); }
					else {$element.trigger("rc_unchecked");}
					$element.next().toggleClass(plugin.settings.checkedClass);
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
    $.fn.kalypto = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('kalypto')) {
                var plugin = new $.kalypto(this, options);
                $(this).data('kalypto', plugin);
            }
        });
    };

})(jQuery);