(function(orbium, undefined) {
	orbium.VertTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, ["verttile"+x], count,
				xnr, ynr);

			this.inducesPaths = [true, false, true, false];
		};

		this.construct.apply(this, arguments);
	};

	orbium.VertTile.prototype = new orbium.Tile();
	orbium.VertTile.prototype.constructor = orbium.VertTile;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
