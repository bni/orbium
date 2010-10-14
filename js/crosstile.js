(function(orbium) {
	orbium.CrossTile = function() {
		this.construct = function(count, xnr, ynr) {
			var x = orbium.Util.generateRandomIndex(4);

			orbium.Tile.prototype.construct.call(this, "crosstile"+x, null,
				null, count, xnr, ynr);

			this.inducesTopPath = true;
			this.inducesRightPath = true;
			this.inducesBottomPath = true;
			this.inducesLeftPath = true;
		};
	}; orbium.CrossTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
