(function(orbium) {
	orbium.Lane = function() {
		var bars = null;
		var timer = null;

		this.construct = function() {
			bars = [];

			// Add bars
			for (var i=0; i<orbium.Machine.horizTiles; i++) {
				var bar = new orbium.Bar(i);
				orbium.Util.addArrayElement(bars, bar);
			}

			// Make bar sink if rotator or falltile below
			this.calculateSinks();

			timer = new orbium.Timer();

			orbium.machine.randomizeNextColor();
		};

		this.destruct = function() {
			for (var i=0; i<bars.length; i++) {
				bars[i].destruct();
			}
			bars.length = 0;

			timer.destruct();
		};

		this.calculateSinks = function() {
			for (var m=0;m<bars.length;m++) {
				if (orbium.machine.tiles[m].inducesSink) {
					bars[m].makeSink();
				}
			}
		};

		var checkBar = function(bar) {
			for (var i=0; i<orbium.machine.marbles.length; i++) {
				if (orbium.Util.withinRect(
					orbium.machine.marbles[i].xpos,
					orbium.machine.marbles[i].ypos,
					bar.xpos,
					bar.ypos,
					orbium.Tile.size,
					orbium.Tile.size) ||
				orbium.Util.withinRect(
					orbium.machine.marbles[i].xpos+orbium.Marble.size,
					orbium.machine.marbles[i].ypos+orbium.Marble.size,
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
			for (var i=0; i<orbium.machine.marbles.length; i++) {
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
			for (var i=0; i<bars.length; i++) {
				bars[i].clearPassed();
			}

			timer.reset();
		};

		this.update = function(dt) {
			for (var i=0; i<bars.length; i++) {
				checkBar(bars[i]);
			}

			timer.update(dt);
		};

		this.draw = function() {
			for (var i=0; i<bars.length; i++) {
				bars[i].draw1();
				bars[i].draw2();
			}

			timer.draw1();
		};

		this.construct.apply(this, arguments);
	};
}(window.orbium = window.orbium || {}));
