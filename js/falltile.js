(function(orbium) {
	orbium.FallTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = 0;

			var rand = Math.random();
			if (rand < 1/6) {
				x = 0;
			} else if (rand < 2/6) {
				x = 1;
			} else if (rand < 3/6) {
				x = 2;
			} else if (rand < 4/6) {
				x = 3;
			} else if (rand < 5/6) {
				x = 4;
			} else {
				x = 5;
			}

			orbium.Tile.prototype.construct.call(this, "verttile"+x, null,
				null, count, xnr, ynr);
		};

		this.fallMarble = function(marble) {
			marble.xpos = this.xpos+orbium.Tile.size/2-orbium.Marble.size/2;
			marble.ypos = this.ypos-orbium.Marble.size;
			marble.direction = 2;
		};

		this.bounceBackMarble = function(marble) {
			if (marble.direction == 0 &&
				orbium.Util.withinRect(
				marble.xpos+orbium.Marble.size/2,
				marble.ypos+orbium.Marble.size,
				this.xpos+orbium.Tile.size/2-orbium.Marble.size/2,
				this.ypos,
				orbium.Marble.size,
				orbium.Marble.size)) {
				marble.bounce();
			}
		};
	}; orbium.FallTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
