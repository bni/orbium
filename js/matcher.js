(function(orbium, undefined) {
	orbium.Matcher = function(count, xnr, ynr) {
		var indicators = null;
		var t = null;
		var refillSeconds = null;

		this.construct = function() {
			indicators = [];
			t = 0;
			refillSeconds = 30;

			orbium.Tile.prototype.construct.call(this, ["matcher0"], count,
				xnr, ynr);
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

		var randColor = function() {
			return orbium.Util.generateRandomIndex(3);
		};

		var activate = function() {
			var col1 = 0;
			var col2 = 0;
			var col3 = 0;
			var col4 = 0;

			// Randomize until non identical colors
			while (col1 === col2 &&	col2 === col3 &&
				col3 === col4 && col4 === col1) {
				col1 = randColor();
				col2 = randColor();
				col3 = randColor();
				col4 = randColor();
			}
			
			var offset = orbium.Tile.size/2-orbium.Marble.size/2;

			var xpos1 = Math.round(that.xpos+offset);
			var ypos1 = Math.round(that.ypos+orbium.Tile.size*0.046);
			var indicator1 = new orbium.Indicator(xpos1, ypos1, col1);
			orbium.Util.addArrayElement(indicators, indicator1);

			var xpos2 = Math.round(that.xpos+orbium.Tile.size*0.636);
			var ypos2 = Math.round(that.ypos+orbium.Tile.size*0.345);
			var indicator2 = new orbium.Indicator(xpos2, ypos2, col2);
			orbium.Util.addArrayElement(indicators, indicator2);

			var xpos3 = Math.round(that.xpos+offset);
			var ypos3 = Math.round(that.ypos+orbium.Tile.size*0.642);
			var indicator3 = new orbium.Indicator(xpos3, ypos3, col3);
			orbium.Util.addArrayElement(indicators, indicator3);

			var xpos4 = Math.round(that.xpos+orbium.Tile.size*0.054);
			var ypos4 = Math.round(that.ypos+orbium.Tile.size*0.345);
			var indicator4 = new orbium.Indicator(xpos4, ypos4, col4);
			orbium.Util.addArrayElement(indicators, indicator4);

			that.invalidate();
		};

		var deactivate = function() {
			for (var i = 0, j = indicators.length; i < j; i++) {
				indicators[i].destruct();
			}
			indicators.length = 0;

			t = 0;

			that.invalidate();
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

			deactivate();

			return true;
		};

		this.update = function(dt) {
			t += dt;

			if (t > refillSeconds && indicators.length === 0) {
				activate();
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

	orbium.Matcher.prototype = new orbium.Tile();
	orbium.Matcher.prototype.constructor = orbium.Matcher;
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
