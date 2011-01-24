(function($) {

var _ajax = $.ajax;
$.ajax = function(options) {
	if(options && $.inArray(options.type, ["PUT", "DELETE"]) != -1) {
		var method = options.type;
		var setup = options.beforeSend;
		options.type = "POST";
		options.beforeSend = function(xhr) {
			xhr.setRequestHeader("X-HTTP-Method", method);
			return setup ? setup.apply(this, arguments) : true;
		};
	}
	_ajax.apply(this, arguments);
};

})(jQuery);
