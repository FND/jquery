/*
jQuery.CLI v0.2.2
pluggable command-line interface

Author: FND (http://fnd.lewcid.org/blog/)
License: BSD (http://www.opensource.org/licenses/bsd-license.php)
Source: http://github.com/FND/jquery/

To Do:
* documentation
* output buffer
* command history
* support for auto-completion
* Quake-like dropdown console
*/

(function($) {

var cmds, styles, keys;

$.CLI = function(commands, options) {
	cmds = $.extend({}, $.CLI.defaults.commands, commands);
	styles = $.extend({}, $.CLI.defaults.styles, options ? options.styles : null);
	keys = $.extend({}, $.CLI.defaults.keys, options ? options.keys : null);
	$(document).keypress(function(e) {
		// suppress custom keyboard events for input fields
		if($.inArray(e.target.nodeName.toUpperCase(), ["INPUT", "TEXTAREA"]) != -1) {
			return true;
		} else if(e.which == keys.trigger) {
			$.CLI.init();
		}
	});
};

$.CLI.init = function() { // TODO: rename to toggle?
	var container = $("#CLI");
	if(container.length) {
		container.find("input").focus();
	} else {
		container = $("<div id='CLI' />").
			css(styles.shared).css(styles.container).
			appendTo(document.body);
		$("<input type='text' />").
			css(styles.shared).css(styles.input).
			keypress(function(e) {
				var key = e.keyCode || e.which; // XXX: keyCode required for ESC!?
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
			appendTo(container).focus();
	}
};

// invoke command
var dispatch = function(cmd) {
	var params = String.prototype.readBracketedList ? cmd.readBracketedList() : cmd.split(" "); //# readBracketedList is TiddlyWiki-specific
	cmd = cmds[params.shift()];
	if(cmd) {
		cmd(params);
	} else {
		bell();
	}
};

// visual bell -- XXX: bloat? optional?
var bell = function() {
	$("<div />").
		css(styles.cloak).css({
			width: $(window).width(),
			height: $(window).height()
		}).
		appendTo(document.body).
		animate({ opacity: 0.1 }, {
			duration: 50,
			complete: function() { $(this).remove(); }
		});
};

// default options
$.CLI.defaults = {
	commands: {
		print: function(params, place) { $(document.body).prepend(params.join(" ")); }
	},
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
			backgroundColor: "#000"
		}
	}
};

})(jQuery);
