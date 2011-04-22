(function(orbium, undefined) {
	orbium.Director = function(count, xnr, ynr, dir) {
		var direction = null;

		this.construct = function() {
			direction = dir;

			orbium.Tile.prototype.construct.call(this, ["modtile0", null,
				"director"+direction], count, xnr, ynr);

			this.inducesPaths = [true, true, true, true];
		};

		this.setBase = function() {
			orbium.Tile.prototype.setBase.call(this, "modtile");
		};

		this.influence = function(marble) {
			var offset = orbium.Tile.size/2-orbium.Marble.size/2;

			if (marble.direction !== direction &&
				orbium.Util.withinRect(
				marble.xpos+orbium.Marble.size/2,
				marble.ypos+orbium.Marble.size/2,
				this.xpos+offset,
				this.ypos+offset,
				orbium.Marble.size,
				orbium.Marble.size)) {
				marble.xpos = this.xpos+offset;
				marble.ypos = this.ypos+offset;

				marble.direction = direction;
				marble.lastTeleportDest = null;
			}
		};

		this.construct.apply(this, arguments);
	};

	orbium.Director.prototype = new orbium.Tile();
	orbium.Director.prototype.constructor = orbium.Director;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
