(function(orbium, undefined) {
	orbium.Sign = function() {
		var shadowFactor = 17;
		var textFactor = 2.5;

		var sign0 = null;

		var t = null;

		var showing = null;
		var toSeconds = null;

		this.construct = function() {
			sign0 = document.getElementById("sign0");

			var margin = Math.round(orbium.Marble.size/6);
			sign0.style.padding = ""+margin+"px";

			showing = false;

			toSeconds = 3;
		};

		this.show = function() {
			var left = Math.round(orbium.xpos+orbium.Marble.size/3);
			var top = Math.round(orbium.ypos+orbium.Marble.size/3);
			var width = Math.round(orbium.Marble.size*2.5);
			var height = Math.round(orbium.Marble.size*1.5);
			var fontSize = Math.round(orbium.Tile.size/textFactor);
			var textShadow = Math.round(orbium.Tile.size/shadowFactor);

			sign0.style.left = ""+left+"px";
			sign0.style.top = ""+top+"px";
			sign0.style.width = ""+width+"px";
			sign0.style.height = ""+height+"px";
			sign0.style.fontSize = ""+fontSize+"px";
			sign0.style.textShadow = "0px 0px "+textShadow+"px #ffffff";

			var lev = orbium.machine.levnr+1;
			if (lev < 10) {
				lev = "0"+lev;
			}

			sign0.innerHTML = lev;
			sign0.style.opacity = "0.8";
			sign0.style.filter = "alpha(opacity=80)";
			sign0.style.visibility = "visible";

			showing = true;
			t = 0;
		};

		this.hide = function() {
			sign0.style.visibility = "hidden";
			showing = false;
			t = 0;
		};

		this.update = function(dt) {
			t += dt;

			if (t > toSeconds && showing) {
				this.hide();
			}
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
