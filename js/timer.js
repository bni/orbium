(function(orbium) {
	orbium.Timer = function() {
		var speed = null;
		var timerGap = null;

		this.construct = function() {
			var xpos = orbium.width;
			var ypos = 0;

			var units = orbium.level[orbium.machine.levnr][orbium.Machine.horizTiles*orbium.Machine.vertTiles+1];
			var maxSeconds = (units+1)*3;

			speed = Math.round(orbium.width/maxSeconds);

			var images = ["timer0"];
			orbium.Sprite.prototype.construct.call(this, images, xpos, ypos,
				orbium.Tile.size, orbium.Bar.height, 4);

			if (!orbium.has_canvas) {
				var id = "timer_gap";

				var sprite = document.createElement("div");
				sprite.id = id;

				if (orbium.has_transform) {
					sprite.style.webkitTransform = "translate3d("+xpos+"px,"+
						ypos+"px,0px)";
				} else {
					sprite.style.left = xpos+"px";
					sprite.style.top = ypos+"px";
				}

				sprite.style.position = "absolute";
				sprite.style.padding = "0px";
				sprite.style.margin = "0px";
				sprite.style.backgroundRepeat = "no-repeat";
				sprite.style.width = orbium.Tile.size+"px";
				sprite.style.height = orbium.Bar.height+"px";

				sprite.style.zIndex = 4;

				sprite.style.backgroundImage = "url("+
					orbium.gfx_path+"timer1.png)";

				orbium.pane.appendChild(sprite);

				timerGap = document.getElementById(id);
			}
		};

		this.destruct = function() {
			if (!orbium.has_canvas) {
				orbium.pane.removeChild(timerGap);
			}

			orbium.Sprite.prototype.destruct.call(this);
		};

		this.reset = function() {
			this.xpos = orbium.width;

			if (!orbium.has_canvas) {
				if (orbium.has_transform) {
					timerGap.style.webkitTransform = "translate3d("+
						Math.round(orbium.width)+"px,"+Math.round(this.ypos)+
						"px,0px)";
				} else {
					timerGap.style.left = Math.round(orbium.width)+"px";
				}
			}
		};

		this.update = function(dt) {
			// Sometimes there can be a scheduling delay resulting in a large
			// movement of the timer, we want to filter those out
			if (speed*dt > orbium.Marble.size/2) {
				return;
			}

			if (orbium.Machine.timeLimits) {
				this.xpos -= speed*dt;
			}

			for (var i = orbium.Machine.horizTiles; i >= 0; i--) {
				if (this.xpos < orbium.Tile.size*i) {
					orbium.machine.lane.setTimerStage(i+1);
				}
			}

			if (this.xpos <= 0) {
				orbium.machine.failLevel("ORB TIME EXPIRED!");
			}

			this.invalidate();
		};

		this.draw = function(idx) {
			// We override draw here, first we call the base class implementation
			orbium.Sprite.prototype.draw.call(this, idx);

			// We need to fill the gap here
			var trailBegin = this.xpos+orbium.Tile.size;

			for (var i = orbium.Machine.horizTiles; i >= 0; i--) {
				if (trailBegin < orbium.Tile.size*i) {
					var trailEnd = orbium.Tile.size*i;
				}
			}

			var w = trailEnd-trailBegin;

			if (w > 0) {
				if (orbium.has_canvas) {
					orbium.ctx.drawImage(
						orbium.loader["timer1"],
						Math.round(trailBegin),
						Math.round(this.ypos),
						Math.round(w),
						orbium.Bar.height);
				} else {
					if (orbium.has_transform) {
						timerGap.style.webkitTransform = "translate3d("+
							Math.round(trailBegin)+"px,"+Math.round(this.ypos)+
							"px,0px)";
					} else {
						timerGap.style.left = Math.round(trailBegin)+"px";
						timerGap.style.top = Math.round(this.ypos)+"px";
					}

					timerGap.style.width = Math.round(w)+"px";
				}
			}
		}

		this.construct.apply(this, arguments);
	}; orbium.Timer.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));
