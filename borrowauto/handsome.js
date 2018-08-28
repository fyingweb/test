var handsome = window.handsome || {},
	functionBinder = function(a, b) {
		"use strict";
		return function() {
			return a.apply(b, arguments)
		}
	},
	mobileDetect = function() {
		var a = !1;
		return function(b) {
			(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
		}(navigator.userAgent || navigator.vendor || window.opera), a
	};
handsome.Checkbox = function() {
	"use strict";

	function a(a) {
		this.targetCheck = $(a), this.parentWrapper = null, this.checker = null, this.checkClicked = functionBinder(this.checkClicked, this), this.init()
	}
	return a.prototype.init = function() {
		"INPUT" === this.targetCheck.get(0).tagName && "checkbox" === this.targetCheck.attr("type") && (this.targetCheck.parent().hasClass("bt-checkbox") || this.buildOut())
	}, a.prototype.buildOut = function() {
		this.parentWrapper = $(this.targetCheck).wrap('<div class="bt-checkbox"/>').parent(), this.checker = $('<a href="javascript:void(0)" class="bt-checker"/>').appendTo(this.parentWrapper), this.targetCheck.hide(), "checked" === this.targetCheck.attr("checked") && this.checker.addClass("checked"), this.intializeEvents()
	}, a.prototype.intializeEvents = function() {
		this.checker.on("click", this.checkClicked)
	}, a.prototype.checkClicked = function() {
		this.checker.hasClass("checked") ? (this.checker.removeClass("checked"), this.targetCheck.attr("checked", !1)) : (this.checker.addClass("checked"), this.targetCheck.attr("checked", !0))
	}, a
}(), $.fn.checkBox = function(a) {
	"use strict";
	var b = [];
	return this.each(function(c) {
		b[c] = new handsome.Checkbox(this, a)
	})
}, handsome.Radio = function() {
	"use strict";

	function a(a) {
		this.targetRadio = $(a), this.parentWrapper = null, this.radioTrigger = null, this.radioSisters = null, this.fakeRadioSisters = null, this.triggerClicked = functionBinder(this.triggerClicked, this), this.init()
	}
	return a.prototype.init = function() {
		"INPUT" === this.targetRadio.get(0).tagName && "radio" === this.targetRadio.attr("type") && (this.targetRadio.parent().hasClass("bt-radio") || this.buildOut())
	}, a.prototype.buildOut = function() {
		this.parentWrapper = $(this.targetRadio).wrap('<div class="bt-radio"/>').parent(), this.radioTrigger = $('<a href="javascript:void(0)" class="bt-radio-trigger"/>').appendTo(this.parentWrapper), this.targetRadio.hide(), "checked" === this.targetRadio.attr("checked") && this.radioTrigger.addClass("checked"), this.radioSisters = $("input:radio[name='" + this.targetRadio.attr("name") + "']"), this.radioTrigger.attr("data-radioname", this.targetRadio.attr("name")), this.intializeEvents()
	}, a.prototype.intializeEvents = function() {
		this.radioTrigger.on("click", this.triggerClicked)
	}, a.prototype.triggerClicked = function() {
		$(".bt-radio-trigger[data-radioname=" + this.targetRadio.attr("name") + "]").removeClass("checked"), this.radioTrigger.addClass("checked"), this.radioSisters.attr("checked", !1), this.targetRadio.attr("checked", !0)
	}, a
}(), $.fn.radio = function(a) {
	"use strict";
	var b = [];
	return this.each(function(c) {
		b[c] = new handsome.Radio(this, a)
	})
}, handsome.Dropdown = function() {
	"use strict";

	function a(a, b) {
		var c = {
			useNativeMobile: !0,
			width: null
		};
		this.targetSelect = $(a), this.parentWrapper = null, this.dropdownTrigger = null, this.dropdownOptions = null, this.selectOptions = null, this.options = $.extend({}, c, b), this.openDropdown = functionBinder(this.openDropdown, this), this.closeDropdown = functionBinder(this.closeDropdown, this), this.makeSelection = functionBinder(this.makeSelection, this), this.setTitle = functionBinder(this.setTitle, this), this.init();
	}
	return a.prototype.init = function() {
		"SELECT" === this.targetSelect.get(0).tagName && (this.targetSelect.parent().hasClass("bt-dropdown") || this.buildOut());

		var _this = this;
		$(window).scroll(function(){
			_this.parentWrapper.removeClass('open').addClass('closed');
		});

	}, a.prototype.buildOut = function() {
		var a = this,
			b = null;
		this.parentWrapper = $(this.targetSelect).wrap('<div class="bt-dropdown" tabindex="' + this.targetSelect.attr("tabindex") + '"/>').parent(), this.dropdownTrigger = $('<a class="bt-dropdown-toggle" href="javascript:void(0)">' + this.targetSelect.find("option:selected").text() + '<span class="icon"></span></a>').appendTo(this.parentWrapper), this.selectOptions = this.targetSelect.find("option"), this.dropdownOptions = $('<ul class="bt-dropdown-options"></ul>').appendTo(this.parentWrapper), $(this.selectOptions).each(function() {
			$('<li class="bt-dropdown-option"><a href="javascript:void(0)" data-value="' + $(this).val() + '">' + $(this).text() + "</a></li>").appendTo(a.dropdownOptions)
		}), b = this.options.width || this.targetSelect.outerWidth(), this.dropdownTrigger.width(b), this.parentWrapper.addClass("initialized"), this.parentWrapper.addClass("closed"), mobileDetect() === !0 && this.options.useNativeMobile === !0 ? (this.parentWrapper.addClass("mobile"), this.targetSelect.width(this.parentWrapper.width()), this.targetSelect.height(this.parentWrapper.height())) : this.parentWrapper.addClass("notMobile"), this.intializeEvents()
	}, a.prototype.intializeEvents = function() {
		this.dropdownTrigger.on("click", this.openDropdown), this.parentWrapper.on("blur", this.closeDropdown), this.dropdownOptions.find("li a").on("click", {
			target: this
		}, this.makeSelection), this.targetSelect.on("change", this.setTitle)
	}, a.prototype.setTitle = function() {
		this.dropdownTrigger.html(this.targetSelect.find("option:selected").text() + '<span class="icon"></span>')
	}, a.prototype.openDropdown = function(e) {

		e.stopPropagation();

		if(this.parentWrapper.hasClass('open')){
			this.parentWrapper.removeClass("open");
			this.parentWrapper.addClass("closed");
		}else{
			$('.bt-dropdown').removeClass("open").addClass("closed");
			this.parentWrapper.removeClass("closed");
			this.parentWrapper.addClass("open");

			var _this = this, flag = true;
			$(document).on('click', function(e){
				if(flag){
					_this.parentWrapper.removeClass("open");
					_this.parentWrapper.addClass("closed");
					flag = false;
				}
			})
		}

	}, a.prototype.closeDropdown = function() {
		this.parentWrapper.removeClass("open"), this.parentWrapper.addClass("closed")
	}, a.prototype.makeSelection = function(a) {
		var b = null;
		this.targetSelect.get(0).value = $(a.target).data("value"), b = $(a.target).parent().index(), this.targetSelect.find("option").get(b).selected = "selected", this.targetSelect.trigger("change"), this.closeDropdown()
	}, a
}(), $.fn.dropDown = function(a) {
	"use strict";
	var b = [];
	return this.each(function(c) {
		b[c] = new handsome.Dropdown(this, a)
	})
};