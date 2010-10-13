(function(orbium) {
	orbium.Transformer = function() {
		var color = null;

		this.construct = function(count, xnr, ynr, vari, col) {
			this.variant = vari;
			color = col;

			orbium.Tile.prototype.construct.call(this, "modtile0", null,
				"transformer"+color, count, xnr, ynr);

			this.inducesTopPath = true;
			this.inducesRightPath = true;
			this.inducesBottomPath = true;
			this.inducesLeftPath = true;
		};

		this.setBase = function() {
			orbium.Tile.prototype.setBase.call(this, "modtile");
		}

		this.transformMarble = function(marble) {
			if (marble.color != color &&
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
	}; orbium.Transformer.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
