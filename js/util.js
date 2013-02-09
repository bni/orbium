(function(orbium, undefined) {
	orbium.Util = {};

	orbium.Util.withinRect = function(xchk, ychk, xpos, ypos, width, height) {
		if (xchk >= xpos && xchk <= xpos+width) {
			if (ychk >= ypos && ychk <= ypos+height) {
				return true;
			}
		}

		return false;
	};

	orbium.Util.addArrayElement = function(array, element) {
		array.push(element);
	};

	orbium.Util.setArrayElement = function(idx, array, element) {
		array[idx] = element;
	};

	orbium.Util.removeArrayElement = function(array, element) {
		for (var i = 0, j = array.length; i < j; i++) {
			if (array[i] === element) {
				array.splice(i, 1);
				return;
			}
		}
	};

	orbium.Util.generateRandomIndex = function(max) {
		var rand = Math.random();

		for (var i = 0; i < max; i++) {
			if (rand < (i+1)/(max+1)) {
				return i;
			}
		}

		return max;
	};

	orbium.Util.isPG = function() {
		if (typeof Media === "function") {
			return true;
		}

		return false;
	};

	orbium.Util.isUA = function(name) {
		if (navigator.userAgent.indexOf(name) !== -1) {
			return true;
		}

		return false;
	};

	orbium.Util.getDevicePixelRatio = function() {
		if (window.devicePixelRatio === undefined) {
			return 1;
		}

		return window.devicePixelRatio;
	};

	orbium.Util.generateUniqeString = function() {
		var allowed = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
			"abcdefghijklmnopqrstuvwxyz";

		var chars = allowed.split("");

		var arr = [];

		for (var i = 0; i < 6; i++) {
			arr[i] = chars[0 | Math.random()*chars.length];
		}

		return arr.join("");
	};

	orbium.Util.attachListener = function(element, event, func) {
		if (element.addEventListener) {
			element.addEventListener(event, func, true);
		} else if (element.attachEvent) {
			element.attachEvent("on"+event, func);
		}
	};

	orbium.Util.detachListener = function(element, event, func) {
		if (element.removeEventListener) {
			element.removeEventListener(event, func, true);
		} else if (element.attachEvent) {
			element.detachEvent("on"+event, func);
		}
	};

	orbium.Util.getRequestParameter = function(name) {
		function getRequestParameters() {
			var result = {};
			var url = window.location.href;
			var parameters = url.slice(url.indexOf("?") + 1).split("&");

			for (var i = 0, j = parameters.length; i < j; i++) {
				var parameter = parameters[i].split("=");

				result[parameter[0]] = parameter[1];
			}

			return result;
		}

		return getRequestParameters()[name];
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
