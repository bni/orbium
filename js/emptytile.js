(function(orbium) {
	orbium.EmptyTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = 0;

			var rand = Math.random();
			if (rand < 1/7) {
				x = 0;
			} else if (rand < 2/7) {
				x = 1;
			} else if (rand < 3/7) {
				x = 2;
			} else if (rand < 4/7) {
				x = 3;
			} else if (rand < 5/7) {
				x = 4;
			} else if (rand < 6/7) {
				x = 5;
			} else {
				x = 6;
			}

			orbium.Tile.prototype.construct.call(this, "emptytile"+x, null,
				null, count, xnr, ynr);
		};
	}; orbium.EmptyTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
