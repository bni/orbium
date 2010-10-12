(function(orbium) {
	orbium.CrossTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = 0;

			var rand = Math.random();
			if (rand < 1/5) {
				x = 0;
			} else if (rand < 2/5) {
				x = 1;
			} else if (rand < 3/5) {
				x = 2;
			} else if (rand < 4/5) {
				x = 3;
			} else {
				x = 4;
			}

			orbium.Tile.prototype.construct.call(this, "crosstile"+x, null,
				null, count, xnr, ynr);
		};
	}; orbium.CrossTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
