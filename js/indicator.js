(function(orbium) {
	orbium.Indicator = function() {
		this.color = null;

		this.construct = function(xpos, ypos, color) {
			this.color = color;

			var x = 0;

			var rand = Math.random();
			if (rand < 1/12) {
				x = 0;
			} else if (rand < 2/12) {
				x = 1;
			} else if (rand < 3/12) {
				x = 2;
			} else if (rand < 4/12) {
				x = 3;
			} else if (rand < 5/12) {
				x = 4;
			} else if (rand < 6/12) {
				x = 5;
			} else if (rand < 7/12) {
				x = 6;
			} else if (rand < 8/12) {
				x = 7;
			} else if (rand < 9/12) {
				x = 8;
			} else if (rand < 10/12) {
				x = 9;
			} else if (rand < 11/12) {
				x = 10;
			} else {
				x = 11;
			}

			var f = this.color*12+x;
			orbium.Sprite.prototype.construct.call(this, "marble"+f, null, null,
				xpos, ypos, orbium.Marble.size, orbium.Marble.size, 4);
		};
	}; orbium.Indicator.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));
