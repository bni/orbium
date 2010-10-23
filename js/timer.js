(function(orbium) {
	orbium.Timer = function() {
		var speed = null;

		this.construct = function() {
			var xpos = orbium.width;
			var ypos = 0;

			var units = orbium.level[orbium.machine.levnr][orbium.Machine.horizTiles*orbium.Machine.vertTiles+1];
			var maxSeconds = (units+1)*3;

			speed = Math.round(orbium.width/maxSeconds);

			orbium.Sprite.prototype.construct.call(this, "timer0", null, null,
				xpos, ypos, orbium.Tile.size, orbium.Bar.height, 4);
		};

		this.reset = function() {
			this.xpos = orbium.width;
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

			for (var i=orbium.Machine.horizTiles; i>=0; i--) {
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
			if (orbium.has_canvas) {
				var trailBegin = this.xpos+orbium.Tile.size;

				for (var i=orbium.Machine.horizTiles; i>=0; i--) {
					if (trailBegin < orbium.Tile.size*i) {
						var trailEnd = orbium.Tile.size*i;
					}
				}

				var w = trailEnd-trailBegin;

				if (w > 0) {
					orbium.ctx.drawImage(orbium.loader["timer1"], Math.round(trailBegin), Math.round(this.ypos), Math.round(w), orbium.Bar.height);
				}
			} else {
				// TODO
			}
		}

		this.construct.apply(this, arguments);
	}; orbium.Timer.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));
