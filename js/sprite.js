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

		this.construct = function(image0, image1, image2, xpos, ypos,
			width, height, zindex) {
			this.images = [null, null, null];
			this.elements = [null, null, null];

			this.xpos = xpos;
			this.ypos = ypos;
			this.width = width;
			this.height = height;

			this.zindex = zindex;

			this.setImage(0, image0);
			this.setImage(1, image1);
			this.setImage(2, image2);

			this.dirty = true;
		}; orbium.Sprite.prototype.construct = this.construct;

		this.destruct = function() {
			this.setImage(0, null);
			this.setImage(1, null);
			this.setImage(2, null);
		}; orbium.Sprite.prototype.destruct = this.destruct;

		this.createLayer = function(name, offset) {
			var id = ""+name+"_"+orbium.Util.generateUniqeString();

			var sprite = document.createElement("div");
			sprite.id = id;

			if (orbium.has_hwaccel) {
				sprite.style.webkitTransform = "translate3d("+this.xpos+"px,"+this.ypos+"px,0px)";
			} else {
				sprite.style.left = this.xpos+"px";
				sprite.style.top = this.ypos+"px";
			}

			sprite.style.position = "absolute";
			sprite.style.padding = "0px";
			sprite.style.margin = "0px";
			sprite.style.backgroundRepeat = "no-repeat";
			sprite.style.width = this.width+"px";
			sprite.style.height = this.height+"px";
			sprite.style.zIndex = this.zindex+offset;
			orbium.div.appendChild(sprite);

			return document.getElementById(id);
		};

		this.setImage = function(idx, image) {
			if (orbium.has_canvas) {
				if (image != null) {
					this.images[idx] = orbium.loader[image];
				} else {
					this.images[idx] = null;
				}
			} else {
				if (image != null) {
					if (this.elements[idx] == null) {
						this.elements[idx] = this.createLayer(image, 0);
					}

					this.elements[idx].style.backgroundImage = "url("+orbium.gfx_path+image+".png)";
				} else {
					if (this.elements[idx] != null) {
						orbium.div.removeChild(this.elements[idx]);
						this.elements[idx] = null;
					}
				}
			}
		};

		this.invalidate = function() {
			this.dirty = true;
		}; orbium.Sprite.prototype.invalidate = this.invalidate;

		this.draw = function(idx) {
			if (this.dirty) {
				if (orbium.has_canvas) {
					if (this.images[idx] != null) {
						orbium.ctx.drawImage(this.images[idx], Math.round(this.xpos), Math.round(this.ypos), this.width, this.height);
					}
				} else {
					if (this.elements[idx] != null) {
						if (orbium.has_hwaccel) {
							this.elements[idx].style.webkitTransform = "translate3d("+Math.round(this.xpos)+"px,"+Math.round(this.ypos)+"px,0px)";
						} else {
							this.elements[idx].style.left = Math.round(this.xpos)+"px";
							this.elements[idx].style.top = Math.round(this.ypos)+"px";
						}
					}
				}

				if (idx == 0) {
					if (this.images[1] == null && this.images[2] == null) {
						this.dirty = false;
					}
				} else if (idx == 1) {
					if (this.images[2] == null) {
						this.dirty = false;
					}
				} else if (idx == 2) {
					this.dirty = false;
				}
			}
		}; orbium.Sprite.prototype.draw = this.draw;
	};
}(window.orbium = window.orbium || {}));
