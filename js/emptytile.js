(function(orbium) {
	orbium.EmptyTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = orbium.Util.generateRandomIndex(6);

			orbium.Tile.prototype.construct.call(this, "emptytile"+x, null,
				null, count, xnr, ynr);
		};
	}; orbium.EmptyTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
