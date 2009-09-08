// TODO:
// * implement as easing effect?
// * support for object (CSS properties) as target
// * support for selectors as target
// * support for multiple source elements
// * alternative visuals (cf. old TiddlyWiki implementation)

jQuery.fn.zoomer = function(target, options) { // XXX: rename args
	var opts = $.extend({}, options);
	var text = opts.text || this.text();
	var duration = opts.duration || "slow";

	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var determineStyle = function(el) {
		el = $(el);
		var pos = el.position();
		return {
			position: "absolute",
			top: pos.top,
			left: pos.left,
			width: el.innerWidth(),
			height: el.innerHeight()
		};
	};
	startStyles = determineStyle(this[0]);
	endStyles = determineStyle(target);
	endStyles.fontSize = $(target).css("font-size");
	endStyles.opacity = 0.1;

	return this.clone().
		css(startStyles).
		appendTo(document.body).
		animate(endStyles, {
			duration: duration,
			complete: function() { $(this).remove(); }
		});
};
