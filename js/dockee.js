(function (orbium, undefined) {
  orbium.Dockee = function (parent, pos, color, frame) {
    this.parent = null;
    this.pos = null;
    this.color = null;
    this.frame = null;

    this.construct = function () {
      this.parent = parent;
      this.pos = pos;
      this.color = color;
      this.frame = frame;

      this.place();

      var f = this.color * 12 + this.frame;
      var images = ["marble" + f];
      orbium.Sprite.prototype.construct.call(this, images, this.xpos, this.ypos, orbium.Marble.size, orbium.Marble.size);
    };

    this.destruct = function () {
      orbium.Sprite.prototype.destruct.call(this);
    };

    this.place = function () {
      var offset = this.pos + this.parent.orientation;
      if (offset > 6) {
        offset = 0;
      }

      var o1 = 0.3450;
      var o2 = 0.0382;
      var o3 = 0.6520;

      if (offset === 0 || offset === 4) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o1);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o2);
      } else if (offset === 1 || offset === 5) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o3);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o1);
      } else if (offset === 2 || offset === 6) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o1);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o3);
      } else if (offset === 3) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o2);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o1);
      }
    };

    this.judder = function (stage) {
      var xamount, yamount;

      var offset = this.pos + this.parent.orientation;
      if (offset > 6) {
        offset = 0;
      }

      if (offset === 0 || offset === 4) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.120);
          yamount = Math.round(orbium.Tile.size * 0.025);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.090);
          yamount = Math.round(orbium.Tile.size * 0.065);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.070);
          yamount = Math.round(orbium.Tile.size * 0.105);
        }
      }

      if (offset === 1 || offset === 5) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.025);
          yamount = Math.round(orbium.Tile.size * 0.115);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.065);
          yamount = Math.round(orbium.Tile.size * 0.100);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.100);
          yamount = Math.round(orbium.Tile.size * 0.065);
        }
      }

      if (offset === 2 || offset === 6) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.115);
          yamount = Math.round(orbium.Tile.size * 0.025);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.100);
          yamount = Math.round(orbium.Tile.size * 0.065);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.065);
          yamount = Math.round(orbium.Tile.size * 0.110);
        }
      }

      if (offset === 3) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.020);
          yamount = Math.round(orbium.Tile.size * 0.115);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.065);
          yamount = Math.round(orbium.Tile.size * 0.100);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.100);
          yamount = Math.round(orbium.Tile.size * 0.065);
        }
      }

      if (offset === 0 || offset === 4) {
        this.xpos -= xamount;
        this.ypos += yamount;
      } else if (offset === 1 || offset === 5) {
        this.xpos -= xamount;
        this.ypos -= yamount;
      } else if (offset === 2 || offset === 6) {
        this.xpos += xamount;
        this.ypos -= yamount;
      } else if (offset === 3) {
        this.xpos += xamount;
        this.ypos += yamount;
      }
    };

    this.withinTrigger = function (xcheck, ycheck) {
      var xpos = null;
      var ypos = null;
      var width = null;
      var height = null;

      var offset = this.pos + this.parent.orientation;
      if (offset > 6) {
        offset = 0;
      }

      if (offset === 0 || offset === 4) {
        xpos = this.xpos - orbium.Marble.size / 2;
        ypos = this.ypos - orbium.Marble.size * 1.2;
        width = orbium.Marble.size * 2;
        height = orbium.Marble.size * 1.2;
      } else if (offset === 1 || offset === 5) {
        xpos = this.xpos + orbium.Marble.size;
        ypos = this.ypos - orbium.Marble.size / 2;
        width = orbium.Marble.size * 1.2;
        height = orbium.Marble.size * 2;
      } else if (offset === 2 || offset === 6) {
        xpos = this.xpos - orbium.Marble.size / 2;
        ypos = this.ypos + orbium.Marble.size;
        width = orbium.Marble.size * 2;
        height = orbium.Marble.size * 1.2;
      } else if (offset === 3) {
        xpos = this.xpos - orbium.Marble.size * 1.2;
        ypos = this.ypos - orbium.Marble.size / 2;
        width = orbium.Marble.size * 1.2;
        height = orbium.Marble.size * 2;
      }

      return (orbium.Util.withinRect(xcheck, ycheck, xpos, ypos, width, height) ||
        orbium.Util.withinRect(xcheck, ycheck, this.xpos, this.ypos, orbium.Marble.size, orbium.Marble.size));
    };

    this.getState = function () {
      return {
        pos: this.pos,
        color: this.color,
        frame: this.frame
      };
    };

    this.construct.apply(this, arguments);
  };

  orbium.Dockee.prototype = new orbium.Sprite();
  orbium.Dockee.prototype.constructor = orbium.Dockee;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
