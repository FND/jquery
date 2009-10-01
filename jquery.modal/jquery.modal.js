(function($) {

$.modal = function(html, options) {
	options = options || {};
	var dialog_width = options.width || 400;
	var dialog_height = options.height || 300;
	var fade_duration = options.fade || "slow";
	var cushion_size = 20000;
	var zIndex = 999998;
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	$("#modalMask, #modalDialog").remove();
	$('<div id="modalMask" />').
		css({
			display: "none",
			position: "absolute",
			top: -cushion_size,
			left: -cushion_size,
			zIndex: zIndex,
			height: 2 * cushion_size + winHeight,
			width: 2 * cushion_size + winWidth,
			background: "#999", // TODO: customizable
			opacity: 0.85 // TODO: customizable?
		}).
		click(function(ev) { closeModal(ev); }).
		appendTo(document.body).
		fadeIn(fade_duration);
	$('<div id="modalDialog" />').
		css({
			display: "none",
			position: "absolute",
			top: $(document.body).scrollTop() + winHeight / 2 - dialog_height / 2,
			left: winWidth / 2 - dialog_width / 2,
			zIndex: zIndex + 1,
			width: dialog_width,
			height: dialog_height,
			border: "1px solid #666", // TODO: customizable
			background: "#fff" // TODO: customizable
		}).
		attach("<div />").css({ margin: "10px" }).html(html).end().
		attach("<div>X</div>"). // XXX: blergh!
			css({
				position: "absolute",
				top: "-1.2em",
				right: "5px",
				cursor: "pointer"
			}).
			click(function(ev) { closeModal(ev); }).
			end().
		appendTo(document.body).
		slideDown(fade_duration); // using slide because simultaneous fade with mask is awkward
	var closeModal = function(ev) {
		ev.stopPropagation();
		var remove = function() { $(this).remove(); };
		$("#modalDialog").slideUp(fade_duration, remove);
		$("#modalMask").fadeOut(fade_duration, remove);
	};
};

$.fn.attach = function(html) {
	return this.append(html).children(":last");
};

})(jQuery);
