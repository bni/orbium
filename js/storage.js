(function(orbium, undefined) {
	orbium.Storage = function() {
		var haveStorageAPI = null;

		this.construct = function() {
			if (!window.localStorage) {
				haveStorageAPI = false;
			} else {
				haveStorageAPI = true;
			}

			// Storage API disabled on these platforms becouse they did not
			// support them when this code was written.
			// They might now, but we must continue to use cookies if we
			// started with it once, since data is already there
			if (orbium.Util.isUA("webOS") || orbium.Util.isUA("MSIE")) {
				haveStorageAPI = false;
			}
		};

		var createCookie = function(name, value, days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));

			var expires = "; expires="+date.toGMTString();

			document.cookie = name+"="+value+expires+"; path=/";
		};

		var readCookie = function(name) {
			var name2 = name+"=";
			var ca = document.cookie.split(";");

			for (var i = 0, j = ca.length; i < j; i++) {
				var c = ca[i];

				while (c.charAt(0) === " ") {
					c = c.substring(1, c.length);
				}

				if (c.indexOf(name2) === 0) {
					return c.substring(name2.length, c.length);
				}
			}

			return null;
		};

		this.readValue = function(name) {
			var value;

			if (!haveStorageAPI) {
				value = readCookie(name);
			} else {
				value = window.localStorage.getItem(name);
			}

			return value;
		};

		this.writeValue = function(name, value) {
			if (!haveStorageAPI) {
				createCookie(name, value, 3650);
			} else {
				window.localStorage.setItem(name, value);
			}
		};

		this.deleteValue = function(name) {
			if (!haveStorageAPI) {
				createCookie(name, "", -1);
			} else {
				window.localStorage.removeItem(name);
			}
		};

		this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
