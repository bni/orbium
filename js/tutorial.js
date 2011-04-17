(function(orbium, undefined) {
	orbium.Tutorial = function() {
		var textFactor = 5;

		var tutorial0 = null;

		var enabled = null;
		var t = null;

		var entries = [
			[
				"TAP CAROUSEL TO ROTATE IT",
				"CLICK CAROUSEL TO ROTATE IT",
				Math.round(orbium.Tile.size*5+orbium.Marble.size/3),
				Math.round(orbium.Marble.size*2),
				Math.round(orbium.Tile.size*2.0),
				Math.round(orbium.Marble.size*1.7),
				2,
				5
			], [
				"SWIPE OVER ORB TO LAUNCH IT",
				"CLICK ORB TO LAUNCH IT",
				Math.round(orbium.Tile.size*5+orbium.Marble.size/3),
				Math.round(orbium.Marble.size*2),
				Math.round(orbium.Tile.size*2.0),
				Math.round(orbium.Marble.size*1.7),
				6,
				10
			], [
				"FILL CAROUSEL WITH 4 ORBS OF THE SAME COLOR TO EXPLODE IT",
				"FILL CAROUSEL WITH 4 ORBS OF THE SAME COLOR TO EXPLODE IT",
				Math.round(orbium.Tile.size/2),
				Math.round(orbium.Marble.size*2.2),
				Math.round(orbium.Tile.size*2.1),
				Math.round(orbium.Marble.size*3.4),
				11,
				17
			], [
				"EXPLODE ALL CAROUSELS TO COMPLETE LEVEL",
				"EXPLODE ALL CAROUSELS TO COMPLETE LEVEL",
				Math.round(orbium.Tile.size/2),
				Math.round(orbium.Marble.size*2.2),
				Math.round(orbium.Tile.size*2.1),
				Math.round(orbium.Marble.size*2.5),
				18,
				22
			], [
				"TAP ABOVE TO PAUSE AND SHOW MENU",
				"CLICK ABOVE TO PAUSE AND SHOW MENU",
				Math.round(orbium.Tile.size/2),
				Math.round(orbium.Tile.size*3+orbium.Marble.size*1.6),
				Math.round(orbium.Tile.size*2.0),
				Math.round(orbium.Marble.size*2.5),
				23,
				27
			], [
				"SHOWS COLOR OF NEXT ORB",
				"SHOWS COLOR OF NEXT ORB",
				Math.round(orbium.Tile.size*5.5),
				Math.round(orbium.Tile.size*3+orbium.Marble.size*1.6),
				Math.round(orbium.Tile.size*2.0),
				Math.round(orbium.Marble.size*1.7),
				28,
				32
			]
		];

		var current = null;

		var showing = null;
		var fromSeconds = null;
		var toSeconds = null;

		this.construct = function() {
			tutorial0 = document.getElementById("tutorial0");

			var margin = Math.round(orbium.Marble.size/6);
			tutorial0.style.padding = ""+margin+"px";

			this.reset();
		};

		this.reset = function() {
			// If not set set it to true
			enabled = orbium.storage.readValue("tutorial");
			if (enabled === null) {
				orbium.storage.writeValue("tutorial", true);
			}

			// Find if tutorial is enabled
			enabled = orbium.storage.readValue("tutorial");
			if (enabled === "true") {
				enabled = true;
			} else {
				enabled = false;
			}

			if (this.checkDisableTutorial()) {
				enabled = false;
			}

			t = 0;

			current = 0;
			showing = false;
			fromSeconds = 0;
			toSeconds = 0;
		};

		this.checkDisableTutorial = function() {
			// Disable tutorial if level_show is present
			if (orbium.level_show !== undefined) {
				return true;
			}

			// Disable tutorial if in editor mode
			if (orbium.Machine.editorMode) {
				return true;
			}

			return false;
		}

		this.show = function() {
			showing = true;

			var left = orbium.xpos+entries[current][2];
			var top = orbium.ypos+entries[current][3];
			var width = entries[current][4];
			var height = entries[current][5];
			var fontSize = Math.round(orbium.Tile.size/textFactor);

			tutorial0.style.left = ""+left+"px";
			tutorial0.style.top = ""+top+"px";
			tutorial0.style.width = ""+width+"px";
			tutorial0.style.height = ""+height+"px";
			tutorial0.style.fontSize = ""+fontSize+"px";

			if (orbium.has_touch_screen) {
				tutorial0.innerHTML = entries[current][0];
			} else {
				tutorial0.innerHTML = entries[current][1];
			}

			tutorial0.style.visibility = "visible";
		};

		this.hide = function() {
			showing = false;

			tutorial0.style.visibility = "hidden";

			current++;
		};

		this.update = function(dt) {
			t += dt;

			if (enabled && orbium.machine.levnr === 0 &&
				current < entries.length) {
				fromSeconds = entries[current][6];
				toSeconds = entries[current][7];

				if (t > fromSeconds && t < toSeconds && !showing) {
					this.show();
				} else if (t > toSeconds && showing) {
					this.hide();
				}
			}
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
