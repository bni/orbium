(function(orbium, undefined) {
	orbium.HorizTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, ["horiztile"+x], count,
				xnr, ynr);

			this.inducesRightPath = true;
			this.inducesLeftPath = true;
		};

		this.construct.apply(this, arguments);
	}; orbium.HorizTile.prototype = new orbium.Tile();
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
