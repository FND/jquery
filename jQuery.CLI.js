/*
jQuery.CLI v0.1
pluggable command-line interface

Author: FND
License: BSD (http://www.opensource.org/licenses/bsd-license.php)
Source: http://github.com/FND/jquery/

To Do:
* documentation
*/

(function($) {

$.ExMode = function(cmds, options) { // TODO: rename?
	// TODO: merge commands and options
	$(document).bind("keypress", null, function(e) {
		if($.ExMode.blocked()) { // XXX: hacky?
			return true;
		} else if(e.which == $.ExMode.options.keys.trigger) {
			$.ExMode.init();
		}
	});
};

$.ExMode.init = function() { // TODO: rename?
	var container = $("#CLI");
	if(container.length) {
		container.find("input").focus();
	} else {
		container = $("<div id='CLI' />").
			css($.ExMode.options.styles.shared).
			css($.ExMode.options.styles.container).
			appendTo(document.body);
		$("<input type='text' />").
			keypress(function(e) {
				var key = e.keyCode || e.which; // XXX: keyCode required for ESC!?
				var keys = $.ExMode.options.keys;
				switch(key) {
					case keys.confirm:
						dispatch(this.value);
					case keys.confirm:
					case keys.abort:
						$(this).parent().remove();
						break;
					default:
						break;
				}
			}).
			css($.ExMode.options.styles.shared).
			css($.ExMode.options.styles.input).appendTo(container).focus();
	}
};

// invoke command
var dispatch = function(cmd) {
	var params = String.prototype.readBracketedList ? cmd.readBracketedList() : cmd.split(" "); //# readBracketedList is TiddlyWiki-specific
	cmd = $.ExMode.commands[params.shift()];
	if(cmd) {
		cmd(params);
	} else {
		bell();
	}
}

// visual bell -- XXX: bloat?
var bell = function() {
	$("<div />").
		css($.ExMode.options.styles.cloak).
		appendTo(document.body).
		animate({ opacity: 0.1 }, {
			duration: 10,
			complete: function() { $(this).remove(); }
		});
};

// placeholder method -- XXX: required? -- TODO: rename
$.ExMode.blocked = function() {
	return false;
};

// default commands
$.ExMode.commands = {
	print: function(params, place) { $(document.body).prepend(params.join(" ")); } // placeholder command
};

// default options
$.ExMode.options = { // TODO: rename to .defaults
	keys: {
		trigger: 58, // colon (charCode) -- TODO: rename
		confirm: 13, // ENTER (keyCode) -- XXX: TiddlyWiki also uses keycode 10!?
		abort: 27 // ESC (keyCode)
	},
	styles: {
		shared: {
			width: "100%",
			color: "#0F0",
			backgroundColor: "#000"
		},
		container: {
			position: "absolute",
			top: "0",
			left: "0",
			padding: "5px 0"
		},
		input: {
			border: "none"
		},
		cloak: {
			position: "absolute",
			top: 0,
			left: 0,
			width: $(document).attr("width"), // XXX: time of calculation relevant!
			height: $(document).attr("height"), // XXX: time of calculation relevant!
			backgroundColor: "#000"
		}
	}
};

})(jQuery);

jQuery.ExMode(); // DEBUG
