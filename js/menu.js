(function(orbium) {
	orbium.Menu = function() {
		var shadowFactor = 17;
		var textFactor = 2.5;

		var menu0 = null;

		var main = null;
		var lvl = null;
		var sett = null;
		var abo = null;
		var creds = null;
		var fail = null;
		var compl = null;

		var start = null;
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
			menu0 = document.getElementById("menu0");

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

			menu0.style.visibility = "hidden";
			menu0.style.left = ""+left+"px";
			menu0.style.top = ""+top+"px";
			menu0.style.width = ""+width+"px";
			menu0.style.height = ""+height+"px";
			menu0.style.fontSize = orbium.Tile.size+"px";
			menu0.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #ffffff";

			support.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			credits.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			filler5.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			abob.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			copy.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			filler6.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			pack.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			nr.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			edit.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			prev.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			next.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			play.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			lvlb.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			sound.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			tutorial.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			limits.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			filler0.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			debug.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			logo.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			settb.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			reset.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			unlock.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			editoron.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			info.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			credb.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			fai.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			filler3.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			filler4.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			retry.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			failb.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";

			comp.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			nextl.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
			compb.style.fontSize = ""+Math.round(orbium.Tile.size/textFactor)+"px";
		};

		this.setupTouchEvents = function() {
			start.ontouchstart = function() {orbium.menu.start();};
			select.ontouchstart = function() {orbium.menu.select();};
			settings.ontouchstart = function() {orbium.menu.settings();};
			about.ontouchstart = function() {orbium.menu.about();};

			pack.ontouchstart = function() {orbium.menu.changePack();};
			edit.ontouchstart = function() {orbium.editor.edit();};
			prev.ontouchstart = function() {orbium.menu.prev();};
			next.ontouchstart = function() {orbium.menu.next();};
			play.ontouchstart = function() {orbium.menu.start();};
			lvlb.ontouchstart = function() {orbium.menu.lvlb();};

			support.ontouchstart = function() {orbium.menu.support();};
			credits.ontouchstart = function() {orbium.menu.credits();};
			abob.ontouchstart = function() {orbium.menu.abob();};

			sound.ontouchstart = function() {orbium.menu.toggleSound();};
			tutorial.ontouchstart = function() {orbium.menu.toggleTutorial();};
			limits.ontouchstart = function() {orbium.menu.toggleLimits();};
			settb.ontouchstart = function() {orbium.menu.settb();};

			debug.ontouchstart = function() {orbium.menu.debug();};
			reset.ontouchstart = function() {orbium.menu.reset();};
			unlock.ontouchstart = function() {orbium.menu.unlock();};
			editoron.ontouchstart = function() {orbium.menu.editoron();};

			logo.ontouchstart = function() {orbium.menu.logo();};

			credb.ontouchstart = function() {orbium.menu.credb();};

			retry.ontouchstart = function() {orbium.menu.retry();};
			failb.ontouchstart = function() {orbium.menu.failb();};

			nextl.ontouchstart = function() {orbium.menu.playNext();};
			compb.ontouchstart = function() {orbium.menu.compb();};

			contact.ontouchstart = function() {orbium.menu.contact();};
			gfx.ontouchstart = function() {orbium.menu.gfx();};
		};

		this.setupMouseEvents = function() {
			start.onmousedown = function() {orbium.menu.start();};
			select.onmousedown = function() {orbium.menu.select();};
			settings.onmousedown = function() {orbium.menu.settings();};
			about.onmousedown = function() {orbium.menu.about();};

			pack.onmousedown = function() {orbium.menu.changePack();};
			edit.onmousedown = function() {orbium.editor.edit();};
			prev.onmousedown = function() {orbium.menu.prev();};
			next.onmousedown = function() {orbium.menu.next();};
			play.onmousedown = function() {orbium.menu.start();};
			lvlb.onmousedown = function() {orbium.menu.lvlb();};

			support.onmousedown = function() {orbium.menu.support();};
			credits.onmousedown = function() {orbium.menu.credits();};
			abob.onmousedown = function() {orbium.menu.abob();};

			sound.onmousedown = function() {orbium.menu.toggleSound();};
			tutorial.onmousedown = function() {orbium.menu.toggleTutorial();};
			limits.onmousedown = function() {orbium.menu.toggleLimits();};
			settb.onmousedown = function() {orbium.menu.settb();};

			debug.onmousedown = function() {orbium.menu.debug();};
			reset.onmousedown = function() {orbium.menu.reset();};
			unlock.onmousedown = function() {orbium.menu.unlock();};
			editoron.onmousedown = function() {orbium.menu.editoron();};

			logo.onmousedown = function() {orbium.menu.logo();};

			credb.onmousedown = function() {orbium.menu.credb();};

			retry.onmousedown = function() {orbium.menu.retry();};
			failb.onmousedown = function() {orbium.menu.failb();};

			nextl.onmousedown = function() {orbium.menu.playNext();};
			compb.onmousedown = function() {orbium.menu.compb();};

			contact.onmousedown = function() {orbium.menu.contact();};
			gfx.onmousedown = function() {orbium.menu.gfx();};
		};

		this.showMain = function() {
			menu0.style.opacity = "0.8";
			menu0.style.filter = "alpha(opacity=80)";

			menu0.style.visibility = "visible";
			main.style.visibility = "visible";
		};

		this.hideMain = function() {
			menu0.style.visibility = "hidden";
			main.style.visibility = "hidden";
		};

		this.showLvl = function() {
			orbium.machine.resetLevel();

			menu0.style.opacity = "0.6";
			menu0.style.visibility = "visible";

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
			menu0.style.visibility = "visible";
			creds.style.visibility = "visible";
		};

		this.hideCreds = function() {
			menu0.style.visibility = "hidden";
			creds.style.visibility = "hidden";
		};

		this.showSett = function() {
			menu0.style.visibility = "visible";

			sett.style.visibility = "visible";
			sett.style.top = "30%";
		};

		this.hideSett = function() {
			menu0.style.visibility = "hidden";
			sett.style.visibility = "hidden";
		};

		this.showAbout = function() {
			menu0.style.visibility = "visible";

			abo.style.visibility = "visible";
			abo.style.top = "20%";

			if (orbium.level_full == undefined &&
				orbium.level_show == undefined) {
				support.innerHTML = "GET FULL VERSION";
			} else {
				support.innerHTML = "SUPPORT";
			}
		};

		this.hideAbout = function() {
			menu0.style.visibility = "hidden";
			abo.style.visibility = "hidden";
		};

		this.showDbg = function() {
			menu0.style.visibility = "visible";

			dbg.style.visibility = "visible";
			dbg.style.top = "36%";
		};

		this.hideDbg = function() {
			menu0.style.visibility = "hidden";
			dbg.style.visibility = "hidden";
		};

		this.showLgo = function() {
			menu0.style.visibility = "visible";
			menu0.style.left = ""+orbium.xpos+"px";
			menu0.style.top = ""+orbium.ypos+"px";
			menu0.style.width = ""+orbium.width+"px";
			menu0.style.height = ""+orbium.height+"px";
			menu0.style.height = ""+orbium.height+"px";
			menu0.style.webkitBorderRadius = "0px";
			menu0.style.mozBorderRadius = "0px";

			lgob.style.left = ""+Math.round(orbium.Tile.size*1.6)+"px";
			lgob.style.fontSize = ""+Math.round(orbium.Tile.size*1.1)+"px";
			lgob.style.letterSpacing = ""+Math.round(orbium.Tile.size/14)+"px";

			loading.style.left = ""+Math.round(orbium.Tile.size*1.7)+"px";
			loading.style.fontSize = ""+Math.round(orbium.Tile.size/4)+"px";
			loading.style.letterSpacing = ""+Math.round(orbium.Tile.size/3)+"px";

			copyright.style.left = ""+Math.round(orbium.Tile.size*2.13)+"px";
			copyright.style.top = ""+Math.round(orbium.Tile.size*3.12)+"px";
			copyright.style.fontSize = ""+Math.round(orbium.Tile.size/9)+"px";
			copyright.style.letterSpacing = ""+Math.round(orbium.Tile.size/14)+"px";

			lgo.style.visibility = "visible";
			lgo.style.top = "39%";
		};

		this.showFail = function(msg) {
			menu0.style.visibility = "visible";
			fail.style.visibility = "visible";
			fail.style.top = "35%";

			this.updateFail(msg);
		};

		this.hideFail = function() {
			menu0.style.visibility = "hidden";
			fail.style.visibility = "hidden";
		};

		this.showCompl = function() {
			if (orbium.machine.levnr == orbium.level.length-1) {
				if (orbium.level_full == undefined) {
					compl.style.top = "8%";
					comp.innerHTML = "IN THE FULL GAME...<br><br>96 ADDITIONAL LEVELS!<br><br>TELEPORTERS, CHANGERS, BLOCKERS AND MORE!";
					nextl.style.left = "13%";
					compb.style.left = "68%";
					nextl.innerHTML = "GET IT NOW!";
				} else {
					compl.style.top = "35%";
					comp.innerHTML = "CONGRATULATIONS, YOU COMPLETED ALL LEVELS!";
					nextl.innerHTML = "START";
				}
			} else {
				// Save level progress, set the level after just completed
				orbium.machine.saveLevel(orbium.machine.levnr+1);

				compl.style.top = "35%";
				comp.innerHTML = "LEVEL COMPLETE!";
				nextl.innerHTML = "NEXT";
			}

			menu0.style.visibility = "visible";
			compl.style.visibility = "visible";
		};

		this.hideCompl = function() {
			menu0.style.visibility = "hidden";
			compl.style.visibility = "hidden";
		};

		this.updateStart = function() {
			if (orbium.has_touch_api) {
				start.ontouchstart = function() {orbium.menu.start();};
			} else {
				start.onmousedown = function() {orbium.menu.start();};
			}

			start.innerHTML = "START";
		};

		this.updateRestart = function() {
			if (orbium.has_touch_api) {
				start.ontouchstart = function() {orbium.menu.restart();};
			} else {
				start.onmousedown = function() {orbium.menu.restart();};
			}

			start.innerHTML = "START";
		};

		this.updateResume = function() {
			if (orbium.has_touch_api) {
				start.ontouchstart = function() {orbium.menu.resume();};
			} else {
				start.onmousedown = function() {orbium.menu.resume();};
			}

			start.innerHTML = "RESUME";
		};

		this.updateSound = function() {
			// Disable if not available
			if (!orbium.player.audioSupported) {
				sound.innerHTML = "SOUND: N/A";

				if (orbium.has_touch_api) {
					sound.ontouchstart = null;
				} else {
					sound.onmousedown = null;
				}

				sound.style.cursor = "default";
				sound.style.color = "#444444"
				sound.style.webkitTextStrokeColor = "#666666";
				sound.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #666666";
			} else {
				// If not set set it to true
				var soundEnabled = orbium.storage.readValue("sound");
				if (soundEnabled == null) {
					orbium.storage.writeValue("sound", true);
				}

				// Read again
				soundEnabled = orbium.storage.readValue("sound");
				if (soundEnabled == "true") {
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

				if (orbium.has_touch_api) {
					tutorial.ontouchstart = null;
				} else {
					tutorial.onmousedown = null;
				}

				tutorial.style.cursor = "default";
				tutorial.style.color = "#444444"
				tutorial.style.webkitTextStrokeColor = "#666666";
				tutorial.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #666666";
			} else {
				// If not set set it to true
				var tutorialEnabled = orbium.storage.readValue("tutorial");
				if (tutorialEnabled == null) {
					orbium.storage.writeValue("tutorial", true);
				}

				// Read again
				tutorialEnabled = orbium.storage.readValue("tutorial");
				if (tutorialEnabled == "true") {
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
			if (limitsEnabled == null) {
				orbium.storage.writeValue("limits", true);
			}

			// Read again
			limitsEnabled = orbium.storage.readValue("limits");
			if (limitsEnabled == "true") {
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
			if (orbium.machine.levnr == 0) {
				prev.style.color = "#444444";
				prev.style.webkitTextStrokeColor = "#666666";
				prev.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #666666";
				prev.style.cursor = "default";

				if (orbium.has_touch_api) {
					prev.ontouchstart = null;
				} else {
					prev.onmousedown = null;
				}
			} else {
				prev.style.color = "#cccccc";
				prev.style.webkitTextStrokeColor = "white";
				prev.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #ffffff";
				prev.style.cursor = "pointer";

				if (orbium.has_touch_api) {
					prev.ontouchstart = function() {orbium.menu.prev();};
				} else {
					prev.onmousedown = function() {orbium.menu.prev();};
				}
			}

			var reached = orbium.storage.readValue("reachedlevel");
			if (reached != null) {
				reached = parseInt(reached);
			} else {
				reached = 0;
			}

			if (orbium.machine.levnr == reached) {
				next.style.color = "#444444";
				next.style.webkitTextStrokeColor = "#666666";
				next.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #666666";
				next.style.cursor = "default";

				if (orbium.has_touch_api) {
					next.ontouchstart = null;
				} else {
					next.onmousedown = null;
				}
			} else {
				next.style.color = "#cccccc";
				next.style.webkitTextStrokeColor = "white";
				next.style.textShadow = "0px 0px "+Math.round(orbium.Tile.size/shadowFactor)+"px #ffffff";
				next.style.cursor = "pointer";

				if (orbium.has_touch_api) {
					next.ontouchstart = function() {orbium.menu.next();};
				} else {
					next.onmousedown = function() {orbium.menu.next();};
				}
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
			orbium.machine.paused = true;

			orbium.sign.hide();
			orbium.tutorial.hide();

			if (orbium.editor.selected != null) {
				orbium.editor.edit();
			} else {
				this.updateResume();
				this.showMain();
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
			if (soundEnabled == "true") {
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
			if (tutorialEnabled == "true") {
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
			if (limitsEnabled == "true") {
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
					"["+
						"["+
							"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
							"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
							"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
							"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00',"+
							"'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'E00', 'N00',"+
							"0, 20, 10"+
						"]"+
					"]"
				)
			}

			orbium.level = orbium.packs[orbium.pack_idx].level;

			orbium.machine.levnr = -1;
			orbium.machine.nextLevel();

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
			if (orbium.level_full == undefined &&
				orbium.level_show == undefined) {
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
			if (orbium.level_full == undefined && orbium.machine.levnr == orbium.level.length-1) {
				this.appstore();
				return;
			} else if (orbium.machine.levnr == orbium.level.length-1) {
				orbium.machine.levnr = -1;
			}

			orbium.machine.nextLevel();
			this.restart();
		};

		this.compb = function() {
			this.hideCompl();

			if (orbium.machine.levnr == orbium.level.length-1) {
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
			if (orbium.Util.isUA("iPhone")) {
				window.location.href = "http://itunes.apple.com/us/app/orbium/id376402382?mt=8";
			} else if (orbium.Util.isUA("webOS")) {
				window.location.href = "http://developer.palm.com/webChannel/index.php?packageid=se.jsway.orbium";
			} else if (orbium.Util.isUA("Android")) {
				window.location.href = "market://search?q=pname:se.jsway.orbium";
			} else {
				window.location.href = "http://itunes.apple.com/us/app/orbium/id376402382?mt=8";
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
}(window.orbium = window.orbium || {}));
