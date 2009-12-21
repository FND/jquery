(function($) {

// creates and then select elements
// useful in combination with jQuery's end method for dynamically generating
// nested elements within a chain of operations
$.fn.attach = function(html) {
	return this.append(html).children(":last");
};

// appends multiple elements generated from data array
// generator function is passed data item and index, must return a jQuery object
$.fn.multipend = function(items, generator) { // TODO: rename
	return this.append($.map(items, function(item, i) {
		return generator.apply(this, arguments)[0];
	}));
};

)(jQuery);
