(function(orbium, undefined) {
	orbium.FallTile = function(count, xnr, ynr) {
		this.construct = function() {
			var x = orbium.Util.generateRandomIndex(5);

			orbium.Tile.prototype.construct.call(this, ["verttile"+x], count,
				xnr, ynr);

			this.inducesSink = true;
			this.inducesPaths = [true, false, false, false];
		};

		this.fallMarble = function(marble) {
			marble.xpos = this.xpos+orbium.Tile.size/2-orbium.Marble.size/2;
			marble.ypos = this.ypos-orbium.Marble.size;
			marble.direction = 2;
		};

		this.influence = function(marble) {
			// Falldown
			if (this.count < orbium.Machine.horizTiles && marble.fresh) {
				if (orbium.Util.withinRect(
					marble.xpos+orbium.Marble.size/2,
					marble.ypos+orbium.Marble.size/2,
					this.xpos+orbium.Tile.size/2-orbium.Marble.size/4,
					this.ypos-orbium.Bar.height,
					orbium.Marble.size/2,
					orbium.Bar.height) &&
					orbium.machine.counter.isFallAllowed()) {
					this.fallMarble(marble);
					marble.fresh = false;
					orbium.machine.lane.resetTimer();
					orbium.machine.lane.injectMarble();
					orbium.machine.counter.countActiveMarbles();
				}
			}

			// Bounceback
			if (marble.direction === 0 &&
				orbium.Util.withinRect(
				marble.xpos+orbium.Marble.size/2,
				marble.ypos+orbium.Marble.size,
				this.xpos+orbium.Tile.size/2-orbium.Marble.size/2,
				this.ypos,
				orbium.Marble.size,
				orbium.Marble.size)) {
				marble.bounce();
			}
		};

		this.construct.apply(this, arguments);
	};

	orbium.FallTile.prototype = new orbium.Tile();
	orbium.FallTile.prototype.constructor = orbium.FallTile;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
