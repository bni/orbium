(function(orbium) {
	orbium.Matcher = function(count, xnr, ynr) {
		var indicators = null;
		var t = null;
		var refillSeconds = null;

		this.construct = function() {
			indicators = [];
			t = 0;
			refillSeconds = 30;

			orbium.Tile.prototype.construct.call(this, "matcher0", null, null, count, xnr, ynr);
		};

		this.destruct = function() {
			for (var i = 0, j = indicators.length; i < j; i++) {
				indicators[i].destruct();
			}

			orbium.Tile.prototype.destruct.call(this);
		};

		this.invalidate = function() {
			orbium.Tile.prototype.invalidate.call(this);

			for (var i = 0, j = indicators.length; i < j; i++) {
				indicators[i].invalidate();
			}
		};

		this.randColor = function() {
			return orbium.Util.generateRandomIndex(3);
		};

		this.fill = function() {
			var col1 = 0;
			var col2 = 0;
			var col3 = 0;
			var col4 = 0;

			// Randomize until non identical colors
			while (col1 === col2 &&	col2 === col3 &&
				col3 === col4 && col4 === col1) {
				col1 = this.randColor();
				col2 = this.randColor();
				col3 = this.randColor();
				col4 = this.randColor();
			}

			var xpos1 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var ypos1 = Math.round(this.ypos+orbium.Tile.size*0.046);
			var indicator1 = new orbium.Indicator(xpos1, ypos1, col1);
			orbium.Util.addArrayElement(indicators, indicator1);

			var xpos2 = Math.round(this.xpos+orbium.Tile.size*0.636);
			var ypos2 = Math.round(this.ypos+orbium.Tile.size*0.345);
			var indicator2 = new orbium.Indicator(xpos2, ypos2, col2);
			orbium.Util.addArrayElement(indicators, indicator2);

			var xpos3 = Math.round(this.xpos+orbium.Tile.size/2-orbium.Marble.size/2);
			var offset = orbium.Tile.size*0.642;
			var ypos3 = Math.round(this.ypos+offset);
			var indicator3 = new orbium.Indicator(xpos3, ypos3, col3);
			orbium.Util.addArrayElement(indicators, indicator3);

			var xpos4 = Math.round(this.xpos+orbium.Tile.size*0.054);
			var ypos4 = Math.round(this.ypos+orbium.Tile.size*0.345);
			var indicator4 = new orbium.Indicator(xpos4, ypos4, col4);
			orbium.Util.addArrayElement(indicators, indicator4);

			this.invalidate();
		};

		this.active = function() {
			if (indicators.length > 0) {
				return true;
			}

			return false;
		};

		this.matches = function(check) {
			for (var i = 0, j = check.length; i < j; i++) {
				if (check[i] !== indicators[i].color) {
					return false;
				}
			}

			t = 0;
			indicators.length = 0;
			this.invalidate();

			return true;
		};

		this.update = function(dt) {
			t += dt;

			if (t > refillSeconds && indicators.length === 0) {
				this.fill();
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

		this.construct.apply(this, arguments);
	}; orbium.Matcher.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
