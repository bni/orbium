(function(orbium, undefined) {
	orbium.Client = function(url) {
		var socket = null;

		var connected = null;

		this.construct = function() {
			console.log("trying to connect.");
			connected = false;

			socket = new WebSocket(url);
			socket.onopen = this.opened;
			socket.onmessage = this.received;
		};

		this.opened = function() {
			console.log("connection established.");
			connected = true;
		};

		this.send = function(msg) {
			socket.send(JSON.stringify(msg));
		};

		this.received = function(e) {
			var received = e.data;

			var msg = JSON.parse(received);

			if (msg.rotators !== undefined) {
				orbium.machine.setState(msg);
			} else if (msg.rotate !== undefined) {
				orbium.machine.rotateRotator(msg.rotate);
			} else if (msg.launch !== undefined) {
				orbium.machine.launchRotator(msg.launch, msg.dir);
			}
		};

		this.connected = function() {
			return connected;
		};

		var that = this; this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
