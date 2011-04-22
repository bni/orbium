(function(orbium, undefined) {
	orbium.Teleporter = function(count, xnr, ynr, vari) {
		this.construct = function() {
			this.variant = vari;

			orbium.Tile.prototype.construct.call(this, ["modtile0", null,
				"teleporter"+this.variant], count, xnr, ynr);

			this.inducesPaths = [true, true, true, true];
		};

		this.setBase = function() {
			orbium.Tile.prototype.setBase.call(this, "modtile");
		};

		this.influence = function(marble) {
			var teleport = false;

			if (marble.lastTeleportDest !== this &&
				orbium.Util.withinRect(
					marble.xpos+orbium.Marble.size/2,
					marble.ypos+orbium.Marble.size/2,
					this.xpos+orbium.Tile.size/2-orbium.Marble.size/2,
					this.ypos+orbium.Tile.size/2-orbium.Marble.size/2,
					orbium.Marble.size,
					orbium.Marble.size)) {
				teleport = true;
			}

			if (teleport) {
				var dest = null;

				for (var i = 0, j = orbium.machine.tiles.length; i < j; i++) {
					var tile = orbium.machine.tiles[i];

					var type = null;
					if (marble.direction === 0 || marble.direction === 2) {
						type = 0;
					} else if (marble.direction === 1 ||
						marble.direction === 3) {
						type = 1;
					}

					if (tile instanceof orbium.Teleporter && tile !== this &&
						(tile.variant === type || tile.variant === 2)) {
						dest = tile;
					}
				}

				marble.lastTeleportDest = dest;

				var offset = orbium.Tile.size/2-orbium.Marble.size/2;

				marble.xpos = dest.xpos+offset;
				marble.ypos = dest.ypos+offset;
				dest.invalidate();
			}
		};

		this.construct.apply(this, arguments);
	};

	orbium.Teleporter.prototype = new orbium.Tile();
	orbium.Teleporter.prototype.constructor = orbium.Teleporter;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
