(function($) {

var queue = [];
var pending = 0;

var _ajax = $.ajax;

$.ajax = function(options) {
	var _complete = options.complete;
	var callback = function(xhr, status) {
		pending--;
		if(_complete) {
			_complete.apply(this, arguments); // XXX: exception can halt queue
		}
		dispatch();
	};
	options.complete = callback;
	queue.push(options);
	dispatch();
};

var dispatch = function() {
	if(pending < 2 && queue.length) {
		pending++;
		var options = queue.shift();
		_ajax.apply($, [options]);
	}
};

})(jQuery);
