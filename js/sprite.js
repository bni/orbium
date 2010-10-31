(function(orbium) {
	orbium.Sprite = function() {
		this.xpos = null;
		this.ypos = null;
		this.width = null;
		this.height = null;

		this.zindex = null;

		this.images = null;
		this.elements = null;

		this.dirty = null;

		this.construct = function(images, xpos, ypos, width, height, zindex) {
			this.xpos = xpos;
			this.ypos = ypos;
			this.width = width;
			this.height = height;

			this.zindex = zindex;

			this.images = [];
			this.elements = [];

			for (var i = 0, j = images.length; i < j; i++) {
				this.setImage(i, images[i]);
			}

			this.dirty = true;
		}; orbium.Sprite.prototype.construct = this.construct;

		this.destruct = function() {
			var len = 0;
			if (orbium.has_canvas) {
				len = this.images.length;
			} else {
				len = this.elements.length;
			}

			for (var i = 0; i < len; i++) {
				this.setImage(i, null);
			}
		}; orbium.Sprite.prototype.destruct = this.destruct;

		var makeElement = function(idx, image, x, y, w, h, z) {
			var id = ""+image+"_"+orbium.Util.generateUniqeString();

			var sprite = document.createElement("div");
			sprite.id = id;

			if (orbium.has_transform) {
				sprite.style.webkitTransform = "translate3d("+x+"px,"+
					y+"px,0px)";
			} else {
				sprite.style.left = x+"px";
				sprite.style.top = y+"px";
			}

			sprite.style.position = "absolute";
			sprite.style.padding = "0px";
			sprite.style.margin = "0px";
			sprite.style.backgroundRepeat = "no-repeat";
			sprite.style.width = w+"px";
			sprite.style.height = h+"px";

			sprite.style.zIndex = z+idx*2;

			orbium.pane.appendChild(sprite);

			return document.getElementById(id);
		};

		this.setImage = function(idx, image) {
			if (orbium.has_canvas) {
				if (image !== null) {
					this.images[idx] = orbium.loader[image];
				} else {
					this.images[idx] = null;
				}
			} else {
				if (image !== null) {
					if (this.elements[idx] === undefined ||
						this.elements[idx] === null) {
						this.elements[idx] = makeElement(idx, image, this.xpos,
							this.ypos, this.width, this.height,	this.zindex);
					}

					this.elements[idx].style.backgroundImage = "url("+
						orbium.gfx_path+image+".png)";
				} else {
					if (this.elements[idx] !== undefined &&
						this.elements[idx] !== null) {
						orbium.pane.removeChild(this.elements[idx]);
						this.elements[idx] = null;
					}
				}
			}
		};

		this.invalidate = function(moved) {
			if (orbium.has_canvas) {
				this.dirty = true;
			} else {
				if (moved) {
					this.dirty = true;
				}
			}
		}; orbium.Sprite.prototype.invalidate = this.invalidate;

		var lastImage = function(idx, images) {
			var last = true;

			for (var i = idx+1, j = images.length; i < j; i++) {
				if (images[i] !== null) {
					last = false;
				}
			}

			return last;
		};

		this.draw = function(idx) {
			if (this.dirty) {
				if (orbium.has_canvas) {
					if (this.images[idx] !== null) {
						orbium.ctx.drawImage(
							this.images[idx],
							Math.round(this.xpos),
							Math.round(this.ypos),
							this.width, this.height);
					}

					if (lastImage(idx, this.images)) {
						this.dirty = false;
					}
				} else {
					if (this.elements[idx] !== null) {
						if (orbium.has_transform) {
							this.elements[idx].style.webkitTransform = 
								"translate3d("+Math.round(this.xpos)+
								"px,"+Math.round(this.ypos)+"px,0px)";
						} else {
							this.elements[idx].style.left =
								Math.round(this.xpos)+"px";
							this.elements[idx].style.top =
								Math.round(this.ypos)+"px";
						}
					}

					this.dirty = false;
				}
			}
		}; orbium.Sprite.prototype.draw = this.draw;
	};
}(window.orbium = window.orbium || {}));
