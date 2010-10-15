(function(orbium) {
	orbium.Sequencer = function(count, xnr, ynr, col) {
		var color = null;
		var indicators = null;

		this.construct = function() {
			color = col;
			indicators = [];

			orbium.Tile.prototype.construct.call(this, "sequencer0", null, null,
				count, xnr, ynr);

			this.setup();
		};

		this.destruct = function() {
			for (var i=0; i<indicators.length; i++) {
				indicators[i].destruct();
			}

			orbium.Tile.prototype.destruct.call(this);
		};

		this.invalidate = function() {
			orbium.Tile.prototype.invalidate.call(this);

			for (var i=0; i<indicators.length; i++) {
				indicators[i].invalidate();
			}
		};

		this.setup = function() {
			var col1 = color;
			var xpos1 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var ypos1 = Math.round(this.ypos+orbium.Tile.size*0.046);
			var indicator1 = new orbium.Indicator(xpos1, ypos1, col1);
			orbium.Util.addArrayElement(indicators, indicator1);

			var col2 = color+1;
			if (col2 == 4) {
				col2 = 0;
			}
			var xpos2 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var ypos2 = Math.round(this.ypos+orbium.Tile.size*0.344);
			var indicator2 = new orbium.Indicator(xpos2, ypos2, col2);
			orbium.Util.addArrayElement(indicators, indicator2);

			var col3 = color+2;
			if (col3 == 4) {
				col3 = 0;
			}
			if (col3 == 5) {
				col3 = 1;
			}
			var xpos3 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var offset = orbium.Tile.size*0.642;
			if (orbium.Tile.size == 144) { offset = orbium.Tile.size*0.643 } // Fix for rounding bug?
			var ypos3 = Math.round(this.ypos+offset);
			var indicator3 = new orbium.Indicator(xpos3, ypos3, col3);
			orbium.Util.addArrayElement(indicators, indicator3);
		};

		this.active = function() {
			if (indicators.length > 0) {
				return true;
			}

			return false;
		};

		this.matches = function(col) {
			if (indicators.length > 0) {
				return indicators[0].color == col;
			}

			return false;
		};

		this.advance = function() {
			// Remove topmost indicator from indicators
			if (indicators.length > 0) {
				indicators[0].destruct();
				orbium.Util.removeArrayElement(indicators, indicators[0]);
				this.invalidate();
			}
		};

		this.draw2 = function() {
			orbium.Tile.prototype.draw2.call(this);

			for (var i=0; i<indicators.length; i++) {
				indicators[i].draw1();
			}
		};

		this.construct.apply(this, arguments);
	}; orbium.Sequencer.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
