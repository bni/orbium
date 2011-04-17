(function(orbium, undefined) {
	orbium.Editor = function() {
		this.selected = null;

		var shadowFactor = 17;
		var textFactor = 2.5;

		var menu = null;

		var edt = null;
		var sav = null;
		var tst = null;

		this.construct = function() {
			this.selected = null;

			menu = document.getElementById("menu");

			edt = document.getElementById("edt");
			sav = document.getElementById("sav");
			tst = document.getElementById("tst");

			var fontSize = Math.round(orbium.Tile.size/textFactor);

			sav.style.fontSize = ""+fontSize+"px";
			tst.style.fontSize = ""+fontSize+"px";

			if (orbium.has_touch_api) {
				orbium.Util.attachListener(tst, "touchstart",
					function() {orbium.menu.start();});
			} else {
				orbium.Util.attachListener(tst, "mousedown",
					function() {orbium.menu.start();});
			}

			var components = [
				["E00", "emptytile0", ""],
				["R00", "rotatile14", "rotator0"],
				["H00", "horiztile0", ""],
				["V00", "verttile0", ""],
				["X00", "crosstile0", ""],
				["N00", "counter0", ""],
				["I10", "modtile13", "inspector0"],
				["I00", "modtile12", "inspector0"],
				["I20", "modtile14", "inspector0"],
				["P10", "modtile13", "teleporter1"],
				["P00", "modtile12", "teleporter0"],
				["P20", "modtile14", "teleporter2"],
				["T10", "modtile13", "transformer0"],
				["T00", "modtile12", "transformer0"],
				["T20", "modtile14", "transformer0"],
				["C00", "clock0", ""],
				["M00", "matcher0", ""],
				["S00", "sequencer0", ""],
				["D00", "modtile4", "director0"],
				["D10", "modtile5", "director1"],
				["D20", "modtile6", "director2"],
				["D30", "modtile7", "director3"],
				["F00", "verttile0", ""],
				["A00", "announcer0", ""]
			];

			var offset = orbium.Tile.size/8;
			var x = 0;
			var y = 0;

			for (var i = 0, j = components.length; i < j; i++) {
				var type = components[i][0];

				var xp = offset+x*orbium.Tile.size;
				var yp = offset+y*orbium.Tile.size;

				var tile = document.createElement("div");
				tile.id = "base_"+type;
				tile.style.left = ""+xp+"px";
				tile.style.top = ""+yp+"px";
				tile.style.position = "absolute";
				tile.style.padding = "0px";
				tile.style.margin = "0px";
				tile.style.backgroundRepeat = "no-repeat";
				tile.style.width = orbium.Tile.size+"px";
				tile.style.height = orbium.Tile.size+"px";
				tile.style.zIndex = 100;
				tile.style.backgroundImage = "url("+
					orbium.gfx_path+components[i][1]+".png)";
				edt.appendChild(tile);

				var overlay = document.createElement("div");
				overlay.id = ""+type;
				overlay.style.left = ""+xp+"px";
				overlay.style.top = ""+yp+"px";
				overlay.style.position = "absolute";
				overlay.style.padding = "0px";
				overlay.style.margin = "0px";
				overlay.style.backgroundRepeat = "no-repeat";
				overlay.style.width = orbium.Tile.size+"px";
				overlay.style.height = orbium.Tile.size+"px";
				overlay.style.zIndex = 101;
				if (components[i][2] !== "") {
					overlay.style.backgroundImage = "url("+
						orbium.gfx_path+components[i][2]+".png)";
				}
				overlay.style.cursor = "pointer";

				edt.appendChild(overlay);

				var ol = document.getElementById(""+type);
				if (orbium.has_touch_api) {
					orbium.Util.attachListener(ol, "touchstart",
						function(e) {orbium.editor.place(e);});
				} else {
					orbium.Util.attachListener(ol, "mousedown",
						function(e) {orbium.editor.place(e);});
				}

				if (x === 5) {
					x = 0;
					y++;
				} else {
					x++;
				}
			}
		};

		this.showEdit = function() {
			menu.style.visibility = "visible";
			menu.style.opacity = "1.0";
			menu.style.filter = "alpha(opacity=100)";

			edt.style.visibility = "visible";
			sav.style.visibility = "visible";
			tst.style.visibility = "visible";

			var offset = orbium.Tile.size/8;
			var yp = offset+4*orbium.Tile.size;

			sav.style.left = "5%";
			sav.style.top = ""+yp+"px";

			tst.style.left = "30%";
			tst.style.top = ""+yp+"px";
		};

		this.hideEdit = function() {
			edt.style.visibility = "hidden";
			sav.style.visibility = "hidden";
			tst.style.visibility = "hidden";
		};

		this.edit = function() {
			orbium.menu.hideLvl();
			this.showEdit();
		};

		this.place = function(e) {
			if (!e) e = window.event;
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();

			var type = null;

			if (e.touches && e.touches.length) {
				type = e.touches[0].target.id;
			} else if (e.target) {
				type = e.target.id;
			} else if (e.srcElement) {
				type = e.srcElement.id;
			}

			orbium.menu.hideMain();
			this.hideEdit();

			this.selected = type;
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
