(function(orbium, undefined) {
	orbium.Announcer = function(count, xnr, ynr) {
		this.construct = function() {
			orbium.Tile.prototype.construct.call(this, ["announcer0"], count,
				xnr, ynr);
		};

		this.announceNextColor = function(nextColor) {
			this.setImage(0, "announcer"+nextColor);
			this.invalidate();
		};

		this.construct.apply(this, arguments);
	};

	orbium.Announcer.prototype = new orbium.Tile();
	orbium.Announcer.prototype.constructor = orbium.Announcer;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
