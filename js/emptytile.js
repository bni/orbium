(function(orbium, undefined) {
	orbium.EmptyTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(6);

			orbium.Tile.prototype.construct.call(this, ["emptytile"+x], count,
				xnr, ynr);
		};

		this.construct.apply(this, arguments);
	};

	orbium.EmptyTile.prototype = new orbium.Tile();
	orbium.EmptyTile.prototype.constructor = orbium.EmptyTile;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
