(function(orbium) {
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
			this.levnr = orbium.storage.readValue("lastlevel");
			if (this.levnr !== null) {
				this.levnr = parseInt(this.levnr);
			}

			// If not set start at level -1, else decr level with one
			if (this.levnr === null) {
				this.levnr = -1;
			} else if (this.levnr > orbium.level.length-1) {
				this.levnr = -1;
			} else {
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
			if (!orbium.Machine.editorMode) {
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

				// If reached level is higher than available levels, write
				// available levels as reached
				if (reached !== null && reached > orbium.level.length-1) {
					orbium.storage.writeValue("reachedlevel", orbium.level.length-1);
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
			orbium.menu.fail(msg);
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
			if (!this.paused) {
				for (var i = 0, j = this.tiles.length; i < j; i++) {
					var tile = this.tiles[i];

					if (tile instanceof orbium.Rotator) {
						tile.triggerRotate(xtap, ytap);
					} else if (tile instanceof orbium.Counter) {
						if (orbium.Util.withinRect(
							xtap,
							ytap,
							tile.xpos,
							tile.ypos,
							orbium.Tile.size,
							orbium.Tile.size)) {
							orbium.menu.pause();
						}
					}
				}
			}

			if (orbium.editor.selected !== null) {
				//console.log("selected: "+orbium.editor.selected);

				for (i = 0, j = this.tiles.length; i < j; i++) {
					var target = this.tiles[i];

					if (target instanceof orbium.Counter) {
						if (orbium.Util.withinRect(
							xtap,
							ytap,
							target.xpos,
							target.ypos,
							orbium.Tile.size,
							orbium.Tile.size)) {
							orbium.menu.pause();
						}
					} else {
						if (orbium.Util.withinRect(
							xtap,
							ytap,
							target.xpos,
							target.ypos,
							orbium.Tile.size,
							orbium.Tile.size)) {
								var xnr = target.xpos/orbium.Tile.size;
								var ynr = (target.ypos-orbium.Bar.height)/orbium.Tile.size;
								var idx = ynr*orbium.Machine.horizTiles+xnr;

								target.destruct();
								this.createTile(orbium.editor.selected, idx, xnr, ynr);
								this.calculateBases();
								this.lane.calculateSinks();
						}
					}
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
			e.preventDefault();

			if (this.xorg === null && this.yorg === null) {
				this.xorg = this.findXPos(e);
				this.yorg = this.findYPos(e);
			}
		};

		this.moveDrag = function(e) {
			e.stopPropagation();
			e.preventDefault();

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
			e.preventDefault();

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

		this.checkTile = function(tile) {
			for (var i = 0, j = this.marbles.length; i < j; i++) {
				var marble = this.marbles[i];

				// Check if marble is above tile and we should invalidate it
				if (orbium.Util.withinRect(
					marble.xpos,
					marble.ypos,
					tile.xpos,
					tile.ypos,
					orbium.Tile.size,
					orbium.Tile.size) ||
				orbium.Util.withinRect(
					marble.xpos+orbium.Marble.size,
					marble.ypos+orbium.Marble.size,
					tile.xpos,
					tile.ypos,
					orbium.Tile.size,
					orbium.Tile.size)) {
					tile.invalidate();
				}

				// Perform action on marble
				tile.influenceMarble(marble);
			}

			for (i = 0, j = this.marbles.length; i < j; i++) {
				var checkMarble = this.marbles[i];

				if (checkMarble !== undefined && checkMarble.stale) {
					checkMarble.destruct();
					orbium.Util.removeArrayElement(this.marbles, checkMarble);
					this.counter.countActiveMarbles();
				}
			}
		};

		this.run = function() {
			if (this.loaded) {
				var curr = new Date().getTime();
				var dt = (curr-this.last)/1000;
				this.last = curr;

				//orbium.ctx.clearRect(0, 0, orbium.width, orbium.height);

				// Only update if not paused
				if (!this.paused) {
					this.lane.update(dt);

					for (var i = 0, j = this.tiles.length; i < j; i++) {
						var tile = this.tiles[i];

						if (tile.update !== undefined) {
							tile.update(dt);
						}

						this.checkTile(tile);
					}

					for (i = 0, j = this.marbles.length; i < j; i++) {
						this.marbles[i].update(dt);
					}

					orbium.sign.update(dt);
					orbium.tutorial.update(dt);
					orbium.perf.update(dt);
				}

				this.lane.draw();

				for (i = 0, j = this.tiles.length; i < j; i++) {
					tile = this.tiles[i];

					tile.draw(0);
					tile.draw(1);
				}

				for (i = 0, j = this.marbles.length; i < j; i++) {
					this.marbles[i].draw(0);
				}

				for (i = 0, j = this.tiles.length; i < j; i++) {
					this.tiles[i].draw(2);
				}

				if (this.first) {
					this.first = false;

					this.hideProgress();

					orbium.menu.showMain();
				}
			} else {
				var num = 0;
				for (i = 0, j = orbium.loader.props.length; i < j; i++) {
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

		this.construct.apply(this, arguments);
	};
}(window.orbium = window.orbium || {}));
