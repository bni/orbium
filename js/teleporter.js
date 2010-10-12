(function(orbium) {
	orbium.Teleporter = function() {
		this.construct = function(count, xnr, ynr, vari) {
			this.variant = vari;

			orbium.Tile.prototype.construct.call(this, "modtile0", null, "teleporter"+this.variant, count, xnr, ynr);
		}

		this.teleportMarble = function(marble) {
			var teleport = false;

			if (marble.lastTeleportDest != this &&
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
				for (var j=0; j<orbium.machine.tiles.length; j++) {
					var type = null;
					if (marble.direction == 0 || marble.direction == 2) {
						type = 0;
					} else if (marble.direction == 1 || marble.direction == 3) {
						type = 1;
					}

					if (orbium.machine.tiles[j] instanceof orbium.Teleporter &&
						orbium.machine.tiles[j] != this &&
						(orbium.machine.tiles[j].variant == type || orbium.machine.tiles[j].variant == 2)
					) {
						dest = orbium.machine.tiles[j];
					}
				}

				marble.lastTeleportDest = dest;

				marble.xpos = dest.xpos+orbium.Tile.size/2-orbium.Marble.size/2;
				marble.ypos = dest.ypos+orbium.Tile.size/2-orbium.Marble.size/2;
				dest.invalidate();
			}
		}
	}; orbium.Teleporter.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
