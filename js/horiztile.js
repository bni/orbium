(function(orbium) {
	orbium.HorizTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, "horiztile"+x, null,
				null, count, xnr, ynr);

			this.inducesRightPath = true;
			this.inducesLeftPath = true;
		};
	}; orbium.HorizTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
