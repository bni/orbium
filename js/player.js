(function(orbium) {
	orbium.Player = function() {
		var hasPhoneGapMedia = null; // PhoneGap Media support?
		var hasSoundPlug = null; // SoundPlug plugin support?
		var hasNativeAudio = null; // HTML5 native support?

		this.audioSupported = null; // Audio supported flag
		this.muted = null; // Muted flag

		this.construct = function() {
			hasPhoneGapMedia = false;
			hasSoundPlug = false;
			hasNativeAudio = false;

			if ((orbium.Util.isUA("iPhone") || orbium.Util.isUA("iPad")) &&
				orbium.Util.isPG()) {
				hasSoundPlug = true;
			} else if (orbium.Util.isPG()) {
				hasPhoneGapMedia = true;
			} else 	if (!!document.createElement("audio").canPlayType) {
				var a = document.createElement("audio");

				if (!!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''))) {
					hasNativeAudio = true;
				}
			}

			if (hasPhoneGapMedia || hasSoundPlug || hasNativeAudio) {
				this.audioSupported = true;
				this.muted = false;
			} else {
				this.audioSupported = false;
				this.muted = true;
			}

			// Disable sounds on certain devices and cases that are problematic
			if (((orbium.Util.isUA("iPhone") || orbium.Util.isUA("iPad")) &&
				!orbium.Util.isPG()) || orbium.Util.isUA("Android")) {
				this.audioSupported = false;
				this.muted = true;
			}
		};

		this.play = function(sound) {
			if (this.audioSupported && !this.muted) {
				if (hasPhoneGapMedia) {
					// Disabled for now since it doesnt work
					//new Media("/android_asset/"+sound+".wav").play();
				} else if (hasSoundPlug) {
					PhoneGap.exec("SoundPlug.play", sound+".wav");
				} else if (hasNativeAudio) {
					new Audio("snd/wav/"+sound+".wav").play();
				}
			}
		};

		this.construct.apply(this, arguments);
	};
}(typeof window != "undefined" ? window.orbium = window.orbium || {} : orbium));
