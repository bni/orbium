(function(orbium, undefined) {
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
				} else {
					bars[i].unSink();
				}
			}
		};

		this.injectMarble = function() {
			// Dont inject marble if we are connected to server
			if (orbium.client !== undefined) {
				return;
			}

			// Check that there does not already exist a fresh marble in
			// the lane. This should never happen, but check for it anyway
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

		this.update = function(dt, marble) {
			var x1 = marble.xpos;
			var x2 = marble.xpos+orbium.Marble.size;

			var idx1 = Math.floor(x1/orbium.Tile.size);
			var idx2 = Math.floor(x2/orbium.Tile.size);

			if (idx1 >= 0 && idx1 < bars.length) {
				var bar1 = bars[idx1];
				bar1.invalidate();
			}

			if (idx2 >= 0 && idx2 < bars.length && idx1 !== idx2) {
				var bar2 = bars[idx2];
				bar2.invalidate();
			}

			var x3 = timer.xpos;
			var x4 = timer.xpos+orbium.Tile.size;

			var idx3 = Math.floor(x3/orbium.Tile.size);
			var idx4 = Math.floor(x4/orbium.Tile.size);

			if (idx3 >= 0 && idx3 < bars.length) {
				var bar3 = bars[idx3];
				bar3.invalidate();
			}

			if (idx4 >= 0 && idx4 < bars.length && idx3 !== idx4) {
				var bar4 = bars[idx4];
				bar4.invalidate();
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
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
