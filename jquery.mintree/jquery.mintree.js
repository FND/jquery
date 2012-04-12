/*jslint vars: true, unparam: true, white: true */
/*global jQuery */

jQuery.fn.mintree = (function($) {

"use strict";

function MinTree(root, options) {
	this.options = $.extend({}, this.defaults, options);
	var el = $(root).addClass("mintree"),
		self = this;
	$("li", root).each(function(i, node) {
		self.injectToggle(node);
	});
	el.on("click", "a.toggle", this.onToggle);
}
MinTree.prototype = {
	defaults: {
		glyphs: {
			open: "▹",
			closed: "▿"
		}
	},
	onToggle: function(ev) { // TODO: option to exclude individual lists
		$(this).closest("li").children("ul, ol").toggle(); // XXX: use of `children` disallows wrappers
	},
	injectToggle: function(node) { // TODO: option to exclude individual lists
		$('<a href="javascript:;" class="toggle" />').
				text(this.options.glyphs.open).
				prependTo(node);
	}
};

return function(options) {
	this.each(function(i, node) {
		new MinTree(node, options);
	});
	return this;
}; // TODO: expose internal functions?

}(jQuery));
