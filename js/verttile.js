(function(orbium) {
	orbium.VertTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, ["verttile"+x], count,
				xnr, ynr);

			this.inducesTopPath = true;
			this.inducesBottomPath = true;
		};

		this.construct.apply(this, arguments);
	}; orbium.VertTile.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
