(function(orbium) {
	orbium.EmptyTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(6);

			orbium.Tile.prototype.construct.call(this, ["emptytile"+x], count,
				xnr, ynr);
		};

		this.construct.apply(this, arguments);
	}; orbium.EmptyTile.prototype = new orbium.Tile();
}(typeof window != undefined ? window.orbium = window.orbium || {} : orbium));
