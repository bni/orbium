(function(orbium, undefined) {
	orbium.Transformer = function(count, xnr, ynr, vari, col) {
		var color = null;

		this.construct = function() {
			this.variant = vari;
			color = col;

			orbium.Tile.prototype.construct.call(this, ["modtile0", null,
				"transformer"+color], count, xnr, ynr);

			this.inducesPaths = [true, true, true, true];
		};

		this.setBase = function() {
			orbium.Tile.prototype.setBase.call(this, "modtile");
		};

		this.influence = function(marble) {
			if (marble.color !== color &&
				orbium.Util.withinRect(
				marble.xpos+orbium.Marble.size/2,
				marble.ypos+orbium.Marble.size/2,
				this.xpos+orbium.Tile.size/2-orbium.Marble.size/2,
				this.ypos+orbium.Tile.size/2-orbium.Marble.size/2,
				orbium.Marble.size,
				orbium.Marble.size)) {
				marble.color = color;
			}
		};

		this.construct.apply(this, arguments);
	};

	orbium.Transformer.prototype = new orbium.Tile();
	orbium.Transformer.prototype.constructor = orbium.Transformer;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
