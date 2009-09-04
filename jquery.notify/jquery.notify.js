/*
jQuery.notify v0.1.0
minimalistic notification driver

Author: FND (http://fnd.lewcid.org)
License: BSD (http://www.opensource.org/licenses/bsd-license.php)
Source: http://github.com/FND/jquery

To Do:
* code sanitizing
* documentation
* rename (possible clash existing plugin)?
* log events
* tests
*/

(function($) {

$.notify = function(msg, options) {
	var opts = $.extend({}, $.notify.defaults, options);
	var container = $("#notifications");
	if(!container.length) { // XXX: awkward / inefficient!? -- initialize on document.ready?
		container = $('<ul id="notifications" />'). // XXX: unnecessarily complicates styling!?
			css(opts.css). // XXX: use jQuery.twStylesheet?
			appendTo(document.body);
	}
	var el = $('<li class="notification" />').
		data("animationSpeed", opts.animationSpeed).
		click(removeNotification).
		hide().
		appendTo(container).
		fadeIn(opts.animationSpeed);
	if(opts.html) {
		el.append(msg);
	} else {
		el.text(msg);
	}
	if(opts.expirationDelay) {
		setTimeout(function() { removeNotification(null, el); }, opts.expirationDelay);
	}
};

$.notify.defaults = {
	animationSpeed: "slow", // XXX: YAGNI!?
	expirationDelay: null, // XXX: rename? -- TODO: default time (cf. animationSpeed)
	html: false,
	css: { // XXX: obsolete?
		position: "fixed", // XXX: unsupported by IE
		top: "0",
		right: "0"
	}
};

var removeNotification = function(ev, el) {
	el = el ? $(el) : $(this);
	var speed = el.data("animationSpeed");
	el.closest(".notification").
		slideUp(speed, function() { $(this).remove(); });
	return false;
};

})(jQuery);
