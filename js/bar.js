(function(orbium) {
	orbium.Bar = function(nr) {
		var passed = null;
		this.nr = null;

		this.construct = function() {
			this.nr = nr;
			var xpos = orbium.Tile.size*this.nr;
			var ypos = 0;

			passed = false;

			orbium.Sprite.prototype.construct.call(this, "bar"+this.nr, null,
				null, xpos, ypos, orbium.Tile.size, orbium.Bar.height, 3);
		};

		this.makeSink = function() {
			var n = this.nr+8;
			this.setImage1("bar"+n);
			this.invalidate();
		};

		this.makePassed = function() {
			if (!passed) {
				passed = true;
				this.setImage2("timer1");
				this.invalidate();
			}
		};

		this.clearPassed = function() {
			passed = false;
			this.setImage2(null);
			this.invalidate();
		};

		this.construct.apply(this, arguments);
	}; orbium.Bar.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));
