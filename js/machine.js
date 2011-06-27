(function(orbium, undefined) {
	orbium.Machine = function() {
		this.lane = null;
		this.tiles = null;
		this.marbles = null;
		this.last = null;
		this.loaded = null;
		this.levnr = null;

		this.xorg = null;
		this.yorg = null;

		this.counter = null;
		this.clock = null;
		this.announcer = null;
		this.matcher = null;
		this.sequencer = null;

		this.paused = null;
		this.first = null;

		this.nextColor = null;

		this.construct = function() {
			this.tiles = [];

			this.marbles = [];
			this.last = new Date().getTime();
			this.loaded = false;
			this.levnr = -1;

			this.xorg = null;
			this.yorg = null;

			this.paused = true;
			this.first = true;

			// Read the level we played last
			if (orbium.storage !== undefined) {
				this.levnr = orbium.storage.readValue("lastlevel");
			}

			if (this.levnr !== null) {
				this.levnr = parseInt(this.levnr);
			}

			// If not set start at level -1, else decr level with one
			if (this.levnr === null) {
				this.levnr = -1;
			} else if (this.levnr > orbium.level.length-1) {
				this.levnr = -1;
			} else if (this.levnr > -1) {
				this.levnr--;
			}
		};

		this.prevLevel = function() {
			if (this.levnr > 0) {
				this.levnr -= 2;
				this.nextLevel();
			}
		};

		this.nextLevel = function() {
			if (this.levnr < orbium.level.length-1) {
				this.levnr++;

				if (this.lane !== null) {
					this.lane.destruct();
				}

				for (var i = 0, j = this.tiles.length; i < j; i++) {
					this.tiles[i].destruct();
				}
				this.tiles.length = 0;

				for (i = 0, j = this.marbles.length; i < j; i++) {
					this.marbles[i].destruct();
				}
				this.marbles.length = 0;

				// Set special tiles to null
				this.counter = null;
				this.clock = null;
				this.announcer = null;
				this.matcher = null;
				this.sequencer = null;

				// Add tiles
				var count=0;
				for (var ynr = 0; ynr < orbium.Machine.vertTiles; ynr++) {
					for (var xnr = 0; xnr < orbium.Machine.horizTiles; xnr++) {
						var symbol = orbium.level[this.levnr][count];

						this.createTile(symbol, count, xnr, ynr);

						count++;
					}
				}

				// Set the correct base for tiles
				this.calculateBases();

				this.lane = new orbium.Lane();

				// Save level progress
				this.saveLevel(this.levnr);
			}
		};

		this.createTile = function(symbol, count, xnr, ynr) {
			var prefix = symbol.substring(0, 1);
			var middle = symbol.substring(1, 2);
			var suffix = symbol.substring(2, 3);

			var variant = parseInt(middle);
			var color = parseInt(suffix);

			if (prefix === "E") {
				var emptytile = new orbium.EmptyTile(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, emptytile);
			} else if (prefix === "R") {
				var rotator = new orbium.Rotator(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, rotator);
			} else if (prefix === "H") {
				var horiztile = new orbium.HorizTile(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, horiztile);
			} else if (prefix === "V") {
				var verttile = new orbium.VertTile(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, verttile);
			} else if (prefix === "X") {
				var crosstile = new orbium.CrossTile(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, crosstile);
			} else if (prefix === "I") {
				var inspector = new orbium.Inspector(count, xnr, ynr,
					variant, color);
				orbium.Util.setArrayElement(count, this.tiles, inspector);
			} else if (prefix === "P") {
				var teleporter = new orbium.Teleporter(count, xnr, ynr,
					variant);
				orbium.Util.setArrayElement(count, this.tiles, teleporter);
			} else if (prefix === "T") {
				var transformer = new orbium.Transformer(count, xnr, ynr,
					variant, color);
				orbium.Util.setArrayElement(count, this.tiles, transformer);
			} else if (prefix === "D") {
				var director = new orbium.Director(count, xnr, ynr, variant);
				orbium.Util.setArrayElement(count, this.tiles, director);
			} else if (prefix === "N") {
				this.counter = new orbium.Counter(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, this.counter);
			} else if (prefix === "C") {
				this.clock = new orbium.Clock(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, this.clock);
			} else if (prefix === "M") {
				this.matcher = new orbium.Matcher(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, this.matcher);
			} else if (prefix === "S") {
				this.sequencer = new orbium.Sequencer(count, xnr, ynr, color);
				orbium.Util.setArrayElement(count, this.tiles, this.sequencer);
			} else if (prefix === "F") {
				var falltile = new orbium.FallTile(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, falltile);
			} else if (prefix === "A") {
				this.announcer = new orbium.Announcer(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, this.announcer);
			} else {
				var unknown = new orbium.EmptyTile(count, xnr, ynr);
				orbium.Util.setArrayElement(count, this.tiles, unknown);
			}
		};

		this.calculateBases = function() {
			// Set the correct base for tiles
			for (var i = 0, j = this.tiles.length; i < j; i++) {
				this.tiles[i].setBase();
			}
		};

		this.saveLevel = function(levnr) {
			if (!orbium.Machine.editorMode && orbium.storage !== undefined) {
				// Remember this is the level we played last
				orbium.storage.writeValue("lastlevel", levnr);

				// Read the level we have reached
				var reached = orbium.storage.readValue("reachedlevel");
				if (reached !== null) {
					reached = parseInt(reached);
				}

				// Save reached level if higher than ever before
				if (reached === null || levnr > reached) {
					orbium.storage.writeValue("reachedlevel", levnr);
				}

				var rl = orbium.level.length-1;

				// If reached level is higher than available levels, write
				// available levels as reached
				if (reached !== null && reached > rl) {
					orbium.storage.writeValue("reachedlevel", rl);
				}
			}
		};

		this.resetLevel = function() {
			this.levnr--;
			this.nextLevel();
		};

		this.startLevel = function() {
			this.paused = false;
			this.lane.injectMarble();
		};

		this.restartLevel = function() {
			this.paused = false;
			this.resetLevel();
			this.lane.injectMarble();
		};

		this.failLevel = function(msg) {
			this.paused = true;

			if (orbium.menu !== undefined) {
				orbium.menu.fail(msg);
			}
		};

		this.randomizeNextColor = function() {
			this.nextColor = orbium.Util.generateRandomIndex(3);

			if (this.announcer !== null) {
				this.announcer.announceNextColor(this.nextColor);
			}
		};

		this.checkLevelComplete = function() {
			var complete = true;

			for (var i = 0, j = this.tiles.length; i < j; i++) {
				var tile = this.tiles[i];

				if (tile instanceof orbium.Rotator) {
					if (!tile.broken) {
						complete = false;
					}
				}
			}

			if (complete) {
				this.paused = true;
				orbium.menu.showCompl();
			}
		};

		this.findXPos = function(e) {
			var xpos = 0;

			if (e.touches && e.touches.length) {
				xpos = e.touches[0].clientX-orbium.xpos;
			} else if (e.clientX) {
				xpos = e.clientX-orbium.xpos;
			} else if (e.pageX) 	{
				xpos = e.pageX-orbium.xpos;
			}

			return xpos;
		};

		this.findYPos = function(e) {
			var ypos = 0;

			if (e.touches && e.touches.length) {
				ypos = e.touches[0].clientY-orbium.ypos;
			} else if (e.clientY) {
				ypos = e.clientY-orbium.ypos;
			} else if (e.pageY) 	{
				ypos = e.pageY-orbium.ypos;
			}

			return ypos;
		};

		this.checkMouse = function(xtap, ytap) {
			var launched = false;

			// Check if a dockee should be launched
			for (var i = 0, j = this.tiles.length; i < j; i++) {
				var tile = this.tiles[i];

				if (tile instanceof orbium.Rotator) {
					if (tile.triggerLaunchPosition(xtap, ytap)) {
						launched = true;
					}
				}
			}

			// If no dockee was launched, rotate
			if (!launched) {
				this.checkTap(xtap, ytap);
			}
		};

		this.checkTap = function(xtap, ytap) {
			var idx = Math.floor(xtap/orbium.Tile.size);
			var idy = Math.floor((ytap-orbium.Bar.height)/orbium.Tile.size);
			var count = idy*orbium.Machine.horizTiles+idx;

			var target = this.tiles[count];

			if (!this.paused) {
				if (target instanceof orbium.Rotator) {
					target.triggerRotate(xtap, ytap);
				} else if (target instanceof orbium.Counter) {
					orbium.menu.pause();
				}
			}

			if (orbium.editor.selected !== null) {
				if (target instanceof orbium.Counter) {
					orbium.menu.pause();
				} else {
					target.destruct();
					this.createTile(orbium.editor.selected, count, idx, idy);
					this.calculateBases();
					this.lane.calculateSinks();
				}
			}
		};

		this.checkDrag = function(xtap, ytap, dir) {
			for (var i = 0, j = this.tiles.length; i < j; i++) {
				var tile = this.tiles[i];

				if (tile instanceof orbium.Rotator) {
					if (tile.triggerLaunchDirection(xtap, ytap, dir)) {
						return true;
					}
				}
			}

			return false;
		};

		this.mouseDown = function(e) {
			if (!e) {e = window.event;}
			e.cancelBubble = true;
			if (e.stopPropagation) {e.stopPropagation();}

			var xmouse = this.findXPos(e);
			var ymouse = this.findYPos(e);

			this.checkMouse(xmouse, ymouse);
		};

		this.startDrag = function(e) {
			e.stopPropagation();

			if (this.xorg === null && this.yorg === null) {
				this.xorg = this.findXPos(e);
				this.yorg = this.findYPos(e);
			}
		};

		this.moveDrag = function(e) {
			e.stopPropagation();

			if (this.xorg !== null && this.yorg !== null) {
				var xcur = this.findXPos(e);
				var ycur = this.findYPos(e);

				var dx = xcur-this.xorg;
				var dy = ycur-this.yorg;

				// Check wich direction the drag was and launch accordingly
				if (dx < -orbium.Marble.size) {
					if (this.checkDrag(this.xorg, this.yorg, 3)) {
						this.xorg = null;
						this.yorg = null;
					}
				} else if (dx > orbium.Marble.size) {
					if (this.checkDrag(this.xorg, this.yorg, 1)) {
						this.xorg = null;
						this.yorg = null;
					}
				} else if (dy < -orbium.Marble.size) {
					if (this.checkDrag(this.xorg, this.yorg, 0)) {
						this.xorg = null;
						this.yorg = null;
					}
				} else if (dy > orbium.Marble.size) {
					if (this.checkDrag(this.xorg, this.yorg, 2)) {
						this.xorg = null;
						this.yorg = null;
					}
				}
			}
		};

		this.endDrag = function(e) {
			e.stopPropagation();

			if (this.xorg !== null && this.yorg !== null) {
				this.checkTap(this.xorg, this.yorg);
				this.xorg = null;
				this.yorg = null;
			}
		};

		this.showProgress = function(pct) {
			// Only draw progress if we are running over the web with http(s)
			if (orbium.has_canvas && !orbium.Util.isPG()) {
				orbium.ctx.fillStyle = "#808080";
				orbium.ctx.fillRect(0, 0, orbium.width, 10);
				orbium.ctx.fillStyle = "#ffffff";
				orbium.ctx.fillRect(1, 1, Math.round(orbium.width*pct-2), 8);
			} else if (!orbium.has_canvas && !orbium.Util.isPG()) {
				var progress0 = document.getElementById("progress0");
				progress0.style.visibility = "visible";
				progress0.style.left = ""+orbium.xpos+"px";
				progress0.style.top = ""+orbium.ypos+"px";
				progress0.style.width = ""+orbium.width+"px";
				progress0.style.height = "10px";

				var progress1 = document.getElementById("progress1");
				progress1.style.visibility = "visible";
				var left = orbium.xpos+1;
				var top = orbium.ypos+1;
				var width = Math.round(orbium.width*pct-2);
				progress1.style.left = ""+left+"px";
				progress1.style.top = ""+top+"px";
				progress1.style.width = ""+width+"px";
				progress1.style.height = "8px";
			}
		};

		this.hideProgress = function() {
			// If we run on device and from the web, try to hide address bar
			if (orbium.has_touch_screen && !orbium.Util.isPG()) {
				setTimeout(function() {window.scrollTo(0, 1);}, 1000);
			}

			if (!orbium.has_canvas && !orbium.Util.isPG()) {
				var progress0 = document.getElementById("progress0");
				progress0.style.visibility = "hidden";
				var progress1 = document.getElementById("progress1");
				progress1.style.visibility = "hidden";
			}

			var pane = document.getElementById("pane");
			pane.style.visibility = "visible";
		};

		this.checkRotatorsFull = function() {
			var again = true;

			while (again) {
				again = false;

				for (var i = 0, j = this.tiles.length; i < j; i++) {
					var tile = this.tiles[i];

					if (tile instanceof orbium.Rotator) {
						if (tile.checkFull()) {
							again = true;
						}
					}
				}
			}
		};

		this.rotateRotator = function(count) {
			var tile = this.tiles[count];

			if (tile instanceof orbium.Rotator) {
				tile.rotate(false);
			}
		};

		this.launchRotator = function(count, dir) {
			var tile = this.tiles[count];

			if (tile instanceof orbium.Rotator) {
				tile.launchDirection(dir, false);
			}
		};

		this.getState = function() {
			var state = {
				rotators: [],
				marbles: []
			};

			// Rotators
			for (var i = 0, j = this.tiles.length; i < j; i++) {
				var tile = this.tiles[i];

				if (tile.getState !== undefined) {
					var dist = tile.getState();
					orbium.Util.addArrayElement(state.rotators, dist);
				}
			}

			// Marbles
			for (i = 0, j = this.marbles.length; i < j; i++) {
				var marble = this.marbles[i];

				if (!marble.stale) {
					var dist = marble.getState()
					orbium.Util.addArrayElement(state.marbles, dist);
				}
			}

			//announcer: 0,
			//sequencer: [],
			//matcher: []

			return state;
		}

		this.setState = function(state) {
			// Marbles
			for (var i = 0, j = this.marbles.length; i < j; i++) {
				this.marbles[i].destruct();
			}
			this.marbles.length = 0;

			for (i = 0, j = state.marbles.length; i < j; i++) {
				var marb = state.marbles[i];
				
				var xp = marb.xpos*(orbium.Tile.size/128);
				var yp = marb.ypos*(orbium.Tile.size/128);

				var marble = new orbium.Marble(
					xp,
					yp,
					marb.color,
					marb.frame,
					marb.direction,
					marb.fresh);

				orbium.Util.addArrayElement(this.marbles, marble);
			}

			// Rotators
			for (i = 0, j = state.rotators.length; i < j; i++) {
				var rotator = state.rotators[i];

				var tile = this.tiles[rotator.count];

				if (tile instanceof orbium.Rotator) {
					tile.setState(rotator);
				}
			}
		};

		var updateTiles = function(dt) {
			for (var i = 0, j = that.tiles.length; i < j; i++) {
				that.tiles[i].update(dt);
			}
		};

		var updateMarbles = function(dt) {
			for (var i = 0, j = that.marbles.length; i < j; i++) {
				var marble = that.marbles[i];

				if (marble.fresh) {
					that.lane.update(dt, marble);

					var idx = Math.floor(marble.xpos/orbium.Tile.size);

					if (idx >= 0 && idx < orbium.Machine.horizTiles) {
						that.tiles[idx].influence(marble);
					}
				} else {
					var x1 = marble.xpos;
					var y1 = marble.ypos-orbium.Bar.height;
					var idx1 = Math.floor(x1/orbium.Tile.size);
					var idy1 = Math.floor(y1/orbium.Tile.size);
					var count1 = idy1*orbium.Machine.horizTiles+idx1;

					var x2 = marble.xpos+orbium.Marble.size;
					var y2 = marble.ypos+orbium.Marble.size-orbium.Bar.height;
					var idx2 = Math.floor(x2/orbium.Tile.size);
					var idy2 = Math.floor(y2/orbium.Tile.size);
					var count2 = idy2*orbium.Machine.horizTiles+idx2;

					var tile1 = that.tiles[count1];

					if (tile1 !== undefined) {
						tile1.invalidate();
						tile1.influence(marble);
					} else { // The marble is on top of lane
						that.lane.update(dt, marble);
					}

					if (count1 !== count2) {
						var tile2 = that.tiles[count2];

						if (tile2 !== undefined) {
							tile2.invalidate();
							tile2.influence(marble);
						}
					}
				}

				marble.update(dt);
			}
		};

		var removeStaleMarbles = function() {
			for (var i = 0, j = that.marbles.length; i < j; i++) {
				var checkMarble = that.marbles[i];

				if (checkMarble !== undefined && checkMarble.stale) {
					checkMarble.destruct();
					orbium.Util.removeArrayElement(that.marbles, checkMarble);
					that.counter.countActiveMarbles();

					// Send full state to all clients here, after stale marbles
					// has been removed
					if (orbium.server !== undefined) {
						var state = orbium.machine.getState();
						orbium.server.broadcast(state, undefined);
					}
				}
			}
		};

		var updateSigns = function(dt) {
			if (orbium.sign !== undefined) {
				orbium.sign.update(dt);
			}

			if (orbium.tutorial !== undefined) {
				orbium.tutorial.update(dt);
			}

			if (orbium.perf !== undefined) {
				orbium.perf.update(dt);
			}
		};

		var drawLane = function() {
			that.lane.draw();
		};

		var drawTilesFirstPass = function() {
			for (var i = 0, j = that.tiles.length; i < j; i++) {
				var tile = that.tiles[i];

				tile.draw(0);
				tile.draw(1);
			}
		};

		var drawMarbles = function() {
			for (var i = 0, j = that.marbles.length; i < j; i++) {
				that.marbles[i].draw(0);
			}
		};

		var drawTilesSecondPass = function() {
			for (var i = 0, j = that.tiles.length; i < j; i++) {
				that.tiles[i].draw(2);
			}
		};

		this.run = function() {
			if (this.loaded) {
				var curr = new Date().getTime();
				var dt = (curr-this.last)/1000;
				this.last = curr;

				//orbium.ctx.clearRect(0, 0, orbium.width, orbium.height);

				// Sometimes there can be a scheduling delay resulting in a
				// large delta time, we want to filter those ticks out.
				// This also happens if browser supports requestAnimationFrame
				// and the user swithces to another tab.
				// It can also happen if the fps is very low. 100 ms (10 fps)
				if (dt < 0.1) {
					// Only update if not paused
					if (!this.paused) {
						updateTiles(dt);
						updateMarbles(dt);
						removeStaleMarbles();
						updateSigns(dt);
					}

					drawLane();
					drawTilesFirstPass();
					drawMarbles();
					drawTilesSecondPass();

					if (this.first) {
						this.first = false;

						this.hideProgress();

						orbium.menu.showMain();
					}
				}
			} else {
				var num = 0;
				for (var i = 0, j = orbium.loader.props.length; i < j; i++) {
					var prop = orbium.loader.props[i];

					if (orbium.loader[prop].complete ||
						orbium.loader[prop].failure) {
						num++;
					}
				}

				var len = orbium.loader.props.length;
				var pct = num/len;
				this.showProgress(pct);

				if (num === len) {
					this.loaded = true;
				}
			}
		};

		var that = this; this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
