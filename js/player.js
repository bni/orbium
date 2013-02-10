(function(orbium, undefined) {
	orbium.Player = function() {
		var iOSSoundPlug = null; // iOS SoundPlug plugin support?
		var webOSSoundPlug = null; // webOS SoundPlug plugin support?
		var html5NativeAudio = null; // HTML5 native support?

		this.audioSupported = null; // Audio supported flag
		this.muted = null; // Muted flag

		this.construct = function() {
			iOSSoundPlug = false;
			webOSSoundPlug = false;
			html5NativeAudio = false;

			if ((orbium.Util.isUA("iPhone") || orbium.Util.isUA("iPad")) &&
				orbium.Util.isPG()) {
				iOSSoundPlug = true;
			} else if (orbium.Util.isUA("webOS") ||
				orbium.Util.isUA("wOSSystem")) {
				webOSSoundPlug = true;
			} else if (!!document.createElement("audio").canPlayType) {
				var a = document.createElement("audio");

				var wavStr = 'audio/wav; codecs="1"';
				if (!!(a.canPlayType &&
					a.canPlayType(wavStr).replace(/no/, ''))) {
					html5NativeAudio = true;
				}
			}

			if (iOSSoundPlug || webOSSoundPlug || html5NativeAudio) {
				this.audioSupported = true;
				this.muted = false;
			} else {
				this.audioSupported = false;
				this.muted = true;
			}

			// Disable audio on iOS when running without SoundPlug
			// Although Mobile Safari supports HTML5 audio, it is useless for games
			if ((orbium.Util.isUA("iPhone") || orbium.Util.isUA("iPad")) &&
				!orbium.Util.isPG()) {
					this.audioSupported = false;
					this.muted = true;
			}

			// No way to play audio in Android browser/webview yet, so disable it
			// It might work in Chrome, so only mute
			// Let user enable it as an experimental feature
			if (orbium.Util.isUA("Android")) {
				this.muted = true;
			}
		};

		this.play = function(sound) {
			if (this.audioSupported && !this.muted) {
				if (iOSSoundPlug) {
					PhoneGap.exec("SoundPlug.play", sound+".wav");
				} else if (webOSSoundPlug) {
					var soundPlug = document.getElementById("soundPlug");
					if (soundPlug.play !== undefined) {
						soundPlug.play("snd/wav/"+sound+".wav");
					}
				} else if (html5NativeAudio) {
					new Audio("snd/wav/"+sound+".wav").play();
				}
			}
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
