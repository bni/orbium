(function(orbium) {
	orbium.Tile = function() {
		this.count = null;
		this.xnr = null;
		this.ynr = null;

		this.variant = null;

		this.above = null;
		this.right = null;
		this.below = null;
		this.left = null;

		this.construct = function(image1, image2, image3, count, xnr, ynr) {
			this.count = count;
			this.xnr = xnr;
			this.ynr = ynr;

			this.above = false;
			this.right = false;
			this.below = false;
			this.left = false;

			var xpos = orbium.Tile.size*this.xnr;
			var ypos = orbium.Tile.size*this.ynr+orbium.Bar.height;

			orbium.Sprite.prototype.construct.call(this, image1, image2, image3,
				xpos, ypos, orbium.Tile.size, orbium.Tile.size, 3);
		}; orbium.Tile.prototype.construct = this.construct;

		this.setBase = function(baseName) {
			var idx = 0;

			this.above = false;
			this.right = false;
			this.below = false;
			this.left = false;

			// first row rotators
			if (this.count < orbium.Machine.horizTiles && this instanceof orbium.Rotator) {
				this.above = true;
			}

			// Tile this.above
			idx = this.count-orbium.Machine.horizTiles;
			if (idx >= 0 && idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles) {
				if (orbium.machine.tiles[idx] instanceof orbium.VertTile ||
					orbium.machine.tiles[idx] instanceof orbium.CrossTile ||
					orbium.machine.tiles[idx] instanceof orbium.Inspector ||
					orbium.machine.tiles[idx] instanceof orbium.Teleporter ||
					orbium.machine.tiles[idx] instanceof orbium.Transformer ||
					orbium.machine.tiles[idx] instanceof orbium.Director ||
					orbium.machine.tiles[idx] instanceof orbium.Rotator ||
					orbium.machine.tiles[idx] instanceof orbium.FallTile) {
					if (this.variant != 1 && orbium.machine.tiles[idx].variant != 1) {
						this.above = true;
					}
				}
			}

			// Tile this.right
			idx = this.count+1;
			if (idx >= 0 && idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles && (this.count+1)%orbium.Machine.horizTiles != 0) {
				if (orbium.machine.tiles[idx] instanceof orbium.HorizTile ||
					orbium.machine.tiles[idx] instanceof orbium.CrossTile ||
					orbium.machine.tiles[idx] instanceof orbium.Inspector ||
					orbium.machine.tiles[idx] instanceof orbium.Teleporter ||
					orbium.machine.tiles[idx] instanceof orbium.Transformer ||
					orbium.machine.tiles[idx] instanceof orbium.Director ||
					orbium.machine.tiles[idx] instanceof orbium.Rotator) {
					if (this.variant != 0 && orbium.machine.tiles[idx].variant != 0) {
						this.right = true;
					}
				}
			}

			// Tile this.below
			idx = this.count+orbium.Machine.horizTiles;
			if (idx >= 0 && idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles) {
				if (orbium.machine.tiles[idx] instanceof orbium.VertTile ||
					orbium.machine.tiles[idx] instanceof orbium.CrossTile ||
					orbium.machine.tiles[idx] instanceof orbium.Inspector ||
					orbium.machine.tiles[idx] instanceof orbium.Teleporter ||
					orbium.machine.tiles[idx] instanceof orbium.Transformer ||
					orbium.machine.tiles[idx] instanceof orbium.Director ||
					orbium.machine.tiles[idx] instanceof orbium.Rotator) {
					if (this.variant != 1 && orbium.machine.tiles[idx].variant != 1) {
						this.below = true;
					}
				}
			}

			// Tile this.left
			idx = this.count-1;
			if (idx >= 0 && idx < orbium.Machine.horizTiles*orbium.Machine.vertTiles && this.count%orbium.Machine.horizTiles != 0) {
				if (orbium.machine.tiles[idx] instanceof orbium.HorizTile ||
					orbium.machine.tiles[idx] instanceof orbium.CrossTile ||
					orbium.machine.tiles[idx] instanceof orbium.Inspector ||
					orbium.machine.tiles[idx] instanceof orbium.Teleporter ||
					orbium.machine.tiles[idx] instanceof orbium.Transformer ||
					orbium.machine.tiles[idx] instanceof orbium.Director ||
					orbium.machine.tiles[idx] instanceof orbium.Rotator) {
					if (this.variant != 0 && orbium.machine.tiles[idx].variant != 0) {
						this.left = true;
					}
				}
			}

			var frame = 0;

			if (this.above && !this.right && !this.below && !this.left) {
				frame = 0;
			} else if (!this.above && this.right && !this.below && !this.left) {
				frame = 1;
			} else if (!this.above && !this.right && this.below && !this.left) {
				frame = 2;
			} else if (!this.above && !this.right && !this.below && this.left) {
				frame = 3;
			} else if (this.above && this.right && !this.below && !this.left) {
				frame = 4;
			} else if (!this.above && this.right && this.below && !this.left) {
				frame = 5;
			} else if (!this.above && !this.right && this.below && this.left) {
				frame = 6;
			} else if (this.above && !this.right && !this.below && this.left) {
				frame = 7;
			} else if (this.above && this.right && this.below && !this.left) {
				frame = 8;
			} else if (!this.above && this.right && this.below && this.left) {
				frame = 9;
			} else if (this.above && !this.right && this.below && this.left) {
				frame = 10;
			} else if (this.above && this.right && !this.below && this.left) {
				frame = 11;
			} else if (this.above && !this.right && this.below && !this.left) {
				frame = 12;
			} else if (!this.above && this.right && !this.below && this.left) {
				frame = 13;
			} else if (this.above && this.right && this.below && this.left) {
				frame = 14;
			}

			if (this.broken) {
				frame += 15;
			}

			this.setImage1(baseName+frame);

			this.invalidate();
		}; orbium.Tile.prototype.setBase = this.setBase;
	}; orbium.Tile.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));
