(function(orbium, undefined) {
	orbium.Perf = function() {
		var textFactor = 4;
		var perf0 = null;

		var t = null;
		var showing = null;
		var updateInterval = null;

		this.construct = function() {
			perf0 = document.getElementById("perf0");

			var margin = Math.round(orbium.Marble.size/6);
			perf0.style.padding = ""+margin+"px";

			t = 0;
			showing = false;
			updateInterval = 300/1000; // Update each 300 ms
		};

		this.show = function() {
			var left = orbium.xpos;
			var top = orbium.ypos+orbium.height-orbium.Marble.size;
			var width = Math.round(orbium.Marble.size*3.0);
			var height = orbium.Marble.size;
			var fontSize = Math.round(orbium.Tile.size/textFactor);

			perf0.style.left = ""+left+"px";
			perf0.style.top = ""+top+"px";
			perf0.style.width = ""+width+"px";
			perf0.style.height = ""+height+"px";
			perf0.style.fontSize = ""+fontSize+"px";

			perf0.style.visibility = "visible";

			showing = true;
		};

		this.update = function(dt) {
			t += dt;

			if (t > updateInterval && showing) {
				var fps = Math.round(1/dt);

				perf0.innerHTML = ""+fps+" fps";

				t = 0;
			}
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
