(function (orbium, undefined) {
  orbium.Tile = function () {
    this.count = null;
    this.xnr = null;
    this.ynr = null;

    this.variant = null;

    this.inducesSink = null;
    this.inducesPaths = null;

    this.hasPaths = null;

    orbium.Tile.prototype.construct = function (images, count, xnr, ynr) {
      this.count = count;
      this.xnr = xnr;
      this.ynr = ynr;

      this.inducesSink = false;
      this.inducesPaths = [false, false, false, false];

      this.hasPaths = [false, false, false, false];

      var xpos = orbium.Tile.size * this.xnr;
      var ypos = orbium.Tile.size * this.ynr + orbium.Bar.height;

      orbium.Sprite.prototype.construct.call(this, images, xpos, ypos, orbium.Tile.size, orbium.Tile.size);
    };

    orbium.Tile.prototype.setBase = function (baseName) {
      if (baseName !== undefined) {
        // Should tile have top path?
        var idx = this.count-orbium.Machine.horizTiles;
        this.hasPaths[0] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          orbium.machine.tiles[idx].inducesPaths[0] &&
          this.variant !== 1 &&
          orbium.machine.tiles[idx].variant !== 1);

        // Should tile have right path?
        idx = this.count + 1;
        this.hasPaths[1] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          (this.count + 1) % orbium.Machine.horizTiles !== 0 &&
          orbium.machine.tiles[idx].inducesPaths[1] &&
          this.variant !== 0 &&
           orbium.machine.tiles[idx].variant !== 0);

        // Should tile have bottom path?
        idx = this.count + orbium.Machine.horizTiles;
        this.hasPaths[2] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          orbium.machine.tiles[idx].inducesPaths[2] &&
          this.variant !== 1 &&
          orbium.machine.tiles[idx].variant !== 1);

        // Should tile have left path?
        idx = this.count - 1;
        this.hasPaths[3] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          this.count % orbium.Machine.horizTiles !== 0 &&
          orbium.machine.tiles[idx].inducesPaths[3] &&
          this.variant !== 0 &&
          orbium.machine.tiles[idx].variant !== 0);

        // First row rotators
        if (this.count < orbium.Machine.horizTiles &&
          this instanceof orbium.Rotator) {
          this.hasPaths[0] = true;
        }

        var frame = 0;

        if (this.hasPaths[0] && !this.hasPaths[1] &&
          !this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 0;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 1;
        } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 2;
        } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 3;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 4;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 5;
        } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 6;
        } else if (this.hasPaths[0] && !this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 7;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 8;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 9;
        } else if (this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 10;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 11;
        } else if (this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 12;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 13;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 14;
        }

        if (this.broken) {
          frame += 15;
        }

        this.setImage(0, baseName + frame);

        this.invalidate();
      }
    };

    orbium.Tile.prototype.influence = function (marble) {
      // Default implementation does nothing
    };
  };

  orbium.Tile.prototype = new orbium.Sprite();
  orbium.Tile.prototype.constructor = orbium.Tile;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
