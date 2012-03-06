function log(m) {
	console.log(m);
	$("#log").append('<div>' + m + '</div>');
}

$(function() {	
	var C_MAX_SHADOW = 10;	
	$(window).mousemove(function(e) {
		var px = e.clientX;
		var py = e.clientY;
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		$(".shadower").each(function() {
			var cx = $(this).offset().left + $(this).width() / 2;
			var cy = $(this).offset().top + $(this).height() / 2;			
			var dx = (cx - px);
			var dy = (cy - py);
			var max = (Math.abs(dx) > Math.abs(dy)) ? Math.abs(dx) : Math.abs(dy);

			function law(x) {
				var y = x;
				return y;
			}

			dx = dx * C_MAX_SHADOW / windowWidth ;  
			dy = dy * C_MAX_SHADOW / windowHeight;  
			dx = law(dx);
			dy = law(dy);
			if ($(this).hasClass("block")) $(this).css("box-shadow", dx + "px " +  dy +  "px 2px #aaa");
			if ($(this).hasClass("text")) $(this).css("text-shadow", dx + "px " +  dy +  "px 2px #aaa");

		});
	})
});