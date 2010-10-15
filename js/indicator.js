(function(orbium) {
	orbium.Indicator = function() {
		this.color = null;

		this.construct = function(xpos, ypos, color) {
			this.color = color;

			var x = orbium.Util.generateRandomIndex(11);

			var f = this.color*12+x;
			orbium.Sprite.prototype.construct.call(this, "marble"+f, null, null,
				xpos, ypos, orbium.Marble.size, orbium.Marble.size, 4);
		};

		this.construct.apply(this, arguments);
	}; orbium.Indicator.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));
