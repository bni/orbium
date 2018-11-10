(function (orbium, undefined) {
  orbium.Player = function () {
    this.muted = null; // Muted flag

    this.construct = function () {
      this.muted = true;
    };

    this.play = function (sound) {
      if (!this.muted) {
        return new Audio("snd/" + sound + ".mp3").play();
      }
    };

    this.construct.apply(this, arguments);
  };
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
