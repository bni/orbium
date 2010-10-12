(function(orbium) {
	orbium.Clock = function() {
		var t = null;
		var frame = null;
		var maxSeconds = null;

		this.construct = function(count, xnr, ynr) {
			t = 0;
			frame = 0;

			var units = orbium.level[orbium.machine.levnr][orbium.Machine.horizTiles*orbium.Machine.vertTiles+2];
			maxSeconds = (units+1)*90;

			orbium.Tile.prototype.construct.call(this, "clock0", null, null,
				count, xnr, ynr);
		};

		this.update = function(dt) {
			if (orbium.Machine.timeLimits) {
				t += dt;
			}

			for (var i=10; i>=0; i--) {
				if (t >= maxSeconds/10*i && frame == i-1) {
					frame++;
					this.setImage1("clock"+frame);
					this.invalidate();
				}
			}

			if (t >= maxSeconds) {
				orbium.machine.failLevel("LEVEL TIME EXPIRED!");
			}
		};
	}; orbium.Clock.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
