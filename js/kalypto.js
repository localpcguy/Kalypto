/*! "Kalypto - Replace Radio/Checkbox Inputs" MIT license, LocalPCGuy, http://localpcguy.github.com/Kalypto */
/********************************
* Kalypto - Replace checkboxes and radio buttons
* Created & copyright (c)  by Mike Behnke
* v.0.2.1
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
                copyInputClasses: true,
				dataLabel: $element.data("label") || "",
                checkedEvent: "rc_checked",
                uncheckedEvent: "rc_unchecked",
                elBuiltEvent: "rc_elbuilt",
                customClasses: ""
			},
			$customEl,
			buildCustomElement = function() {
				$element.after(function() {
                    var classes = plugin.settings.toggleClass;
                    if (plugin.settings.copyInputClasses) {
                        classes += " " + $element.attr("class");
                    }
					if (plugin.settings.customClasses.length) {
                        classes += " " + plugin.settings.customClasses;
                    }
                    if ($element.is(":checked")) {
						return "<a href='#' class='" + classes + " " + plugin.settings.checkedClass + "'>" + plugin.settings.dataLabel + "</a>";
					} else {
						return "<a href='#' class='" + classes + "'>" + plugin.settings.dataLabel + "</a>";
					}
				});
				if (plugin.settings.hideInputs) {
					$element.hide();
				}
				$customEl = $element.next();
				$element.trigger(plugin.settings.elBuiltEvent);
			},
			handleChange = function(e) {
				var $elementCollection = $element.attr("type") === "radio" ? $('input[name="'+ $element.attr("name") +'"]') : $element,
					clickedLink = this;
				e.preventDefault();

				if (this.tagName !== "INPUT") {
					$elementCollection.each(function(k, el) {
						var $el = $(el);
						if (($el.is(":checked") && $element.attr("type") === "checkbox") || ($element.attr("type") === "radio" && $el.not(":checked") && clickedLink !== $el.next().get(0))) {
							$el.prop("checked", false).trigger(plugin.settings.uncheckedEvent);
							$el.next().removeClass(plugin.settings.checkedClass);
						} else {
							$el.prop("checked", true).trigger(plugin.settings.checkedEvent);
							$el.next().addClass(plugin.settings.checkedClass);
						}
					});
				} else {
					if ($element.attr("type") === "radio") {
						$('input[name="'+ $element.attr("name") +'"]').each(function(){
							$(this).trigger(plugin.settings.uncheckedEvent).next().removeClass(plugin.settings.checkedClass);
						});
					}
					if ($element.is(":checked")) {$element.trigger(plugin.settings.checkedEvent); }
					else {$element.trigger(plugin.settings.uncheckedEvent);}
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
