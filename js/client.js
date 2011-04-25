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
		    socket.send(msg);
		};

		this.received = function(msg) {
			var received = msg.data;
			//console.log("received: "+received);

			var command = received.split(";")[0];

			if (command === "S") {
				var state = received.split("S;")[1];

				orbium.machine.setState(state);
			} else if (command === "R") {
				var count = received.split(";")[1];

				orbium.machine.rotateRotator(parseInt(count));
			}
		};

		this.connected = function() {
		    return connected;
		};

		var that = this; this.construct.apply(this, arguments);
	};
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
