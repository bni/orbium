(function(orbium, undefined) {
	orbium.CrossTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(4);

			orbium.Tile.prototype.construct.call(this, ["crosstile"+x], count,
				xnr, ynr);

			this.inducesPaths = [true, true, true, true];
		};

		this.construct.apply(this, arguments);
	};

	orbium.CrossTile.prototype = new orbium.Tile();
	orbium.CrossTile.prototype.constructor = orbium.CrossTile;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
