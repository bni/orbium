(function(orbium, undefined) {
	orbium.Clock = function(count, xnr, ynr) {
		var t = null;
		var frame = null;
		var maxSeconds = null;

		this.construct = function() {
			t = 0;
			frame = 0;

			var idx = orbium.Machine.horizTiles*orbium.Machine.vertTiles+2;
			var units = orbium.level[orbium.machine.levnr][idx];
			maxSeconds = (units+1)*90;

			orbium.Tile.prototype.construct.call(this, ["clock0"], count,
				xnr, ynr);
		};

		this.update = function(dt) {
			if (orbium.Machine.timeLimits) {
				t += dt;
			}

			for (var i = 10; i >= 0; i--) {
				if (t >= maxSeconds/10*i && frame === i-1) {
					frame++;
					this.setImage(0, "clock"+frame);
					this.invalidate();
				}
			}

			if (t >= maxSeconds) {
				orbium.machine.failLevel("LEVEL TIME EXPIRED!");
			}
		};

		this.construct.apply(this, arguments);
	};

	orbium.Clock.prototype = new orbium.Tile();
	orbium.Clock.prototype.constructor = orbium.Clock;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
