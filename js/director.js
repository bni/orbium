(function(orbium) {
	orbium.Director = function(count, xnr, ynr, dir) {
		var direction = null;

		this.construct = function() {
			direction = dir;

			orbium.Tile.prototype.construct.call(this, "modtile0", null,
				"director"+direction, count, xnr, ynr);

			this.inducesTopPath = true;
			this.inducesRightPath = true;
			this.inducesBottomPath = true;
			this.inducesLeftPath = true;
		};

		this.setBase = function() {
			orbium.Tile.prototype.setBase.call(this, "modtile");
		};

		this.influenceMarble = function(marble) {
			if (marble.direction !== direction &&
				orbium.Util.withinRect(
				marble.xpos+orbium.Marble.size/2,
				marble.ypos+orbium.Marble.size/2,
				this.xpos+orbium.Tile.size/2-orbium.Marble.size/2,
				this.ypos+orbium.Tile.size/2-orbium.Marble.size/2,
				orbium.Marble.size,
				orbium.Marble.size)) {
				marble.xpos = this.xpos+orbium.Tile.size/2-orbium.Marble.size/2;
				marble.ypos = this.ypos+orbium.Tile.size/2-orbium.Marble.size/2;
				marble.direction = direction;
				marble.lastTeleportDest = null;
			}
		};

		this.construct.apply(this, arguments);
	}; orbium.Director.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
