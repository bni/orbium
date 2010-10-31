(function(orbium) {
	orbium.Lane = function() {
		var bars = null;
		var timer = null;

		this.construct = function() {
			bars = [];

			// Add bars
			for (var i = 0, j = orbium.Machine.horizTiles; i < j; i++) {
				var bar = new orbium.Bar(i);
				orbium.Util.addArrayElement(bars, bar);
			}

			// Make bar sink if rotator or falltile below
			this.calculateSinks();

			timer = new orbium.Timer();

			orbium.machine.randomizeNextColor();
		};

		this.destruct = function() {
			for (var i = 0, j = bars.length; i < j; i++) {
				bars[i].destruct();
			}
			bars.length = 0;

			timer.destruct();
		};

		this.calculateSinks = function() {
			for (var i = 0, j = bars.length; i < j; i++) {
				if (orbium.machine.tiles[i].inducesSink) {
					bars[i].makeSink();
				}
			}
		};

		var checkBar = function(bar) {
			for (var i = 0, j = orbium.machine.marbles.length; i < j; i++) {
				var marble = orbium.machine.marbles[i];

				if (orbium.Util.withinRect(
					marble.xpos,
					marble.ypos,
					bar.xpos,
					bar.ypos,
					orbium.Tile.size,
					orbium.Tile.size) ||
				orbium.Util.withinRect(
					marble.xpos+orbium.Marble.size,
					marble.ypos+orbium.Marble.size,
					bar.xpos,
					bar.ypos,
					orbium.Tile.size,
					orbium.Tile.size)) {
					bar.invalidate();
				}
			}

			if (orbium.Util.withinRect(
				timer.xpos,
				timer.ypos,
				bar.xpos,
				bar.ypos,
				orbium.Tile.size,
				orbium.Bar.height) ||
			orbium.Util.withinRect(
				timer.xpos+orbium.Tile.size,
				timer.ypos+orbium.Bar.height,
				bar.xpos,
				bar.ypos,
				orbium.Tile.size,
				orbium.Bar.height)) {
				bar.invalidate();
			}
		};

		this.injectMarble = function() {
			// Check that there does not already exist a fresh marble in the lane
			// This should never happen, but check for it anyway
			for (var i = 0, j = orbium.machine.marbles.length; i < j; i++) {
				if (orbium.machine.marbles[i].fresh) {
					return;
				}
			}

			var marble = new orbium.Marble();
			orbium.Util.addArrayElement(orbium.machine.marbles, marble);
			orbium.machine.randomizeNextColor();
		};

		this.setTimerStage = function(step) {
			if (step >= 0 && step < orbium.Machine.horizTiles) {
				bars[step].makePassed();
			}
		};

		this.resetTimer = function() {
			for (var i = 0, j = bars.length; i < j; i++) {
				bars[i].clearPassed();
			}

			timer.reset();
		};

		this.update = function(dt) {
			for (var i = 0, j = bars.length; i < j; i++) {
				checkBar(bars[i]);
			}

			timer.update(dt);
		};

		this.draw = function() {
			for (var i = 0, j = bars.length; i < j; i++) {
				var bar = bars[i];

				bar.draw(0);
				bar.draw(1);
			}

			timer.draw(0);
		};

		this.construct.apply(this, arguments);
	};
}(window.orbium = window.orbium || {}));
