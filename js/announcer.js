(function(orbium) {
	orbium.Announcer = function() {
		this.construct = function(count, xnr, ynr) {
			orbium.Tile.prototype.construct.call(this, "announcer0", null, null,
				count, xnr, ynr);
		};

		this.announceNextColor = function(nextColor) {
			this.setImage1("announcer"+nextColor);
			this.invalidate();
		};
	}; orbium.Announcer.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
