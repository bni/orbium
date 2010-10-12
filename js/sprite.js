(function(orbium) {
	orbium.Sprite = function() {
		this.image1 = null;
		this.element1 = null;
		this.image2 = null;
		this.element2 = null;
		this.image3 = null;
		this.element3 = null;
		this.xpos = null;
		this.ypos = null;
		this.width = null;
		this.height = null;
		this.dirty = null;

		this.construct = function(image1, image2, image3, xpos, ypos,
			width, height, zindex) {
			this.xpos = xpos;
			this.ypos = ypos;
			this.width = width;
			this.height = height;

			if (!orbium.has_canvas) {
				if (image1 != null) {
					this.element1 = this.createElement(zindex);
				}

				if (image2 != null) {
					this.element2 = this.createElement(zindex+1);
				}

				if (image3 != null) {
					this.element3 = this.createElement(zindex+9);
				}
			}

			this.setImage1(image1);
			this.setImage2(image2);
			this.setImage3(image3);

			this.dirty = true;
		}; orbium.Sprite.prototype.construct = this.construct;

		this.destruct = function() {
			if (!orbium.has_canvas) {
				if (this.element1 != null) {
					orbium.div.removeChild(this.element1);
				}

				if (this.element2 != null) {
					orbium.div.removeChild(this.element2);
				}

				if (this.element3 != null) {
					orbium.div.removeChild(this.element3);
				}
			}
		}; orbium.Sprite.prototype.destruct = this.destruct;

		this.createElement = function(zindex) {
			var id = "sprite"+Math.round(Math.random()*1000*1000);

			var sprite = document.createElement("div");
			sprite.id = id;
			sprite.style.left = this.xpos+"px";
			sprite.style.top = this.ypos+"px";
			sprite.style.position = "absolute";
			sprite.style.padding = "0px";
			sprite.style.margin = "0px";
			sprite.style.backgroundRepeat = "no-repeat";
			sprite.style.width = this.width+"px";
			sprite.style.height = this.height+"px";
			sprite.style.zIndex = zindex;
			orbium.div.appendChild(sprite);

			return document.getElementById(id);
		};

		this.setImage1 = function(image) {
			if (!orbium.has_canvas) {
				if (this.element1 != null && image != null) {
					this.element1.style.backgroundImage = "url("+orbium.gfx_path+image+".png)";
				}
			} else {
				if (image != null) {
					this.image1 = orbium.loader[image];
				} else {
					this.image1 = null;
				}
			}
		};

		this.setImage2 = function(image) {
			if (!orbium.has_canvas) {
				if (this.element2 != null && image != null) {
					this.element2.style.backgroundImage = "url("+orbium.gfx_path+image+".png)";
				}
			} else {
				if (image != null) {
					this.image2 = orbium.loader[image];
				} else {
					this.image2 = null;
				}
			}
		};

		this.setImage3 = function(image) {
			if (!orbium.has_canvas) {
				if (this.element3 != null && image != null) {
					this.element3.style.backgroundImage = "url("+orbium.gfx_path+image+".png)";
				}
			} else {
				if (image != null) {
					this.image3 = orbium.loader[image];
				} else {
					this.image3 = null;
				}
			}
		};

		this.invalidate = function() {
			this.dirty = true;
		}; orbium.Sprite.prototype.invalidate = this.invalidate;

		this.draw1 = function() {
			if (this.dirty) {
				if (!orbium.has_canvas) {
					if (this.element1 != null) {
						this.element1.style.left = Math.round(this.xpos)+"px";
						this.element1.style.top = Math.round(this.ypos)+"px";
					}
				} else {
					if (this.image1 != null) {
						orbium.ctx.drawImage(this.image1, Math.round(this.xpos), Math.round(this.ypos), this.width, this.height);
					}
				}

				if (this.image2 == null && this.image3 == null) {
					this.dirty = false;
				}
			}
		}; orbium.Sprite.prototype.draw1 = this.draw1;

		this.draw2 = function() {
			if (this.dirty) {
				if (!orbium.has_canvas) {
					if (this.element2 != null) {
						this.element2.style.left = Math.round(this.xpos)+"px";
						this.element2.style.top = Math.round(this.ypos)+"px";
					}
				} else {
					if (this.image2 != null) {
						orbium.ctx.drawImage(this.image2, Math.round(this.xpos), Math.round(this.ypos), this.width, this.height);
					}
				}

				if (this.image3 == null) {
					this.dirty = false;
				}
			}
		}; orbium.Sprite.prototype.draw2 = this.draw2;

		this.draw3 = function() {
			if (this.dirty) {
				if (!orbium.has_canvas) {
					if (this.element3 != null) {
						this.element3.style.left = Math.round(this.xpos)+"px";
						this.element3.style.top = Math.round(this.ypos)+"px";
					}
				} else {
					if (this.image3 != null) {
						orbium.ctx.drawImage(this.image3, Math.round(this.xpos), Math.round(this.ypos), this.width, this.height);
					}
				}

				this.dirty = false;
			}
		}; orbium.Sprite.prototype.draw3 = this.draw3;
	};
}(window.orbium = window.orbium || {}));
