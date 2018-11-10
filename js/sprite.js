(function (orbium, undefined) {
  orbium.Sprite = function () {
    this.xpos = null;
    this.ypos = null;
    this.width = null;
    this.height = null;

    orbium.Sprite.prototype.construct = function (images, xpos, ypos, width, height) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.width = width;
      this.height = height;

      this.images = [];

      for (var i = 0, j = images.length; i < j; i++) {
        this.setImage(i, images[i]);
      }

      this.dirty = true;
    };

    orbium.Sprite.prototype.destruct = function () {
      var len = this.images.length;

      for (var i = 0; i < len; i++) {
        this.setImage(i, null);
      }
    };

    orbium.Sprite.prototype.setImage = function (idx, image) {
      if (image !== null) {
        this.images[idx] = orbium.loader[image];
      } else {
        this.images[idx] = null;
      }
    };

    orbium.Sprite.prototype.invalidate = function () {
      this.dirty = true;
    };

    var lastEntry = function (idx, arr) {
      var last = true;

      for (var i = idx + 1, j = arr.length; i < j; i++) {
        if (arr[i] !== undefined && arr[i] !== null) {
          last = false;
          break;
        }
      }

      return last;
    };

    orbium.Sprite.prototype.update = function (dt) {
      // Default implementation does nothing
    };

    orbium.Sprite.prototype.draw = function (idx) {
      if (this.dirty) {
        if (this.images[idx] !== undefined &&
          this.images[idx] !== null) {
          orbium.ctx.drawImage(
            this.images[idx],
            Math.round(this.xpos),
            Math.round(this.ypos),
            this.width, this.height);
        }

        if (lastEntry(idx, this.images)) {
          this.dirty = false;
        }
      }
    };
  };
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
