(function(orbium, undefined) {
	orbium.Indicator = function() {
		this.color = null;

		this.construct = function(xpos, ypos, color) {
			this.color = color;

			var x = orbium.Util.generateRandomIndex(11);

			var f = this.color*12+x;
			var images = ["marble"+f];
			orbium.Sprite.prototype.construct.call(this, images, xpos, ypos,
				orbium.Marble.size, orbium.Marble.size, 4);
		};

		this.construct.apply(this, arguments);
	};

	orbium.Indicator.prototype = new orbium.Sprite();
	orbium.Indicator.prototype.constructor = orbium.Indicator;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
