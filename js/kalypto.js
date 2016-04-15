/*! 'Kalypto - Replace Radio/Checkbox Inputs' MIT license, LocalPCGuy, http://localpcguy.github.com/Kalypto */
/********************************
* Kalypto - Replace checkboxes and radio buttons
* Created & copyright (c)  by Mike Behnke
* v.0.2.2
* http://www.local-pc-guy.com
* Twitter: @LocalPCGuy
*
* Released under MIT License
*
* usage:
*        $('input[name=rDemo]').kalypto();
*        $('#checkboxDemo').kalypto();
* events: (bound on the input)
*        k_elbuilt: when an element is built
*        k_checked: when an element is checked
*        k_unchecked: when an element is checked
********************************/
;(function ($) {
    'use strict';

    $.kalypto = Kalypto;
    $.fn.kalypto = kalyptoPlugin;

    function kalyptoPlugin(options) {
        return this.each(_attachKalypto);

        function _attachKalypto() {
            var $el = $(this);
            if ($el.data('kalypto') === undefined) {
                var plugin = new $.kalypto(this, options);
                $el.data('kalypto', plugin);
            } else {
                console.log('Kalypto is already defined on this element.', $el);
            }
        }
    }

    function Kalypto(element, options) {
        var plugin = this;
        var $element = $(element);
        var defaults = {
                toggleClass: 'toggle',
                checkedClass: 'checked',
                hideInputs: true,
                copyInputClasses: true,
                dataLabel: $element.data('label') || '',
                checkedEvent: 'k_checked',
                uncheckedEvent: 'k_unchecked',
                elBuiltEvent: 'k_elbuilt',
                customClasses: ''
            };
        var $customEl;

        plugin.settings = {};
        plugin.init = _pluginInit;
        plugin.init();

        function _pluginInit() {
            plugin.settings = $.extend({}, defaults, options);
            _buildCustomElement();
            _initEvents();
        }

        function _buildCustomElement() {
            if ($element.next().hasClass(plugin.settings.toggleClass)) { return; }
            $element.after(_buildElement);
            if (plugin.settings.hideInputs) {
                $element.hide();
            }
            $customEl = $element.next();
            $element.trigger(plugin.settings.elBuiltEvent);

            function _buildElement() {
                var classes = plugin.settings.toggleClass;
                if (plugin.settings.copyInputClasses) {
                    var elClass = $element.attr('class');
                    if(elClass){
                        classes += ' ' + elClass;
                    }
                }
                if (plugin.settings.customClasses.length) {
                    classes += ' ' + plugin.settings.customClasses;
                }
                if ($element.is(':checked')) {
                    return '<a href="#" class="' + classes + ' ' + plugin.settings.checkedClass + '">' + plugin.settings.dataLabel + '</a>';
                } else {
                    return '<a href="#" class="' + classes + '">' + plugin.settings.dataLabel + '</a>';
                }
            }
        }

        function _initEvents() {
            $element.next().bind('click', _handleChange);
            $element.bind('change', _handleChange);
        }

        function _handleChange(e) {
            var $elementCollection = $element.attr('type') === 'radio' ? $('input[name="' + $element.attr('name') + '"]') : $element;
            
            if (this.tagName !== 'INPUT') {
                e.preventDefault();
                plugin.lastClickedEl = this;
                $element.trigger('click');
            } else {
                setTimeout(_doTriggerAndChangeClasses, 0);
            }

            function _doTriggerAndChangeClasses() {
                if ($element.attr('type') === 'radio') {
                    $elementCollection.each(_iterateRadioCollection);
                }                   
                if ($element.is(':checked')) { $element.trigger(plugin.settings.checkedEvent); }
                else { $element.trigger(plugin.settings.uncheckedEvent); }
                $element.next().toggleClass(plugin.settings.checkedClass);
            }

            function _iterateRadioCollection(k, el) {
                var $el = $(el);
                $el.next().removeClass(plugin.settings.checkedClass);
                if (!$el.is(':checked') && plugin.lastClickedEl !== $el.next().get(0)) {
                    // Should this only trigger on the radio button that was previously checked
                    // Currently fires on all radio buttons BUT the one justed checked
                    $el.trigger(plugin.settings.uncheckedEvent);
                }
            }
        }
    }
}(jQuery));