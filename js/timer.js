(function (orbium) {
  orbium.Timer = function () {
    var speed = null;

    this.construct = function () {
      var xpos = orbium.width;
      var ypos = 0;

      var vidx = orbium.Machine.vertTiles;
      var hidx = orbium.Machine.horizTiles;

      var units = orbium.level[orbium.machine.levnr][hidx * vidx + 1];
      var maxSeconds = (units + 1) * 3;

      speed = Math.round(orbium.width / maxSeconds);

      var images = ["timer0"];
      orbium.Sprite.prototype.construct.call(this, images, xpos, ypos, orbium.Tile.size, orbium.Bar.height);
    };

    this.destruct = function () {
      orbium.Sprite.prototype.destruct.call(this);
    };

    this.reset = function () {
      this.xpos = orbium.width;
    };

    this.update = function (dt) {
      if (orbium.Machine.timeLimits) {
        this.xpos -= speed * dt;
      }

      for (var i = orbium.Machine.horizTiles; i >= 0; i--) {
        if (this.xpos < orbium.Tile.size * i) {
          orbium.machine.lane.setTimerStage(i + 1);
        }
      }

      if (this.xpos <= 0) {
        orbium.machine.failLevel("ORB TIME EXPIRED!");
      }

      this.invalidate();
    };

    this.draw = function (idx) {
      // We override draw here, first we call the base class
      // implementation
      orbium.Sprite.prototype.draw.call(this, idx);

      // We need to fill the gap here
      var trailBegin = this.xpos + orbium.Tile.size;

      for (var i = orbium.Machine.horizTiles; i >= 0; i--) {
        if (trailBegin < orbium.Tile.size * i) {
          var trailEnd = orbium.Tile.size * i;
        }
      }

      var w = trailEnd - trailBegin;

      if (w > 0) {
        orbium.ctx.drawImage(
          orbium.loader["timer1"],
          Math.round(trailBegin),
          Math.round(this.ypos),
          Math.round(w),
          orbium.Bar.height);
      }
    };

    this.construct.apply(this, arguments);
  };

  orbium.Timer.prototype = new orbium.Sprite();
  orbium.Timer.prototype.constructor = orbium.Timer;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
