(function(orbium) {
	orbium.HorizTile = function() {
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

			orbium.Tile.prototype.construct.call(this, "horiztile"+x, null,
				null, count, xnr, ynr);

			this.inducesRightPath = true;
			this.inducesLeftPath = true;
		};
	}; orbium.HorizTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
