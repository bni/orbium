(function(orbium, undefined) {
	orbium.Menu = function() {
		var shadowFactor = 17;
		var textFactor = 2.5;

		var menu = null;

		var main = null;
		var lvl = null;
		var sett = null;
		var abo = null;
		var creds = null;
		var fail = null;
		var compl = null;

		var start = null;
		var startFunc = null;
		var select = null;
		var settings = null;
		var about = null;

		var support = null;
		var credits = null;
		var filler5 = null;
		var abob = null;
		var copy = null;
		var filler6 = null;

		var pack = null;
		var nr = null;
		var edit = null;
		var prev = null;
		var next = null;
		var play = null;
		var lvlb = null;

		var sound = null;
		var tutorial = null;
		var limits = null;
		var filler0 = null;

		var debug = null;
		var logo = null;
		var settb = null;

		var dbg = null;
		var reset = null;
		var unlock = null;
		var editoron = null;
		var perfon = null;
		var connecton = null;

		var lgo = null;
		var lgob = null;
		var loading = null;
		var copyright = null;

		var info = null;
		var credb = null;

		var fai = null;
		var filler3 = null;
		var filler4 = null;
		var retry = null;
		var failb = null;

		var comp = null;
		var nextl = null;
		var compb = null;

		var contact = null;
		var gfx = null;

		this.construct = function() {
			menu = document.getElementById("menu");

			main = document.getElementById("main");
			lvl = document.getElementById("lvl");
			sett = document.getElementById("sett");
			abo = document.getElementById("abo");
			creds = document.getElementById("creds");
			fail = document.getElementById("fail");
			compl = document.getElementById("compl");

			start = document.getElementById("start");
			select = document.getElementById("select");
			settings = document.getElementById("settings");
			about = document.getElementById("about");

			support = document.getElementById("support");
			credits = document.getElementById("credits");
			filler5 = document.getElementById("filler5");
			abob = document.getElementById("abob");
			copy = document.getElementById("copy");
			filler6 = document.getElementById("filler6");

			pack = document.getElementById("pack");
			nr = document.getElementById("nr");
			edit = document.getElementById("edit");
			prev = document.getElementById("prev");
			next = document.getElementById("next");
			play = document.getElementById("play");
			lvlb = document.getElementById("lvlb");

			sound = document.getElementById("sound");
			tutorial = document.getElementById("tutorial");
			limits = document.getElementById("limits");
			filler0 = document.getElementById("filler0");

			debug = document.getElementById("debug");
			logo = document.getElementById("logo");
			settb = document.getElementById("settb");

			dbg = document.getElementById("dbg");
			reset = document.getElementById("reset");
			unlock = document.getElementById("unlock");
			editoron = document.getElementById("editoron");
			perfon = document.getElementById("perfon");
			connecton = document.getElementById("connecton");

			lgo = document.getElementById("lgo");
			lgob = document.getElementById("lgob");
			loading = document.getElementById("loading");
			copyright = document.getElementById("copyright");

			info = document.getElementById("info");
			credb = document.getElementById("credb");

			fai = document.getElementById("fai");
			filler3 = document.getElementById("filler3");
			filler4 = document.getElementById("filler4");
			retry = document.getElementById("retry");
			failb = document.getElementById("failb");

			comp = document.getElementById("comp");
			nextl = document.getElementById("nextl");
			compb = document.getElementById("compb");

			contact = document.getElementById("contact");
			gfx = document.getElementById("gfx");

			var left = orbium.xpos+orbium.Marble.size;
			var top = orbium.ypos+orbium.Marble.size;
			var width = orbium.width-orbium.Marble.size*2;
			var height = orbium.height-orbium.Marble.size*2;
			var textShadow = Math.round(orbium.Tile.size/shadowFactor);

			menu.style.visibility = "hidden";
			menu.style.left = ""+left+"px";
			menu.style.top = ""+top+"px";
			menu.style.width = ""+width+"px";
			menu.style.height = ""+height+"px";
			menu.style.fontSize = orbium.Tile.size+"px";
			menu.style.textShadow = "0px 0px "+textShadow+"px #ffffff";
			
			var fontSize = Math.round(orbium.Tile.size/textFactor);

			support.style.fontSize = ""+fontSize+"px";
			credits.style.fontSize = ""+fontSize+"px";
			filler5.style.fontSize = ""+fontSize+"px";
			abob.style.fontSize = ""+fontSize+"px";
			copy.style.fontSize = ""+fontSize+"px";
			filler6.style.fontSize = ""+fontSize+"px";

			pack.style.fontSize = ""+fontSize+"px";
			nr.style.fontSize = ""+fontSize+"px";
			edit.style.fontSize = ""+fontSize+"px";
			prev.style.fontSize = ""+fontSize+"px";
			next.style.fontSize = ""+fontSize+"px";
			play.style.fontSize = ""+fontSize+"px";
			lvlb.style.fontSize = ""+fontSize+"px";

			sound.style.fontSize = ""+fontSize+"px";
			tutorial.style.fontSize = ""+fontSize+"px";
			limits.style.fontSize = ""+fontSize+"px";
			filler0.style.fontSize = ""+fontSize+"px";

			debug.style.fontSize = ""+fontSize+"px";
			logo.style.fontSize = ""+fontSize+"px";
			settb.style.fontSize = ""+fontSize+"px";

			reset.style.fontSize = ""+fontSize+"px";
			unlock.style.fontSize = ""+fontSize+"px";
			editoron.style.fontSize = ""+fontSize+"px";
			perfon.style.fontSize = ""+fontSize+"px";
			connecton.style.fontSize = ""+fontSize+"px";

			info.style.fontSize = ""+fontSize+"px";
			credb.style.fontSize = ""+fontSize+"px";

			fai.style.fontSize = ""+fontSize+"px";
			filler3.style.fontSize = ""+fontSize+"px";
			filler4.style.fontSize = ""+fontSize+"px";
			retry.style.fontSize = ""+fontSize+"px";
			failb.style.fontSize = ""+fontSize+"px";

			comp.style.fontSize = ""+fontSize+"px";
			nextl.style.fontSize = ""+fontSize+"px";
			compb.style.fontSize = ""+fontSize+"px";
		};

		this.setupTouchEvents = function() {
			orbium.Util.attachListener(start, "touchstart",
				startFunc = function(e) {orbium.menu.start();});
			orbium.Util.attachListener(select, "touchstart",
				function(e) {orbium.menu.select();});
			orbium.Util.attachListener(settings, "touchstart",
				function(e) {orbium.menu.settings();});
			orbium.Util.attachListener(about, "touchstart",
				function(e) {orbium.menu.about();});

			orbium.Util.attachListener(pack, "touchstart",
				function(e) {orbium.menu.changePack();});
			orbium.Util.attachListener(edit, "touchstart",
				function(e) {orbium.editor.edit();});
			orbium.Util.attachListener(prev, "touchstart",
				function(e) {orbium.menu.prev();});
			orbium.Util.attachListener(next, "touchstart",
				function(e) {orbium.menu.next();});
			orbium.Util.attachListener(play, "touchstart",
				function(e) {orbium.menu.start();});
			orbium.Util.attachListener(lvlb, "touchstart",
				function(e) {orbium.menu.lvlb();});

			orbium.Util.attachListener(support, "touchstart",
				function(e) {orbium.menu.support();});
			orbium.Util.attachListener(credits, "touchstart",
				function(e) {orbium.menu.credits();});
			orbium.Util.attachListener(abob, "touchstart",
				function(e) {orbium.menu.abob();});

			orbium.Util.attachListener(sound, "touchstart",
				function(e) {orbium.menu.toggleSound();});
			orbium.Util.attachListener(tutorial, "touchstart",
				function(e) {orbium.menu.toggleTutorial();});
			orbium.Util.attachListener(limits, "touchstart",
				function(e) {orbium.menu.toggleLimits();});
			orbium.Util.attachListener(settb, "touchstart",
				function(e) {orbium.menu.settb();});

			orbium.Util.attachListener(debug, "touchstart",
				function(e) {orbium.menu.debug();});
			orbium.Util.attachListener(reset, "touchstart",
				function(e) {orbium.menu.reset();});
			orbium.Util.attachListener(unlock, "touchstart",
				function(e) {orbium.menu.unlock();});
			orbium.Util.attachListener(editoron, "touchstart",
				function(e) {orbium.menu.editoron();});
			orbium.Util.attachListener(perfon, "touchstart",
				function(e) {orbium.menu.perfon();});
			orbium.Util.attachListener(connecton, "touchstart",
				function(e) {orbium.menu.connecton();});

			orbium.Util.attachListener(logo, "touchstart",
				function(e) {orbium.menu.logo();});

			orbium.Util.attachListener(credb, "touchstart",
				function(e) {orbium.menu.credb();});

			orbium.Util.attachListener(retry, "touchstart",
				function(e) {orbium.menu.retry();});
			orbium.Util.attachListener(failb, "touchstart",
				function(e) {orbium.menu.failb();});

			orbium.Util.attachListener(nextl, "touchstart",
				function(e) {orbium.menu.playNext();});
			orbium.Util.attachListener(compb, "touchstart",
				function(e) {orbium.menu.compb();});

			orbium.Util.attachListener(contact, "touchstart",
				function(e) {orbium.menu.contact();});
			orbium.Util.attachListener(gfx, "touchstart",
				function(e) {orbium.menu.gfx();});

			this.updateStart();
			this.updateSound();
			this.updateTutorial();
			this.updateLimits();
		};

		this.setupMouseEvents = function() {
			orbium.Util.attachListener(start, "mousedown",
				startFunc = function(e) {orbium.menu.start();});
			orbium.Util.attachListener(select, "mousedown",
				function(e) {orbium.menu.select();});
			orbium.Util.attachListener(settings, "mousedown",
				function(e) {orbium.menu.settings();});
			orbium.Util.attachListener(about, "mousedown",
				function(e) {orbium.menu.about();});

			orbium.Util.attachListener(pack, "mousedown",
				function(e) {orbium.menu.changePack();});
			orbium.Util.attachListener(edit, "mousedown",
				function(e) {orbium.editor.edit();});
			orbium.Util.attachListener(prev, "mousedown",
				function(e) {orbium.menu.prev();});
			orbium.Util.attachListener(next, "mousedown",
				function(e) {orbium.menu.next();});
			orbium.Util.attachListener(play, "mousedown",
				function(e) {orbium.menu.start();});
			orbium.Util.attachListener(lvlb, "mousedown",
				function(e) {orbium.menu.lvlb();});

			orbium.Util.attachListener(support, "mousedown",
				function(e) {orbium.menu.support();});
			orbium.Util.attachListener(credits, "mousedown",
				function(e) {orbium.menu.credits();});
			orbium.Util.attachListener(abob, "mousedown",
				function(e) {orbium.menu.abob();});

			orbium.Util.attachListener(sound, "mousedown",
				function(e) {orbium.menu.toggleSound();});
			orbium.Util.attachListener(tutorial, "mousedown",
				function(e) {orbium.menu.toggleTutorial();});
			orbium.Util.attachListener(limits, "mousedown",
				function(e) {orbium.menu.toggleLimits();});
			orbium.Util.attachListener(settb, "mousedown",
				function(e) {orbium.menu.settb();});

			orbium.Util.attachListener(debug, "mousedown",
				function(e) {orbium.menu.debug();});
			orbium.Util.attachListener(reset, "mousedown",
				function(e) {orbium.menu.reset();});
			orbium.Util.attachListener(unlock, "mousedown",
				function(e) {orbium.menu.unlock();});
			orbium.Util.attachListener(editoron, "mousedown",
				function(e) {orbium.menu.editoron();});
			orbium.Util.attachListener(perfon, "mousedown",
				function(e) {orbium.menu.perfon();});
			orbium.Util.attachListener(connecton, "mousedown",
				function(e) {orbium.menu.connecton();});

			orbium.Util.attachListener(logo, "mousedown",
				function(e) {orbium.menu.logo();});

			orbium.Util.attachListener(credb, "mousedown",
				function(e) {orbium.menu.credb();});

			orbium.Util.attachListener(retry, "mousedown",
				function(e) {orbium.menu.retry();});
			orbium.Util.attachListener(failb, "mousedown",
				function(e) {orbium.menu.failb();});

			orbium.Util.attachListener(nextl, "mousedown",
				function(e) {orbium.menu.playNext();});
			orbium.Util.attachListener(compb, "mousedown",
				function(e) {orbium.menu.compb();});

			orbium.Util.attachListener(contact, "mousedown",
				function(e) {orbium.menu.contact();});
			orbium.Util.attachListener(gfx, "mousedown",
				function(e) {orbium.menu.gfx();});

			this.updateStart();
			this.updateSound();
			this.updateTutorial();
			this.updateLimits();
		};

		this.showMain = function() {
			menu.style.opacity = "0.8";
			menu.style.filter = "alpha(opacity=80)";

			menu.style.visibility = "visible";
			main.style.visibility = "visible";
		};

		this.hideMain = function() {
			menu.style.visibility = "hidden";
			main.style.visibility = "hidden";
		};

		this.showLvl = function() {
			orbium.machine.resetLevel();

			menu.style.opacity = "0.6";
			menu.style.visibility = "visible";

			if (orbium.Machine.editorMode) {
				pack.style.visibility = "visible";
				edit.style.visibility = "visible";
			} else {
				pack.style.visibility = "hidden";
				edit.style.visibility = "hidden";
			}

			this.setPackName();
			this.setLvlNr();

			lvl.style.visibility = "visible";
			lvl.style.top = "9%";
		};

		this.hideLvl = function() {
			lvl.style.visibility = "hidden";
			edit.style.visibility = "hidden";
			pack.style.visibility = "hidden";
		};

		this.showCreds = function() {
			menu.style.visibility = "visible";
			creds.style.visibility = "visible";
		};

		this.hideCreds = function() {
			menu.style.visibility = "hidden";
			creds.style.visibility = "hidden";
		};

		this.showSett = function() {
			menu.style.visibility = "visible";

			sett.style.visibility = "visible";
			sett.style.top = "30%";
		};

		this.hideSett = function() {
			menu.style.visibility = "hidden";
			sett.style.visibility = "hidden";
		};

		this.showAbout = function() {
			menu.style.visibility = "visible";

			abo.style.visibility = "visible";
			abo.style.top = "20%";

			if (orbium.level_full === undefined &&
				orbium.level_show === undefined) {
				support.innerHTML = "GET FULL VERSION";
			} else {
				support.innerHTML = "SUPPORT";
			}
		};

		this.hideAbout = function() {
			menu.style.visibility = "hidden";
			abo.style.visibility = "hidden";
		};

		this.showDbg = function() {
			menu.style.visibility = "visible";

			dbg.style.visibility = "visible";
			dbg.style.top = "30%";
		};

		this.hideDbg = function() {
			menu.style.visibility = "hidden";
			dbg.style.visibility = "hidden";
		};

		this.showLgo = function() {
			menu.style.visibility = "visible";
			menu.style.left = ""+orbium.xpos+"px";
			menu.style.top = ""+orbium.ypos+"px";
			menu.style.width = ""+orbium.width+"px";
			menu.style.height = ""+orbium.height+"px";
			menu.style.height = ""+orbium.height+"px";
			menu.style.webkitBorderRadius = "0px";
			menu.style.mozBorderRadius = "0px";

			lgob.style.left = ""+Math.round(orbium.Tile.size*1.6)+"px";
			lgob.style.fontSize = ""+Math.round(orbium.Tile.size*1.1)+"px";
			lgob.style.letterSpacing = ""+
				Math.round(orbium.Tile.size/14)+"px";

			loading.style.left = ""+Math.round(orbium.Tile.size*1.7)+"px";
			loading.style.fontSize = ""+Math.round(orbium.Tile.size/4)+"px";
			loading.style.letterSpacing = ""+
				Math.round(orbium.Tile.size/3)+"px";

			copyright.style.left = ""+Math.round(orbium.Tile.size*2.13)+"px";
			copyright.style.top = ""+Math.round(orbium.Tile.size*3.12)+"px";
			copyright.style.fontSize = ""+Math.round(orbium.Tile.size/9)+"px";
			copyright.style.letterSpacing = ""+
				Math.round(orbium.Tile.size/14)+"px";

			lgo.style.visibility = "visible";
			lgo.style.top = "39%";
		};

		this.showFail = function(msg) {
			menu.style.visibility = "visible";
			fail.style.visibility = "visible";
			fail.style.top = "35%";

			this.updateFail(msg);
		};

		this.hideFail = function() {
			menu.style.visibility = "hidden";
			fail.style.visibility = "hidden";
		};

		this.showCompl = function() {
			if (orbium.machine.levnr === orbium.level.length-1) {
				if (orbium.level_full === undefined) {
					compl.style.top = "8%";
					comp.innerHTML = "IN THE FULL GAME...<br><br>96 "+
						"ADDITIONAL LEVELS!<br><br>TELEPORTERS, CHANGERS, "+
						"BLOCKERS AND MORE!";
					nextl.style.left = "13%";
					compb.style.left = "68%";
					nextl.innerHTML = "GET IT NOW!";
				} else {
					compl.style.top = "35%";
					comp.innerHTML = "CONGRATULATIONS, YOU COMPLETED ALL "+
						"LEVELS!";
					nextl.innerHTML = "START";
				}
			} else {
				// Save level progress, set the level after just completed
				orbium.machine.saveLevel(orbium.machine.levnr+1);

				compl.style.top = "35%";
				comp.innerHTML = "LEVEL COMPLETE!";
				nextl.innerHTML = "NEXT";
			}

			menu.style.visibility = "visible";
			compl.style.visibility = "visible";
		};

		this.hideCompl = function() {
			menu.style.visibility = "hidden";
			compl.style.visibility = "hidden";
		};

		this.updateStart = function() {
			if (orbium.has_touch_api) {
				orbium.Util.detachListener(start, "touchstart", startFunc);
				orbium.Util.attachListener(start, "touchstart",
					startFunc = function() {orbium.menu.start();});
			} else {
				orbium.Util.detachListener(start, "mousedown", startFunc);
				orbium.Util.attachListener(start, "mousedown",
					startFunc = function() {orbium.menu.start();});
			}

			start.innerHTML = "START";
		};

		this.updateRestart = function() {
			if (orbium.has_touch_api) {
				orbium.Util.detachListener(start, "touchstart", startFunc);
				orbium.Util.attachListener(start, "touchstart",
					startFunc = function() {orbium.menu.restart();});
			} else {
				orbium.Util.detachListener(start, "mousedown", startFunc);
				orbium.Util.attachListener(start, "mousedown",
					startFunc = function() {orbium.menu.restart();});
			}

			start.innerHTML = "START";
		};

		this.updateResume = function() {
			if (orbium.has_touch_api) {
				orbium.Util.detachListener(start, "touchstart", startFunc);
				orbium.Util.attachListener(start, "touchstart",
					startFunc = function() {orbium.menu.resume();});
			} else {
				orbium.Util.detachListener(start, "mousedown", startFunc);
				orbium.Util.attachListener(start, "mousedown",
					startFunc = function() {orbium.menu.resume();});
			}

			start.innerHTML = "RESUME";
		};

		this.updateSound = function() {
			// Disable if not available
			if (!orbium.player.audioSupported) {
				sound.innerHTML = "SOUND: N/A";

				var textShadow = Math.round(orbium.Tile.size/shadowFactor);

				sound.style.cursor = "default";
				sound.style.color = "#444444"
				sound.style.webkitTextStrokeColor = "#666666";
				sound.style.textShadow = "0px 0px "+textShadow+"px #666666";
			} else {
				// If not set set it to true
				var soundEnabled = orbium.storage.readValue("sound");
				if (soundEnabled === null) {
					orbium.storage.writeValue("sound", true);
				}

				// Read again
				soundEnabled = orbium.storage.readValue("sound");
				if (soundEnabled === "true") {
					soundEnabled = true;
				} else {
					soundEnabled = false;
				}

				if (soundEnabled) {
					sound.innerHTML = "SOUND: ON";
					orbium.player.muted = false;
				} else {
					sound.innerHTML = "SOUND: OFF";
					orbium.player.muted = true;
				}
			}
		};

		this.updateTutorial = function() {
			if (orbium.tutorial.checkDisableTutorial()) {
				tutorial.innerHTML = "TUTORIAL: N/A";
				
				var textShadow = Math.round(orbium.Tile.size/shadowFactor);

				tutorial.style.cursor = "default";
				tutorial.style.color = "#444444"
				tutorial.style.webkitTextStrokeColor = "#666666";
				tutorial.style.textShadow = "0px 0px "+textShadow+"px #666666";
			} else {
				// If not set set it to true
				var tutorialEnabled = orbium.storage.readValue("tutorial");
				if (tutorialEnabled === null) {
					orbium.storage.writeValue("tutorial", true);
				}

				// Read again
				tutorialEnabled = orbium.storage.readValue("tutorial");
				if (tutorialEnabled === "true") {
					tutorialEnabled = true;
				} else {
					tutorialEnabled = false;
				}

				if (tutorialEnabled) {
					tutorial.innerHTML = "TUTORIAL: ON";
				} else {
					tutorial.innerHTML = "TUTORIAL: OFF";
				}
			}
		};

		this.updateLimits = function() {
			// If not set set it to true
			var limitsEnabled = orbium.storage.readValue("limits");
			if (limitsEnabled === null) {
				orbium.storage.writeValue("limits", true);
			}

			// Read again
			limitsEnabled = orbium.storage.readValue("limits");
			if (limitsEnabled === "true") {
				limitsEnabled = true;
			} else {
				limitsEnabled = false;
			}

			if (limitsEnabled) {
				limits.innerHTML = "TIME LIMITS: ON";
				orbium.Machine.timeLimits = true;
			} else {
				limits.innerHTML = "TIME LIMITS: OFF";
				orbium.Machine.timeLimits = false;
			}
		};

		this.updateFail = function(msg) {
			fai.innerHTML = msg;
		};

		this.setPackName = function() {
			pack.innerHTML = "LEVELS: "+orbium.packs[orbium.pack_idx].name;
		};

		this.setLvlNr = function() {
			var textShadow = Math.round(orbium.Tile.size/shadowFactor);

			if (orbium.machine.levnr === 0) {
				prev.style.color = "#444444";
				prev.style.webkitTextStrokeColor = "#666666";
				prev.style.textShadow = "0px 0px "+textShadow+"px #666666";
				prev.style.cursor = "default";
			} else {
				prev.style.color = "#cccccc";
				prev.style.webkitTextStrokeColor = "white";
				prev.style.textShadow = "0px 0px "+textShadow+"px #ffffff";
				prev.style.cursor = "pointer";
			}

			var reached = orbium.storage.readValue("reachedlevel");
			if (reached !== null) {
				reached = parseInt(reached);
			} else {
				reached = 0;
			}

			if (orbium.machine.levnr === reached) {
				next.style.color = "#444444";
				next.style.webkitTextStrokeColor = "#666666";
				next.style.textShadow = "0px 0px "+textShadow+"px #666666";
				next.style.cursor = "default";
			} else {
				next.style.color = "#cccccc";
				next.style.webkitTextStrokeColor = "white";
				next.style.textShadow = "0px 0px "+textShadow+"px #ffffff";
				next.style.cursor = "pointer";
			}

			var act = orbium.machine.levnr+1;
			if (act < 10) {
				act = "0"+act;
			}

			var tot = reached+1;
			if (tot < 10) {
				tot = "0"+tot;
			}

			nr.innerHTML = ""+act+"/"+tot;
		};

		this.prev = function() {
			orbium.machine.prevLevel();
			this.setLvlNr();
		};

		this.next = function() {
			orbium.machine.nextLevel();
			this.setLvlNr();
		};

		this.start = function() {
			orbium.editor.selected = null;

			this.hideMain();
			this.hideLvl();
			this.hideCompl();
			orbium.editor.hideEdit();

			orbium.tutorial.reset();
			orbium.machine.startLevel();
			orbium.sign.show();
		};

		this.restart = function() {
			orbium.editor.selected = null;

			this.hideMain();
			this.hideLvl();
			this.hideCompl();
			orbium.editor.hideEdit();

			orbium.tutorial.reset();
			orbium.machine.restartLevel();
			orbium.sign.show();
		};

		this.pause = function() {
			if (!orbium.machine.paused) {
				orbium.machine.paused = true;

				orbium.sign.hide();
				orbium.tutorial.hide();

				if (orbium.Machine.editorMode) {
					orbium.editor.edit();
				} else {
					this.updateResume();
					this.showMain();
				}
			}
		};

		this.resume = function() {
			this.hideMain();
			orbium.machine.paused = false;
			orbium.sign.show();
		};

		this.select = function() {
			this.hideMain();
			this.showLvl();
		};

		this.lvlb = function() {
			this.hideLvl();
			this.updateStart();
			this.showMain();
		};

		this.settings = function() {
			this.hideMain();
			this.showSett();
		};

		this.debug = function() {
			this.hideSett();
			this.showDbg();
		};

		this.logo = function() {
			this.hideSett();
			this.showLgo();
		};

		this.settb = function() {
			this.hideSett();
			this.showMain();
		};

		this.toggleSound = function() {
			var soundEnabled = orbium.storage.readValue("sound");
			if (soundEnabled === "true") {
				soundEnabled = true;
			} else {
				soundEnabled = false;
			}

			if (soundEnabled) {
				orbium.storage.writeValue("sound", false);
				orbium.player.muted = true;
			} else {
				orbium.storage.writeValue("sound", true);
				orbium.player.muted = false;
			}

			this.updateSound();
		};

		this.toggleTutorial = function() {
			var tutorialEnabled = orbium.storage.readValue("tutorial");
			if (tutorialEnabled === "true") {
				tutorialEnabled = true;
			} else {
				tutorialEnabled = false;
			}

			if (tutorialEnabled) {
				orbium.storage.writeValue("tutorial", false);
			} else {
				orbium.storage.writeValue("tutorial", true);
			}

			this.updateTutorial();
		};

		this.toggleLimits = function() {
			var limitsEnabled = orbium.storage.readValue("limits");
			if (limitsEnabled === "true") {
				limitsEnabled = true;
			} else {
				limitsEnabled = false;
			}

			if (limitsEnabled) {
				orbium.storage.writeValue("limits", false);
			} else {
				orbium.storage.writeValue("limits", true);
			}

			this.updateLimits();
		};

		this.reset = function() {
			orbium.machine.levnr = -1;
			orbium.machine.nextLevel();

			orbium.storage.deleteValue("lastlevel");
			orbium.storage.deleteValue("reachedlevel");

			this.hideDbg();
			this.updateStart();
			this.showMain();
		};

		this.unlock = function() {
			orbium.storage.writeValue("reachedlevel", orbium.level.length-1);

			this.hideDbg();
			this.updateStart();
			this.showMain();
		};

		this.editoron = function() {
			orbium.Machine.editorMode = true;
			orbium.pack_idx = 1;

			orbium.packs[orbium.pack_idx] = {
				id: orbium.Util.generateUniqeString(),
				name: "NEW",
				level: eval(
					"[["+
					"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
					"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
					"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
					"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
					"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'N00',"+
					"0, 20, 10"+
					"]]"
				)
			}

			orbium.level = orbium.packs[orbium.pack_idx].level;

			orbium.machine.levnr = -1;
			orbium.machine.nextLevel();

			this.hideDbg();
			this.updateStart();
			this.showMain();
		};

		this.perfon = function() {
			orbium.perf.show();

			this.hideDbg();
			this.updateStart();
			this.showMain();
		};

		this.connecton = function() {
			orbium.client = new orbium.Client("ws://192.168.0.100:1991");

			this.hideDbg();
			this.updateStart();
			this.showMain();
		};

		this.credits = function() {
			this.hideAbout();
			this.showCreds();
		};

		this.abob = function() {
			this.hideAbout();
			this.showMain();
		};

		this.support = function() {
			if (orbium.level_full === undefined &&
				orbium.level_show === undefined) {
				this.appstore();
			} else {
				window.location.href = "mailto:support@jsway.se";
			}
		};

		this.about = function() {
			this.hideMain();
			this.showAbout();
		};

		this.credb = function() {
			this.hideCreds();
			this.showAbout();
		};

		this.fail = function(msg) {
			this.showFail(msg);
		};

		this.failb = function() {
			this.hideFail();
			this.updateRestart();
			this.showMain();
		};

		this.retry = function() {
			this.hideFail();

			orbium.tutorial.reset();
			orbium.machine.restartLevel();
			orbium.sign.show();
		};

		this.playNext = function() {
			if (orbium.level_full === undefined &&
				orbium.machine.levnr === orbium.level.length-1) {
				this.appstore();
				return;
			} else if (orbium.machine.levnr === orbium.level.length-1) {
				orbium.machine.levnr = -1;
			}

			orbium.machine.nextLevel();
			this.restart();
		};

		this.compb = function() {
			this.hideCompl();

			if (orbium.machine.levnr === orbium.level.length-1) {
				orbium.machine.levnr = -1;
			}

			orbium.machine.nextLevel();
			this.updateRestart();
			this.showMain();
		};

		this.contact = function() {
			window.location.href = "mailto:bni@jsway.se";
		};

		this.gfx = function() {
			window.location.href = "http://www.theairtightgarage.net";
		};

		this.appstore = function() {
			if (orbium.Util.isUA("iPhone") || orbium.Util.isUA("iPad")) {
				window.location.href =
					"http://itunes.apple.com/us/app/orbium/id376402382?mt=8";
			} else if (orbium.Util.isUA("webOS")) {
				window.location.href =
					"http://developer.palm.com/webChannel/index.php?"+
					"packageid=se.jsway.orbium";
			} else if (orbium.Util.isUA("Android")) {
				window.location.href =
					"http://market.android.com/details?id=se.jsway.orbium";
			} else {
				window.location.href =
					"http://itunes.apple.com/us/app/orbium/id376402382?mt=8";
			}
		};

		this.changePack = function() {
			if (orbium.pack_idx < orbium.packs.length-1) {
				orbium.pack_idx++;
			} else {
				orbium.pack_idx = 0;
			}

			orbium.level = orbium.packs[orbium.pack_idx].level;

			this.setPackName();

			orbium.machine.resetLevel();
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
