(function(orbium) {
	orbium.Player = function() {
		var type = null;

		var supportsPGM = null; // PhoneGap Media support?
		var supportsSPP = null; // SoundPlug support?
		var supportsWAV = null; // WAV codec support?
		var supportsMP3 = null; // MP3 codec support?
		var supportsOGG = null; // OGG/Vorbis codec support?

		this.audioSupported = null; // Audio supported flag
		this.muted = null; // Muted flag

		this.construct = function() {
			supportsPGM = false;
			supportsSPP = false;
			supportsWAV = false;
			supportsMP3 = false;
			supportsOGG = false;

			if (orbium.Util.isPG() && orbium.Util.isUA("iPhone")) {
				supportsSPP = true;
			} else if (orbium.Util.isPG()) {
				supportsPGM = true;
			} else 	if (!!document.createElement("audio").canPlayType) {
				var a = document.createElement("audio");

				if (!!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''))) {
					supportsWAV = true;
				}

				if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))) {
					supportsMP3 = true;
				}

				if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))) {
					supportsOGG = true;
				}
			}

			if (supportsPGM) {
				type = "wav";
			} else if (supportsSPP) {
				type = "wav";
			} else if (supportsWAV) {
				type = "wav";
			} else if (supportsMP3) {
				type = "mp3";
			} else if (supportsOGG) {
				type = "ogg";
			}

			if (supportsPGM || supportsSPP || supportsWAV || supportsMP3 || supportsOGG) {
				this.audioSupported = true;
				this.muted = false;
			} else {
				this.audioSupported = false;
				this.muted = true;
			}

			// Disable sounds on certain devices and cases that are problematic
			if ((orbium.Util.isUA("iPhone") && !orbium.Util.isPG()) ||
				orbium.Util.isUA("webOS") ||
				orbium.Util.isUA("Android") ||
				orbium.Util.isUA("MSIE") ||
				orbium.Util.isUA("Chrome")) {
				this.audioSupported = false;
				this.muted = true;
			}
		};

		this.play = function(sound) {
			if (this.audioSupported && !this.muted) {
				if (supportsPGM) {
					new Media("snd/"+type+"/"+sound+"."+type).play();
				} else if (supportsSPP) {
					PhoneGap.exec("SoundPlug.play", sound+"."+type);
				} else {
					new Audio("snd/"+type+"/"+sound+"."+type).play();
				}
			}
		};

		this.construct.apply(this, arguments);
	};
}(window.orbium = window.orbium || {}));
