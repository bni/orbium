(function(orbium) {
	orbium.Rotator = function() {
		this.dockees = null;
		this.orientation = null;
		this.judderc = null;
		this.blockc = null;
		this.fullc = null;
		this.stage = null;
		this.broken = null;

		this.construct = function(count, xnr, ynr) {
			this.dockees = [];
			this.orientation = 0;
			this.judderc = -1;
			this.blockc = -1;
			this.fullc = -1;
			this.stage = 0;
			this.broken = false;

			orbium.Tile.prototype.construct.call(this, "rotatile14", "rotator0",
				null, count, xnr, ynr);
		};

		this.destruct = function() {
			for (var i=0; i<this.dockees.length; i++) {
				this.dockees[i].destruct();
			}

			orbium.Tile.prototype.destruct.call(this);
		};

		this.invalidate = function() {
			orbium.Tile.prototype.invalidate.call(this);

			for (var j=0; j<this.dockees.length; j++) {
				this.dockees[j].invalidate();
			}
		};

		this.slotFree = function(pos) {
			for (var i=0; i<this.dockees.length; i++) {
				if (this.dockees[i].pos == pos) {
					return false;
				}
			}

			return true;
		};

		this.pattern = function() {
			var pat = [];

			for (var i=0; i<this.dockees.length; i++) {
				if (this.orientation == 0) {
					if (this.dockees[i].pos == 0) {
						pat[0] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 1) {
						pat[1] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 2) {
						pat[2] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 3) {
						pat[3] = this.dockees[i].color;
					}
				} else if (this.orientation == 1) {
					if (this.dockees[i].pos == 0) {
						pat[1] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 1) {
						pat[2] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 2) {
						pat[3] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 3) {
						pat[0] = this.dockees[i].color;
					}
				} else if (this.orientation == 2) {
					if (this.dockees[i].pos == 0) {
						pat[2] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 1) {
						pat[3] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 2) {
						pat[0] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 3) {
						pat[1] = this.dockees[i].color;
					}
				} else if (this.orientation == 3) {
					if (this.dockees[i].pos == 0) {
						pat[3] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 1) {
						pat[0] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 2) {
						pat[1] = this.dockees[i].color;
					} else if (this.dockees[i].pos == 3) {
						pat[2] = this.dockees[i].color;
					}
				}
			}

			return pat;
		};

		this.dockMarble = function(dir, color, frame, fresh) {
			if (this.blockc != -1) {
				if (!fresh) {
					orbium.player.play("clank");
				}

				return false;
			}

			var pos = 0;
			if (dir == 0 && this.orientation == 0) {
				pos = 2;
			} else if (dir == 0 && this.orientation == 1) {
				pos = 1;
			} else if (dir == 0 && this.orientation == 2) {
				pos = 0;
			} else if (dir == 0 && this.orientation == 3) {
				pos = 3;
			}

			if (dir == 1 && this.orientation == 0) {
				pos = 3;
			} else if (dir == 1 && this.orientation == 1) {
				pos = 2;
			} else if (dir == 1 && this.orientation == 2) {
				pos = 1;
			} else if (dir == 1 && this.orientation == 3) {
				pos = 0;
			}

			if (dir == 2 && this.orientation == 0) {
				pos = 0;
			} else if (dir == 2 && this.orientation == 1) {
				pos = 3;
			} else if (dir == 2 && this.orientation == 2) {
				pos = 2;
			} else if (dir == 2 && this.orientation == 3) {
				pos = 1;
			}

			if (dir == 3 && this.orientation == 0) {
				pos = 1;
			} else if (dir == 3 && this.orientation == 1) {
				pos = 0;
			} else if (dir == 3 && this.orientation == 2) {
				pos = 3;
			} else if (dir == 3 && this.orientation == 3) {
				pos = 2;
			}

			if (!this.slotFree(pos)) {
				if (!fresh) {
					orbium.player.play("bounce");
				}

				return false;
			}

			var dockee = new orbium.Dockee();
			dockee.construct(this, pos, color, frame);
			orbium.Util.addArrayElement(this.dockees, dockee);

			orbium.player.play("dock");

			return true;
		};

		this.rotate = function() {
			if (this.judderc == -1 && this.fullc == -1) {
				orbium.player.play("rotate");

				this.judderc = 0;
				this.blockc = 0;
			}
		};

		this.explode = function() {
			orbium.player.play("explode");

			this.broken = true;
			this.fullc = 0;
		};

		this.launchPosition = function(pos) {
			var dir = pos + this.orientation;
			if (dir == 4) {
				dir = 0;
			} else if (dir == 5) {
				dir = 1
			} else if (dir == 6) {
				dir = 2;
			}

			return this.launchDirection(dir);
		};

		this.launchDirection = function(dir) {
			if (this.judderc != -1) {
				return false;
			}

			var proceed = false;

			if (dir == 0 && this.above && this.count >= orbium.Machine.horizTiles) {
				proceed = true;
			}

			if (dir == 1 && this.right) {
				proceed = true;
			}

			if (dir == 2 && this.below) {
				proceed = true;
			}

			if (dir == 3 && this.left) {
				proceed = true;
			}

			// We cant launch
			if (!proceed) {
				return false;
			}

			var pos = -1;

			if (this.orientation == 0) {
				if (dir == 0) {
					pos = 0;
				}

				if (dir == 1) {
					pos = 1;
				}

				if (dir == 2) {
					pos = 2;
				}

				if (dir == 3) {
					pos = 3;
				}
			}

			if (this.orientation == 3) {
				if (dir == 0) {
					pos = 1;
				}

				if (dir == 1) {
					pos = 2;
				}

				if (dir == 2) {
					pos = 3;
				}

				if (dir == 3) {
					pos = 0;
				}
			}

			if (this.orientation == 2) {
				if (dir == 0) {
					pos = 2;
				}

				if (dir == 1) {
					pos = 3;
				}

				if (dir == 2) {
					pos = 0;
				}

				if (dir == 3) {
					pos = 1;
				}
			}

			if (this.orientation == 1) {
				if (dir == 0) {
					pos = 3;
				}

				if (dir == 1) {
					pos = 0;
				}

				if (dir == 2) {
					pos = 1;
				}

				if (dir == 3) {
					pos = 2;
				}
			}

			// Find dockee at pos
			var dockee = null;
			for (var i=0; i<this.dockees.length; i++) {
				if (this.dockees[i].pos == pos) {
					dockee = this.dockees[i];
				}
			}

			// No dockee to launch
			if (dockee == null) {
				return false;
			}

			if (orbium.machine.counter.isLaunchAllowed()) {
				dockee.destruct();
				orbium.Util.removeArrayElement(this.dockees, dockee);

				var marble = new orbium.Marble();
				marble.construct(
					dockee.xpos,
					dockee.ypos,
					dockee.color,
					dockee.frame,
					dir,
					false
				);
				orbium.Util.addArrayElement(orbium.machine.marbles, marble);
			}

			orbium.machine.counter.countActiveMarbles();

			return true;
		};

		this.update = function(dt) {
			var frame = 0;
			var offset = 0;

			if (this.judderc != -1 || this.fullc != -1) {
				if (this.orientation == 0) {
					offset = 0;
				} else if (this.orientation == 3) {
					offset = 4;
				} else if (this.orientation == 2) {
					offset = 8;
				} else if (this.orientation == 1) {
					offset = 12;
				}
			}

			if (this.judderc == 0 && this.stage == 0) {
				frame = offset+this.stage+1;
				if (this.broken) {
					frame += 16;
				}
				this.setImage2("rotator"+frame);

				this.stage = 1;

				for (var i=0; i<this.dockees.length; i++) {
					this.dockees[i].judder(0);
				}
				this.invalidate();
			}

			if (this.judderc > 2 && this.stage == 1) {
				frame = offset+this.stage+1;
				if (this.broken) {
					frame += 16;
				}
				this.setImage2("rotator"+frame);

				this.stage = 2;

				for (i=0; i<this.dockees.length; i++) {
					this.dockees[i].judder(1);
				}
				this.invalidate();
			}

			if (this.judderc > 4 && this.stage == 2) {
				frame = offset+this.stage+1;
				if (this.broken) {
					frame += 16;
				}
				this.setImage2("rotator"+frame);

				this.stage = 3;

				for (i=0; i<this.dockees.length; i++) {
					this.dockees[i].judder(2);
				}
				this.invalidate();
			}

			if (this.judderc > 6 && this.stage == 3) {
				frame = offset+this.stage+1;
				if (frame == 16) {
					frame = 0;
				}
				if (this.broken) {
					frame += 16;
				}
				this.setImage2("rotator"+frame);

				this.stage = 0;

				if (this.orientation > 0) {
					this.orientation--;
				} else {
					this.orientation = 3;
				}

				for (var j=0; j<this.dockees.length; j++) {
					this.dockees[j].place();
				}

				// If matcher is present check for full tiles on rotate
				if (orbium.machine.matcher != null) {
					orbium.machine.checkRotatorsFull();
				}

				this.judderc = -1;
				this.invalidate();
			}

			if (this.blockc > 12) {
				this.blockc = -1;
			}

			if (this.fullc > 2 && this.stage == 0) {
				for (var k=0; k<this.dockees.length; k++) {
					this.dockees[k].destruct();
				}
				this.dockees.length = 0;
				this.setImage3("explosion0");
				this.stage = 1;
				this.invalidate();
			} else if (this.fullc > 4 && this.stage == 1) {
				this.setImage3("explosion1");
				this.stage = 2;
				this.invalidate();
			} else if (this.fullc > 6 && this.stage == 2) {
				this.setImage3("explosion2");
				this.stage = 3;
				this.invalidate();
			} else if (this.fullc > 8 && this.stage == 3) {
				this.setImage3("explosion3");
				this.stage = 4;
				this.invalidate();
			} else if (this.fullc > 10 && this.stage == 4) {
				this.fullc = -1;
				this.setBase("rotatile");
				frame = offset+16;
				this.setImage2("rotator"+frame);
				this.setImage3(null);

				this.stage = 0;
				this.invalidate();

				orbium.machine.checkLevelComplete();
			}

			if (this.judderc != -1) {
				this.judderc += orbium.Rotator.speed*dt;
			}

			if (this.blockc != -1) {
				this.blockc += orbium.Rotator.speed*dt;
			}

			if (this.fullc != -1) {
				this.fullc += orbium.Rotator.speed*dt;
			}
		};

		this.draw2 = function() {
			orbium.Tile.prototype.draw2.call(this);

			for (var j=0; j<this.dockees.length; j++) {
				this.dockees[j].draw1();
			}
		};
	}; orbium.Rotator.prototype = new orbium.Tile();
}(window.orbium = window.orbium || {}));
