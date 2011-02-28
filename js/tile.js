(function(orbium) {
	orbium.Tile = function() {
		this.count = null;
		this.xnr = null;
		this.ynr = null;

		this.variant = null;

		this.inducesSink = null;

		this.inducesTopPath = null;
		this.inducesRightPath = null;
		this.inducesBottomPath = null;
		this.inducesLeftPath = null;

		this.hasTopPath = null;
		this.hasRightPath = null;
		this.hasBottomPath = null;
		this.hasLeftPath = null;

		this.construct = function(images, count, xnr, ynr) {
			this.count = count;
			this.xnr = xnr;
			this.ynr = ynr;

			this.inducesSink = false;

			this.inducesTopPath = false;
			this.inducesRightPath = false;
			this.inducesBottomPath = false;
			this.inducesLeftPath = false;

			this.hasTopPath = false;
			this.hasRightPath = false;
			this.hasBottomPath = false;
			this.hasLeftPath = false;

			var xpos = orbium.Tile.size*this.xnr;
			var ypos = orbium.Tile.size*this.ynr+orbium.Bar.height;

			orbium.Sprite.prototype.construct.call(this, images, xpos, ypos,
				orbium.Tile.size, orbium.Tile.size, 3);
		}; orbium.Tile.prototype.construct = this.construct;

		this.setBase = function(baseName) {
			if (baseName !== undefined) {
				var idx = 0;

				// Should tile have top path?
				idx = this.count-orbium.Machine.horizTiles;
				if (idx >= 0 &&
					idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles &&
					orbium.machine.tiles[idx].inducesTopPath &&
					this.variant !== 1 &&
					orbium.machine.tiles[idx].variant !== 1) {
					this.hasTopPath = true;
				} else {
					this.hasTopPath = false;
				}

				// Should tile have right path?
				idx = this.count+1;
				if (idx >= 0 &&
					idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles &&
					(this.count+1)%orbium.Machine.horizTiles !== 0 &&
					orbium.machine.tiles[idx].inducesRightPath &&
					this.variant !== 0 &&
					orbium.machine.tiles[idx].variant !== 0) {
					this.hasRightPath = true;
				} else {
					this.hasRightPath = false;
				}

				// Should tile have bottom path?
				idx = this.count+orbium.Machine.horizTiles;
				if (idx >= 0 &&
					idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles &&
					orbium.machine.tiles[idx].inducesBottomPath &&
					this.variant !== 1 &&
					orbium.machine.tiles[idx].variant !== 1) {
					this.hasBottomPath = true;
				} else {
					this.hasBottomPath = false;
				}

				// Should tile have left path?
				idx = this.count-1;
				if (idx >= 0 &&
					idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles &&
					this.count%orbium.Machine.horizTiles !== 0 &&
					orbium.machine.tiles[idx].inducesLeftPath &&
					this.variant !== 0 &&
					orbium.machine.tiles[idx].variant !== 0) {
					this.hasLeftPath = true;
				} else {
					this.hasLeftPath = false;
				}

				// First row rotators
				if (this.count < orbium.Machine.horizTiles &&
					this instanceof orbium.Rotator) {
					this.hasTopPath = true;
				}

				var frame = 0;

				if (this.hasTopPath && !this.hasRightPath &&
					!this.hasBottomPath && !this.hasLeftPath) {
					frame = 0;
				} else if (!this.hasTopPath && this.hasRightPath &&
					!this.hasBottomPath && !this.hasLeftPath) {
					frame = 1;
				} else if (!this.hasTopPath && !this.hasRightPath &&
					this.hasBottomPath && !this.hasLeftPath) {
					frame = 2;
				} else if (!this.hasTopPath && !this.hasRightPath &&
					!this.hasBottomPath && this.hasLeftPath) {
					frame = 3;
				} else if (this.hasTopPath && this.hasRightPath &&
					!this.hasBottomPath && !this.hasLeftPath) {
					frame = 4;
				} else if (!this.hasTopPath && this.hasRightPath &&
					this.hasBottomPath && !this.hasLeftPath) {
					frame = 5;
				} else if (!this.hasTopPath && !this.hasRightPath &&
					this.hasBottomPath && this.hasLeftPath) {
					frame = 6;
				} else if (this.hasTopPath && !this.hasRightPath &&
					!this.hasBottomPath && this.hasLeftPath) {
					frame = 7;
				} else if (this.hasTopPath && this.hasRightPath &&
					this.hasBottomPath && !this.hasLeftPath) {
					frame = 8;
				} else if (!this.hasTopPath && this.hasRightPath &&
					this.hasBottomPath && this.hasLeftPath) {
					frame = 9;
				} else if (this.hasTopPath && !this.hasRightPath &&
					this.hasBottomPath && this.hasLeftPath) {
					frame = 10;
				} else if (this.hasTopPath && this.hasRightPath &&
					!this.hasBottomPath && this.hasLeftPath) {
					frame = 11;
				} else if (this.hasTopPath && !this.hasRightPath &&
					this.hasBottomPath && !this.hasLeftPath) {
					frame = 12;
				} else if (!this.hasTopPath && this.hasRightPath &&
					!this.hasBottomPath && this.hasLeftPath) {
					frame = 13;
				} else if (this.hasTopPath && this.hasRightPath &&
					this.hasBottomPath && this.hasLeftPath) {
					frame = 14;
				}

				if (this.broken) {
					frame += 15;
				}

				this.setImage(0, baseName+frame);

				this.invalidate();
			}
		}; orbium.Tile.prototype.setBase = this.setBase;

		this.influence = function(marble) {
			// Default implementation does nothing
		}; orbium.Tile.prototype.influence = this.influence;
	}; orbium.Tile.prototype = new orbium.Sprite();
}(typeof window != "undefined" ? window.orbium = window.orbium || {} : orbium));
