/*!
  * DashboardCode BsMultiSelect v0.1.19 (https://dashboardcode.github.io/BsMultiSelect/)
  * Copyright 2017-2018 Roman Pokrovskij (github user rpokrovskij)
  * Licensed under APACHE 2 (https://github.com/DashboardCode/BsMultiSelect/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('popper.js'), require('jquery')) :
    typeof define === 'function' && define.amd ? define(['popper.js', 'jquery'], factory) :
    (factory(global.Popper,global.jQuery));
}(this, (function (Popper,$) { 'use strict';

    Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

    var Bs4Commons =
    /*#__PURE__*/
    function () {
      function Bs4Commons(jQuery, hiddenSelect, dropDownItemHoverClass) {
        this.$ = jQuery;
        this.hiddenSelect = hiddenSelect;
        this.dropDownItemHoverClass = dropDownItemHoverClass;
      }

      var _proto = Bs4Commons.prototype;

      _proto.HandleLabel = function HandleLabel($selectedPanel, containerClass) {
        var inputId = this.hiddenSelect.id;
        var $formGroup = this.$(this.hiddenSelect).closest('.form-group');

        if ($formGroup.length == 1) {
          var $label = $formGroup.find("label[for=\"" + inputId + "\"]");
          var forId = $label.attr('for');
          var $filterInput = $selectedPanel.find('input');

          if (forId == this.hiddenSelect.id) {
            var id = containerClass + "-generated-filter-id-" + this.hiddenSelect.id;
            $filterInput.attr('id', id);
            $label.attr('for', id);
            return function () {
              $label.attr('for', forId);
            };
          }
        }

        return null;
      };

      _proto.CreateDropDownItemContent = function CreateDropDownItemContent($dropDownItem, optionId, itemText, isSelected, containerClass, dropDownItemClass) {
        var checkBoxId = containerClass + "-" + this.hiddenSelect.name.toLowerCase() + "-generated-id-" + optionId.toLowerCase();
        var checked = isSelected ? "checked" : "";
        var $dropDownItemContent = this.$("<div class=\"custom-control custom-checkbox\">\n            <input type=\"checkbox\" class=\"custom-control-input\" id=\"" + checkBoxId + "\" " + checked + ">\n            <label class=\"custom-control-label\" for=\"" + checkBoxId + "\">" + itemText + "</label>\n        </div>");
        $dropDownItemContent.appendTo($dropDownItem);
        var $checkBox = $dropDownItem.find("INPUT[type=\"checkbox\"]");

        var adoptDropDownItem = function adoptDropDownItem(isSelected) {
          $checkBox.prop('checked', isSelected);
        };

        $dropDownItem.addClass(dropDownItemClass);
        return adoptDropDownItem;
      };

      _proto.CreateSelectedItemContent = function CreateSelectedItemContent($selectedItem, itemText, removeSelectedItem, selectedItemClass, removeSelectedItemButtonClass, disabled) {
        $selectedItem.addClass(selectedItemClass);
        this.$("<span>" + itemText + "</span>").appendTo($selectedItem);
        var $button = this.$('<button aria-label="Close" tabIndex="-1" type="button"><span aria-hidden="true">&times;</span></button>').addClass(removeSelectedItemButtonClass).css("white-space", "nowrap").on("click", removeSelectedItem).appendTo($selectedItem).prop("disabled", disabled);
        return $button;
      };

      _proto.FilterClick = function FilterClick(event) {
        return !(event.target.nodeName == "BUTTON" || event.target.nodeName == "SPAN" && event.target.parentElement.nodeName == "BUTTON");
      };

      _proto.Hover = function Hover($dropDownItem, isHover) {
        if (isHover) $dropDownItem.addClass(this.dropDownItemHoverClass);else $dropDownItem.removeClass(this.dropDownItemHoverClass);
      };

      return Bs4Commons;
    }();

    var Bs4AdapterCss =
    /*#__PURE__*/
    function () {
      function Bs4AdapterCss(jQuery, hiddenSelect, options) {
        var defaults = {
          containerClass: 'dashboardcode-bsmultiselect',
          dropDownMenuClass: 'dropdown-menu',
          dropDownItemClass: 'px-2',
          dropDownItemHoverClass: 'text-primary bg-light',
          selectedPanelClass: 'form-control',
          selectedPanelFocusClass: 'focus',
          selectedPanelDisabledClass: 'disabled',
          selectedItemClass: 'badge',
          removeSelectedItemButtonClass: 'close',
          filterInputItemClass: '',
          filterInputClass: ''
        };
        this.options = jQuery.extend({}, defaults, options);
        this.jQuery = jQuery;
        this.hiddenSelect = hiddenSelect;
        this.bs4Commons = new Bs4Commons(jQuery, hiddenSelect, this.options.dropDownItemHoverClass);
        this.bs4CommonsLabelDispose = null;
      }

      var _proto = Bs4AdapterCss.prototype;

      _proto.Init = function Init($container, $selectedPanel, $filterInputItem, $filterInput, $dropDownMenu) {
        $container.addClass(this.options.containerClass);
        $selectedPanel.addClass(this.options.selectedPanelClass);
        $dropDownMenu.addClass(this.options.dropDownMenuClass);
        $filterInputItem.addClass(this.options.filterInputItemClass);
        $filterInput.addClass(this.options.filterInputClass);
        this.bs4CommonsLabelDispose = this.bs4Commons.HandleLabel($selectedPanel, this.options.containerClass);
      };

      _proto.Dispose = function Dispose() {
        if (this.bs4CommonsLabelDispose !== null) this.bs4CommonsLabelDispose();
      };

      _proto.UpdateIsValid = function UpdateIsValid($selectedPanel) {
        var $hiddenSelect = this.jQuery(this.hiddenSelect);

        if ($hiddenSelect.hasClass("is-valid")) {
          $selectedPanel.addClass("is-valid");
        }

        if ($hiddenSelect.hasClass("is-invalid")) {
          $selectedPanel.addClass("is-invalid");
        }
      };

      _proto.Enable = function Enable($selectedPanel, isEnabled) {
        if (isEnabled) {
          $selectedPanel.removeClass(this.options.selectedPanelDisabledClass);
          $selectedPanel.find('BUTTON').prop("disabled", false);
        } else {
          $selectedPanel.addClass(this.options.selectedPanelDisabledClass);
          $selectedPanel.find('BUTTON').prop("disabled", true);
        }
      };

      _proto.CreateDropDownItemContent = function CreateDropDownItemContent($dropDownItem, optionId, itemText, isSelected) {
        return this.bs4Commons.CreateDropDownItemContent($dropDownItem, optionId, itemText, isSelected, this.options.containerClass, this.options.dropDownItemClass);
      };

      _proto.CreateSelectedItemContent = function CreateSelectedItemContent($selectedItem, itemText, removeSelectedItem, disabled) {
        this.bs4Commons.CreateSelectedItemContent($selectedItem, itemText, removeSelectedItem, this.options.selectedItemClass, this.options.removeSelectedItemButtonClass, disabled);
      };

      _proto.Hover = function Hover($dropDownItem, isHover) {
        this.bs4Commons.Hover($dropDownItem, isHover);
      };

      _proto.FilterClick = function FilterClick(event) {
        return this.bs4Commons.FilterClick(event);
      };

      _proto.Focus = function Focus($selectedPanel, isFocused) {
        if (isFocused) {
          $selectedPanel.addClass(this.options.selectedPanelFocusClass);
        } else {
          $selectedPanel.removeClass(this.options.selectedPanelFocusClass);
        }
      };

      return Bs4AdapterCss;
    }();

    var Bs4Adapter =
    /*#__PURE__*/
    function () {
      function Bs4Adapter(jQuery, hiddenSelect, options) {
        var defaults = {
          selectedPanelDefMinHeight: 'calc(2.25rem + 2px)',
          selectedPanelLgMinHeight: 'calc(2.875rem + 2px)',
          selectedPanelSmMinHeight: 'calc(1.8125rem + 2px)',
          selectedPanelDisabledBackgroundColor: '#e9ecef',
          selectedPanelFocusBorderColor: '#80bdff',
          selectedPanelFocusBoxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
          selectedPanelFocusValidBoxShadow: '0 0 0 0.2rem rgba(40, 167, 69, 0.25)',
          selectedPanelFocusInvalidBoxShadow: '0 0 0 0.2rem rgba(220, 53, 69, 0.25)',
          filterInputColor: '#495057'
        };
        this.options = jQuery.extend({}, defaults, options);
        this.jQuery = jQuery;
        this.hiddenSelect = hiddenSelect;
        this.containerClass = 'dashboardcode-bsmultiselect';
        this.dropDownMenuClass = 'dropdown-menu';
        this.dropDownItemClass = 'px-2';
        this.dropDownItemHoverClass = 'text-primary bg-light';
        this.selectedPanelClass = 'form-control';
        this.selectedItemClass = 'badge';
        this.removeSelectedItemButtonClass = 'close';
        this.selectedPanelStyle = {
          'margin-bottom': '0'
        };
        this.selectedItemStyle = {
          'padding-left': '0px',
          'line-height': '1.5em'
        };
        this.removeSelectedItemButtonStyle = {
          'font-size': '1.5em',
          'line-height': '.9em'
        };
        this.bs4Commons = new Bs4Commons(jQuery, hiddenSelect, this.dropDownItemHoverClass);
        this.bs4CommonsLabelDispose = null;
      }

      var _proto = Bs4Adapter.prototype;

      _proto.Init = function Init($container, $selectedPanel, $filterInputItem, $filterInput, $dropDownMenu) {
        $container.addClass(this.containerClass);
        $selectedPanel.addClass(this.selectedPanelClass);
        $selectedPanel.css(this.selectedPanelStyle);
        $dropDownMenu.addClass(this.dropDownMenuClass);
        $filterInput.css("color", this.options.filterInputColor);
        this.bs4CommonsLabelDispose = this.bs4Commons.HandleLabel($selectedPanel, this.containerClass);
      };

      _proto.Dispose = function Dispose() {
        if (this.bs4CommonsLabelDispose !== null) this.bs4CommonsLabelDispose();
      };

      _proto.UpdateIsValid = function UpdateIsValid($selectedPanel) {
        var $hiddenSelect = this.jQuery(this.hiddenSelect);

        if ($hiddenSelect.hasClass("is-valid")) {
          $selectedPanel.addClass("is-valid");
        }

        if ($hiddenSelect.hasClass("is-invalid")) {
          $selectedPanel.addClass("is-invalid");
        }
      };

      _proto.UpdateSize = function UpdateSize($selectedPanel) {
        if ($selectedPanel.hasClass("form-control-lg")) {
          $selectedPanel.css("min-height", this.options.selectedPanelLgMinHeight);
        } else if ($selectedPanel.hasClass("form-control-sm")) {
          $selectedPanel.css("min-height", this.options.selectedPanelSmMinHeight);
        } else {
          $selectedPanel.css("min-height", this.options.selectedPanelDefMinHeight);
        }
      };

      _proto.Enable = function Enable($selectedPanel, isEnabled) {
        if (isEnabled) {
          $selectedPanel.css({
            "background-color": ""
          });
          $selectedPanel.find('BUTTON').prop("disabled", false);
        } else {
          $selectedPanel.css({
            "background-color": this.options.selectedPanelDisabledBackgroundColor
          });
          $selectedPanel.find('BUTTON').prop("disabled", true);
        }
      };

      _proto.CreateDropDownItemContent = function CreateDropDownItemContent($dropDownItem, optionId, itemText, isSelected) {
        return this.bs4Commons.CreateDropDownItemContent($dropDownItem, optionId, itemText, isSelected, this.containerClass, this.dropDownItemClass);
      };

      _proto.CreateSelectedItemContent = function CreateSelectedItemContent($selectedItem, itemText, removeSelectedItem, disabled) {
        var $buttom = this.bs4Commons.CreateSelectedItemContent($selectedItem, itemText, removeSelectedItem, this.selectedItemClass, this.removeSelectedItemButtonClass, disabled);
        $buttom.css(this.removeSelectedItemButtonStyle);
        $selectedItem.css(this.selectedItemStyle);
      };

      _proto.Hover = function Hover($dropDownItem, isHover) {
        this.bs4Commons.Hover($dropDownItem, isHover);
      };

      _proto.FilterClick = function FilterClick(event) {
        return this.bs4Commons.FilterClick(event);
      };

      _proto.Focus = function Focus($selectedPanel, isFocused) {
        if (isFocused) {
          if ($selectedPanel.hasClass("is-valid")) {
            $selectedPanel.css("box-shadow", this.options.selectedPanelFocusValidBoxShadow);
          } else if ($selectedPanel.hasClass("is-invalid")) {
            $selectedPanel.css("box-shadow", this.options.selectedPanelFocusInvalidBoxShadow);
          } else {
            $selectedPanel.css("box-shadow", this.options.selectedPanelFocusBoxShadow).css("border-color", this.options.selectedPanelFocusBorderColor);
          }
        } else {
          $selectedPanel.css("box-shadow", "").css("border-color", "");
        }
      };

      return Bs4Adapter;
    }();

    var defSelectedPanelStyleSys = {
      'display': 'flex',
      'flex-wrap': 'wrap',
      'list-style-type': 'none'
    }; // remove bullets since this is ul

    var defFilterInputStyleSys = {
      'width': '2ch',
      'border': '0',
      'padding': '0',
      'outline': 'none',
      'background-color': 'transparent'
    };
    var defDropDownMenuStyleSys = {
      'list-style-type': 'none'
    }; // remove bullets since this is ul
    // jQuery used for:
    // $.extend, $.contains, $("<div>"), $(function(){}) aka ready
    // $e.trigger, $e.unbind, $e.on; but namespaces are not used;
    // events: "focusin", "focusout", "mouseover", "mouseout", "keydown", "keyup", "click"
    // $e.show, $e.hide, $e.focus, $e.css
    // $e.appendTo, $e.remove, $e.find, $e.closest, $e.prev, $e.data, $e.val

    var MultiSelect =
    /*#__PURE__*/
    function () {
      function MultiSelect(selectElement, options, adapter, window, $$$1) {
        if (typeof Popper === 'undefined') {
          throw new TypeError('DashboardCode BsMultiSelect require Popper.js (https://popper.js.org)');
        } // readonly


        this.selectElement = selectElement;
        this.adapter = adapter;
        this.window = window;
        this.$ = $$$1;
        this.options = $$$1.extend({}, options);
        this.container = null;
        this.selectedPanel = null;
        this.filterInputItem = null;
        this.filterInput = null;
        this.dropDownMenu = null;
        this.popper = null; // removable handlers

        this.selectedPanelClick = null;
        this.documentMouseup = null;
        this.containerMousedown = null;
        this.documentMouseup2 = null; // state

        this.disabled = null;
        this.filterInputItemOffsetLeft = null; // used to detect changes in input field position (by comparision with current value)

        this.skipFocusout = false;
        this.hoveredDropDownItem = null;
        this.hoveredDropDownIndex = null;
        this.hasDropDownVisible = false; // jquery adapters

        this.$document = $$$1(window.document);
        this.init();
      }

      var _proto = MultiSelect.prototype;

      _proto.updateDropDownPosition = function updateDropDownPosition(force) {
        var offsetLeft = this.filterInputItem.offsetLeft;

        if (force || this.filterInputItemOffsetLeft != offsetLeft) {
          this.popper.update();
          this.filterInputItemOffsetLeft = offsetLeft;
        }
      };

      _proto.hideDropDown = function hideDropDown() {
        this.dropDownMenu.style.display = 'none';
      };

      _proto.showDropDown = function showDropDown() {
        this.dropDownMenu.style.display = 'block';
      }; // Public methods


      _proto.resetDropDownMenuHover = function resetDropDownMenuHover() {
        if (this.hoveredDropDownItem !== null) {
          this.adapter.Hover(this.$(this.hoveredDropDownItem), false);
          this.hoveredDropDownItem = null;
        }

        this.hoveredDropDownIndex = null;
      };

      _proto.filterDropDownMenu = function filterDropDownMenu() {
        var _this = this;

        var text = this.filterInput.value.trim().toLowerCase();
        var visible = 0;
        this.$(this.dropDownMenu).find('LI').each(function (i, dropDownMenuItem) {
          var $dropDownMenuItem = _this.$(dropDownMenuItem);

          if (text == '') {
            $dropDownMenuItem.show();
            visible++;
          } else {
            var itemText = $dropDownMenuItem.data("option-text");
            var isSelected = $dropDownMenuItem.data("option-selected");

            if (!isSelected && itemText.indexOf(text) >= 0) {
              $dropDownMenuItem.show();
              visible++;
            } else {
              $dropDownMenuItem.hide();
            }
          }
        });
        this.hasDropDownVisible = visible > 0;
        this.resetDropDownMenuHover();
      };

      _proto.clearFilterInput = function clearFilterInput(updatePosition) {
        if (this.filterInput.value) {
          this.filterInput.value = '';
          this.input(updatePosition);
        }
      };

      _proto.closeDropDown = function closeDropDown() {
        this.resetDropDownMenuHover();
        this.clearFilterInput(true);
        this.hideDropDown();
      };

      _proto.appendDropDownItem = function appendDropDownItem(optionElement) {
        var _this2 = this;

        var optionId = optionElement.value;
        var itemText = optionElement.text;
        var isSelected = optionElement.selected;
        var $dropDownItem = this.$("<LI/>");
        $dropDownItem.data("option-id", optionId);
        $dropDownItem.data("option-text", itemText.toLowerCase());
        var adoptDropDownItem = this.adapter.CreateDropDownItemContent($dropDownItem, optionId, itemText, isSelected);
        $dropDownItem.appendTo(this.dropDownMenu);

        var appendItem = function appendItem(doTrigger) {
          $dropDownItem.data("option-selected", true);

          var $selectedItem = _this2.$("<LI/>");

          $selectedItem.data("option-id", optionId);
          optionElement.selected = true;
          adoptDropDownItem(true);

          var removeItem = function removeItem() {
            $dropDownItem.data("option-selected", false);
            $dropDownItem.data("option-toggle", appendItem);
            $selectedItem.data("option-remove", null);
            $selectedItem.remove();
            optionElement.selected = false;
            adoptDropDownItem(false);

            _this2.$(_this2.selectElement).trigger('change');
          };

          var removeItemAndCloseDropDown = function removeItemAndCloseDropDown() {
            removeItem();

            _this2.closeDropDown();
          };

          _this2.adapter.CreateSelectedItemContent($selectedItem, itemText, removeItemAndCloseDropDown, _this2.disabled);

          $selectedItem.insertBefore(_this2.filterInputItem);
          $dropDownItem.data("option-toggle", removeItem);
          $selectedItem.data("option-remove", removeItemAndCloseDropDown);
          if (typeof doTrigger === "undefined" || doTrigger === true) _this2.$(_this2.selectElement).trigger('change');
          return $selectedItem;
        };

        $dropDownItem.data("option-toggle", appendItem);

        if (isSelected) {
          appendItem(false);
        }

        var manageHover = function manageHover(event, isOn) {
          _this2.adapter.Hover(_this2.$(event.target).closest("LI"), isOn);
        };

        $dropDownItem.click(function (event) {
          event.preventDefault();
          event.stopPropagation();

          var toggleItem = _this2.$(event.currentTarget).closest("LI").data("option-toggle");

          toggleItem();

          _this2.filterInput.focus();
        }).mouseover(function (e) {
          return manageHover(e, true);
        }).mouseout(function (e) {
          return manageHover(e, false);
        });
      };

      _proto.keydownArrow = function keydownArrow(down) {
        var visibleNodeListArray = this.$(this.dropDownMenu).find('LI:not([style*="display: none"])').toArray();

        if (visibleNodeListArray.length > 0) {
          if (this.hasDropDownVisible) {
            this.updateDropDownPosition(true);
            this.showDropDown();
          }

          if (this.hoveredDropDownItem === null) {
            this.hoveredDropDownIndex = down ? 0 : visibleNodeListArray.length - 1;
          } else {
            this.adapter.Hover(this.$(this.hoveredDropDownItem), false);

            if (down) {
              var newIndex = this.hoveredDropDownIndex + 1;
              this.hoveredDropDownIndex = newIndex < visibleNodeListArray.length ? newIndex : 0;
            } else {
              var _newIndex = this.hoveredDropDownIndex - 1;

              this.hoveredDropDownIndex = _newIndex >= 0 ? _newIndex : visibleNodeListArray.length - 1;
            }
          }

          this.hoveredDropDownItem = visibleNodeListArray[this.hoveredDropDownIndex];
          this.adapter.Hover(this.$(this.hoveredDropDownItem), true);
        }
      };

      _proto.input = function input(forceUpdatePosition) {
        this.filterInput.style.width = this.filterInput.value.length * 1.3 + 2 + "ch";
        this.filterDropDownMenu();

        if (this.hasDropDownVisible) {
          if (forceUpdatePosition) // ignore it if it is called from
            this.updateDropDownPosition(forceUpdatePosition); // we need it to support case when textbox changes its place because of line break (texbox grow with each key press)

          this.showDropDown();
        } else {
          this.hideDropDown();
        }
      };

      _proto.Update = function Update() {
        var $selectedPanel = this.$(this.selectedPanel);
        this.adapter.UpdateIsValid($selectedPanel);
        this.UpdateSizeImpl($selectedPanel);
        this.UpdateDisabledImpl(this.$(this.container), $selectedPanel);
      };

      _proto.Dispose = function Dispose() {
        // removable handlers
        this.$document.unbind("mouseup", this.documentMouseup).unbind("mouseup", this.documentMouseup2);

        if (this.adapter !== null) {
          this.adapter.Dispose();
        }

        if (this.popper !== null) {
          this.popper.destroy();
        }

        if (this.container !== null) {
          this.$(this.container).remove();
        } // this.selectedPanel = null;
        // this.filterInputItem = null;
        // this.filterInput = null;
        // this.dropDownMenu = null;
        // this.selectElement = null;
        // this.options = null;

      };

      _proto.UpdateSize = function UpdateSize() {
        this.UpdateSizeImpl(this.$(this.selectedPanel));
      };

      _proto.UpdateDisabled = function UpdateDisabled() {
        this.UpdateDisabledImpl(this.$(this.container), this.$(this.selectedPanel));
      };

      _proto.UpdateSizeImpl = function UpdateSizeImpl($selectedPanel) {
        if (this.adapter.UpdateSize) this.adapter.UpdateSize($selectedPanel);
      };

      _proto.UpdateDisabledImpl = function UpdateDisabledImpl($container, $selectedPanel) {
        var disabled = this.selectElement.disabled;

        if (this.disabled !== disabled) {
          if (disabled) {
            this.filterInput.style.display = "none";
            this.adapter.Enable($selectedPanel, false);
            $container.unbind("mousedown", this.containerMousedown);
            this.$document.unbind("mouseup", this.documentMouseup);
            $selectedPanel.unbind("click", this.selectedPanelClick);
            this.$document.unbind("mouseup", this.documentMouseup2);
          } else {
            this.filterInput.style.display = "inline-block";
            this.adapter.Enable($selectedPanel, true);
            $container.mousedown(this.containerMousedown); // removable

            this.$document.mouseup(this.documentMouseup); // removable

            $selectedPanel.click(this.selectedPanelClick); // removable

            this.$document.mouseup(this.documentMouseup2); // removable
          }

          this.disabled = disabled;
        }
      };

      _proto.init = function init() {
        var _this3 = this;

        var $selectElement = this.$(this.selectElement);
        $selectElement.hide();
        var $container = this.$("<DIV/>");
        this.container = $container.get(0);
        var $selectedPanel = this.$("<UL/>");
        $selectedPanel.css(defSelectedPanelStyleSys);
        this.selectedPanel = $selectedPanel.get(0);
        $selectedPanel.appendTo(this.container);
        var $filterInputItem = this.$('<LI/>');
        this.filterInputItem = $filterInputItem.get(0);
        $filterInputItem.appendTo(this.selectedPanel);
        var $filterInput = this.$('<INPUT type="search" autocomplete="off">');
        $filterInput.css(defFilterInputStyleSys);
        $filterInput.appendTo(this.filterInputItem);
        this.filterInput = $filterInput.get(0);
        var $dropDownMenu = this.$("<UL/>").css({
          "display": "none"
        }).appendTo($container);
        this.dropDownMenu = $dropDownMenu.get(0); // prevent heavy understandable styling error

        $dropDownMenu.css(defDropDownMenuStyleSys); // create handlers

        this.documentMouseup = function () {
          _this3.skipFocusout = false;
        };

        this.containerMousedown = function () {
          _this3.skipFocusout = true;
        };

        this.documentMouseup2 = function (event) {
          if (!(_this3.container === event.target || _this3.$.contains(_this3.container, event.target))) {
            _this3.closeDropDown();
          }
        };

        this.selectedPanelClick = function (event) {
          if (event.target.nodeName != "INPUT") _this3.$(_this3.filterInput).val('').focus();

          if (_this3.hasDropDownVisible && _this3.adapter.FilterClick(event)) {
            _this3.updateDropDownPosition(true);

            _this3.showDropDown();
          }
        };

        this.adapter.Init($container, $selectedPanel, $filterInputItem, $filterInput, $dropDownMenu);
        $container.insertAfter($selectElement);
        this.popper = new Popper(this.filterInput, this.dropDownMenu, {
          placement: 'bottom-start',
          modifiers: {
            preventOverflow: {
              enabled: false
            },
            hide: {
              enabled: false
            },
            flip: {
              enabled: false
            }
          }
        });
        this.adapter.UpdateIsValid($selectedPanel);
        this.UpdateSizeImpl($selectedPanel);
        this.UpdateDisabledImpl($container, $selectedPanel); // some browsers (IE11) can change select value (as part of "autocomplete") after page is loaded but before "ready" event
        // bellow: ready shortcut

        this.$(function () {
          var selectOptions = $selectElement.find('OPTION');
          selectOptions.each(function (index, optionElement) {
            _this3.appendDropDownItem(optionElement);
          });
          _this3.hasDropDownVisible = selectOptions.length > 0;

          _this3.updateDropDownPosition(false);
        });
        $dropDownMenu.click(function (event) {
          return event.stopPropagation();
        });
        $dropDownMenu.mouseover(function () {
          return _this3.resetDropDownMenuHover();
        });
        $filterInput.focusin(function () {
          return _this3.adapter.Focus($selectedPanel, true);
        }).focusout(function () {
          if (!_this3.skipFocusout) _this3.adapter.Focus($selectedPanel, false);
        });
        $filterInput.on("keydown", function (event) {
          if (event.which == 38) {
            event.preventDefault();

            _this3.keydownArrow(false);
          } else if (event.which == 40) {
            event.preventDefault();

            _this3.keydownArrow(true);
          } else if (event.which == 13) {
            event.preventDefault();
          } else if (event.which == 9) {
            if (_this3.filterInput.value) {
              event.preventDefault();
            } else {
              _this3.closeDropDown();
            }
          } else {
            if (event.which == 8) {
              // NOTE: this will process backspace only if there are no text in the input field
              // If user will find this inconvinient, we will need to calculate something like this
              // this.isBackspaceAtStartPoint = (this.filterInput.selectionStart == 0 && this.filterInput.selectionEnd == 0);
              if (!_this3.filterInput.value) {
                var $penult = _this3.$(_this3.selectedPanel).find("LI:last").prev();

                if ($penult.length) {
                  var removeItem = $penult.data("option-remove");
                  removeItem();
                }

                _this3.updateDropDownPosition(false);
              }
            }

            _this3.resetDropDownMenuHover();
          }
        });
        $filterInput.on("keyup", function (event) {
          if (event.which == 13 || event.which == 9) {
            if (_this3.hoveredDropDownItem) {
              var $hoveredDropDownItem = _this3.$(_this3.hoveredDropDownItem);

              var toggleItem = $hoveredDropDownItem.data("option-toggle");
              toggleItem();

              _this3.closeDropDown();
            } else {
              var text = _this3.filterInput.value.trim().toLowerCase();

              var dropDownItems = _this3.dropDownMenu.querySelectorAll("LI");

              var dropDownItem = null;

              for (var i = 0; i < dropDownItems.length; ++i) {
                var it = dropDownItems[i];

                if (it.textContent.trim().toLowerCase() == text) {
                  dropDownItem = it;
                  break;
                }
              }

              if (dropDownItem) {
                var $dropDownItem = _this3.$(dropDownItem);

                var isSelected = $dropDownItem.data("option-selected");

                if (!isSelected) {
                  var toggle = $dropDownItem.data("option-toggle");
                  toggle();
                }

                _this3.clearFilterInput(true);
              }
            }
          } else if (event.which == 27) {
            // escape
            _this3.closeDropDown();
          }
        });
        $filterInput.on('input', function () {
          _this3.input(true);
        });
      };

      return MultiSelect;
    }();

    function AddToJQueryPrototype(pluginName, createPlugin, $$$1) {
      var prototypedName = pluginName.charAt(0).toLowerCase() + pluginName.slice(1);
      var noConflictPrototypable = $$$1.fn[prototypedName];
      var dataKey = "DashboardCode." + pluginName;

      function prototypable(options) {
        return this.each(function () {
          var $e = $$$1(this);
          var instance = $e.data(dataKey);
          var isMethodName = typeof options === 'string';

          var isDispose = function isDispose(s) {
            return /Dispose/.test(s);
          };

          if (!instance) {
            if (isMethodName && isDispose(options)) {
              return;
            }

            var optionsObject = typeof options === 'object' ? options : null;
            instance = createPlugin(this, optionsObject);
            $e.data(dataKey, instance);
          }

          if (isMethodName) {
            var methodName = options;

            if (isDispose(methodName)) {
              $e.removeData(dataKey).off(dataKey);
              instance.Dispose();
            }

            if (typeof instance[methodName] === 'undefined') {
              throw new TypeError("No method named \"" + methodName + "\"");
            }

            instance[methodName]();
          }
        });
      }

      $$$1.fn[prototypedName] = prototypable; // pluginName with first capitalized letter - return plugin instance for 1st $selected item

      $$$1.fn[pluginName] = function () {
        return $$$1(this).data(dataKey);
      };

      $$$1.fn[prototypedName].noConflict = function () {
        $$$1.fn[prototypedName] = noConflictPrototypable;
        return prototypable;
      };
    }

    (function (window, $$$1) {
      AddToJQueryPrototype('BsMultiSelect', function (element, optionsObject) {
        var adapter = optionsObject && optionsObject.useCss ? new Bs4AdapterCss($$$1, element, optionsObject) : new Bs4Adapter($$$1, element, optionsObject);
        return new MultiSelect(element, optionsObject, adapter, window, $$$1);
      }, $$$1);
    })(window, $);

})));
//# sourceMappingURL=BsMultiSelect.js.map
