/*jslint vars: true, unparam: true, browser: true, white: true */
/*global jQuery */

(function($) {

"use strict";

var onEnter, onLeave, startTimer, stopTimer, remove, getPos;

var defaults = {
	delay: 500,
	content: null,
	allowHTML: false  // XXX: rename
};

$.fn.mintip = function(options) {
	options = $.extend({}, defaults, options);
	var tips = this.map(function(i, node) {
		var origin = $(node);
		var tip = $('<div class="mintip" />');
		var content = options.content || origin.data("tooltip"); // XXX: precedence?
		var method = options.allowHTML ? "html" : "text";
		tip[method](content);
		tip.data("delay", options.delay);
		origin.data("mintip", tip);
		return tip[0];
	});
	// XXX: regular handler binding inefficient; use `live` or `delegate`!?
	this.mouseenter(onEnter).mouseleave(onLeave);
	$(tips).mouseenter(stopTimer).mouseleave(onLeave);
	return this;
};

onEnter = function(ev) {
	var origin = $(this);
	var tip = origin.data("mintip");
	stopTimer(tip);
	var pos = $.extend({ position: "absolute" }, getPos(origin));
	tip.removeAttr("style").css(pos).appendTo(document.body);
	var rightEdge = tip.offset().left + tip.outerWidth(true);
	if(rightEdge >= $(document).width()) {
		delete pos.left;
		pos.right = 0;
		tip.removeAttr("style").css(pos);
	}
};

// NB: magically handles both origins' and tooltips' event
onLeave = function(ev) {
	var node = $(this);
	var tip = node.data("mintip") || node;
	startTimer(tip);
};

startTimer = function(el) {
	var delay = el.data("delay");
	var timer = setTimeout(remove(el), delay);
	el.data("timer", timer);
};

// NB: can also be used as event handler
stopTimer = function(el) {
	el = el.originalEvent ? $(this) : el; // event handler overloading
	var timer = el.data("timer");
	clearTimeout(timer);
	el.removeData("timer");
};

// proxy for deferred removal
remove = function(el) {
	return function(timeoutID) { // NB: timeoutID must not be passed on
		el.detach(); // needs to retain attached delay data
	};
};

// determine tooltip position based on origin
getPos = function(el) {
	var pos = el.offset();
	pos.top += el.height();
	pos.left += el.width() / 2;
	return pos;
};

}(jQuery));
