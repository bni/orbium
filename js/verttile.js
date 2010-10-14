(function(orbium) {
	orbium.VertTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, "verttile"+x, null, null,
				count, xnr, ynr);

			this.inducesTopPath = true;
			this.inducesBottomPath = true;
		};
	}; orbium.VertTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
