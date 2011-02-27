(function(orbium) {
	orbium.CrossTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(4);

			orbium.Tile.prototype.construct.call(this, ["crosstile"+x], count,
				xnr, ynr);

			this.inducesTopPath = true;
			this.inducesRightPath = true;
			this.inducesBottomPath = true;
			this.inducesLeftPath = true;
		};

		this.construct.apply(this, arguments);
	}; orbium.CrossTile.prototype = new orbium.Tile();
}(orbium));
