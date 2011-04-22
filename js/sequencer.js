(function(orbium, undefined) {
	orbium.Sequencer = function(count, xnr, ynr, col) {
		var color = null;
		var indicators = null;

		this.construct = function() {
			color = col;
			indicators = [];

			orbium.Tile.prototype.construct.call(this, ["sequencer0"], count,
				xnr, ynr);

			setup();
		};

		this.destruct = function() {
			for (var i = 0, j = indicators.length; i < j; i++) {
				indicators[i].destruct();
			}
			indicators.length = 0;

			orbium.Tile.prototype.destruct.call(this);
		};

		this.invalidate = function() {
			orbium.Tile.prototype.invalidate.call(this);

			for (var i = 0, j = indicators.length; i < j; i++) {
				indicators[i].invalidate();
			}
		};

		var setup = function() {
			var offset = orbium.Tile.size/2-orbium.Marble.size/2;

			var col1 = color;
			var xpos1 = Math.round(that.xpos+offset);
			var ypos1 = Math.round(that.ypos+orbium.Tile.size*0.046);
			var indicator1 = new orbium.Indicator(xpos1, ypos1, col1);
			orbium.Util.addArrayElement(indicators, indicator1);

			var col2 = color+1;
			if (col2 === 4) {
				col2 = 0;
			}
			var xpos2 = Math.round(that.xpos+offset);
			var ypos2 = Math.round(that.ypos+orbium.Tile.size*0.344);
			var indicator2 = new orbium.Indicator(xpos2, ypos2, col2);
			orbium.Util.addArrayElement(indicators, indicator2);

			var col3 = color+2;
			if (col3 === 4) {
				col3 = 0;
			}
			if (col3 === 5) {
				col3 = 1;
			}
			var xpos3 = Math.round(that.xpos+offset);
			var offset = orbium.Tile.size*0.642;
			var ypos3 = Math.round(that.ypos+offset);
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
				return indicators[0].color === col;
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

		this.draw = function(idx) {
			if (idx === 0) {
				orbium.Tile.prototype.draw.call(this, 0);

				for (var i = 0, j = indicators.length; i < j; i++) {
					indicators[i].draw(0);
				}
			}
		};

		var that = this; this.construct.apply(this, arguments);
	};

	orbium.Sequencer.prototype = new orbium.Tile();
	orbium.Sequencer.prototype.constructor = orbium.Sequencer;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
