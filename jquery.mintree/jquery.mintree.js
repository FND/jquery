/*jslint vars: true, unparam: true, white: true */
/*global jQuery */

jQuery.fn.mintree = (function($) {

"use strict";

var glyphs = { // TODO: configurable
	open: "▹",
	closed: "▿"
};

var onToggle, injectToggle;

var mintree = function(i, node) {
	var el = $(node).addClass("mintree");
	$("li", node).each(injectToggle);
	el.on("click", "a.toggle", onToggle);
};

onToggle = function(ev) { // TODO: option to exclude individual lists
	var desc = $(this).closest("li").children("ul, ol"); // XXX: use of `children` disallows wrappers
	desc.toggle();
};

injectToggle = function(i, node) { // TODO: option to exclude individual lists
	$('<a href="javascript:;" class="toggle" />').text(glyphs.open).
			prependTo(node);
};

return function() {
	this.each(mintree);
	return this;
}; // TODO: expose internal functions?

}(jQuery));
