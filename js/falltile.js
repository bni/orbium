(function(orbium) {
	orbium.FallTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, "verttile"+x, null,
				null, count, xnr, ynr);

			this.inducesSink = true;

			this.inducesTopPath = true;
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

		this.construct.apply(this, arguments);
	}; orbium.FallTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
