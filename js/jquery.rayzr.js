(function( $ ){		
	// drfault config
  	var cfg = {			
		rayImage: 'images/ray3.png',
		segmentsCount: 32,
		rayHeight: 80,
		rayMinEndHeight: 20,
		center: {x: -1, y: -1}
	}			

  	$.fn.rayzr = function($userConfig) {
	  	var $pane = this;
	  	cfg = $.extend(cfg, $userConfig);

	  	// we need to place rays on a circle. We can count circle radius from known aproximate perimetr: count_of_rays * ray_width = 2 * Pi * R
	  	// R = count_of_rays * ray_width / Pi / 2
	  	// offset (equal to diametr). We need offser to detect 'real' center of the screen
	  	var offset = cfg.segmentsCount * cfg.rayMinEndHeight / Math.PI; 
		var $paneW = $pane.width() + offset;
		var $paneH = $pane.height();
		var sectorAngle = 360 / cfg.segmentsCount;		

		// prepare center coordinates
		Yc = (cfg.center.y == -1) ? $paneH / 2 : cfg.center.y; 
		Xc = (cfg.center.x == -1) ? $paneW / 2 : cfg.center.x;
		var R = Yc;

		var existingRaysCount = $(".ray", this).length;

		// add rays if we need more
		if (existingRaysCount < cfg.segmentsCount) {
			for (var i = 0; i < cfg.segmentsCount - existingRaysCount; i++) {									
				var $ray = $("<div class='ray'></div>");
				$ray.css("background-image", "url('"+cfg.rayImage+"')");
				$pane.append($ray);
			}
		// remove rays if we need less
		} else if (existingRaysCount > cfg.segmentsCount) {
			for (var i = 0; i < existingRaysCount - cfg.segmentsCount; i++) { 				
				$(".ray:first", this).remove();
			}
				
		}		

		var i = 0;
		// rotate and recoutn coordinates of ray
		$(".ray", this).each(function() {												
			i++;
			$ray = $(this);
			var angle = (i) * sectorAngle;						
			$pane.append($ray);				
			var W = $ray.width() + offset;
			var H = $ray.height();
			var angleR = angle * Math.PI / 180;
			var x1 = 0, y1 = 0; x0 = W / 2; y0 = H / 2;
			var x2 = x0 + (x1 - x0) * Math.cos(angleR) - (y1 - y0) * Math.sin(angleR);
			var y2 = y0 + (x1 - x0) * Math.sin(angleR) + (y1 - y0) * Math.cos(angleR);
			$ray.css({height: cfg.rayHeight}).css({bottom: ($paneH - Yc) - y2 - Math.cos(angleR) * cfg.rayHeight /2 }).css({left: Xc - x2 + Math.sin(angleR) * cfg.rayHeight / 2});			
			$ray.css("-webkit-transform", "rotate(-"+angle+"deg)");
		});
  	};
})(jQuery);