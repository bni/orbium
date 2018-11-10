(function (orbium, undefined) {
  orbium.Counter = function (count, xnr, ynr) {
    var activeMarbles = null;

    this.construct = function () {
      activeMarbles = 0;

      orbium.Tile.prototype.construct.call(this, ["counter0"], count,
        xnr, ynr);
    };

    this.countActiveMarbles = function () {
      var count = 0;

      for (var i = 0, j = orbium.machine.marbles.length; i < j; i++) {
        if (!orbium.machine.marbles[i].fresh) {
          count++;
        }
      }

      if (count < 4) {
        activeMarbles = count;
      } else {
        activeMarbles = 4;
      }

      this.setImage(0, "counter" + activeMarbles);
      this.invalidate();
    };

    this.isLaunchAllowed = function () {
      return activeMarbles < 4;
    };

    this.isFallAllowed = function () {
      return activeMarbles < 3;
    };

    this.construct.apply(this, arguments);
  };

  orbium.Counter.prototype = new orbium.Tile();
  orbium.Counter.prototype.constructor = orbium.Counter;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
