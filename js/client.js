(function(orbium) {
	orbium.Client = function(url) {
		var socket = null;

		this.construct = function() {
			console.log("trying to connect.");
			socket = new WebSocket(url);
			socket.onopen = this.opened;
			socket.onmessage = this.received;
		};

		this.opened = function() {
			console.log("connection established.");
		};

		this.send = function(msg) {
		    socket.send(msg);
		};

		this.received = function(msg) {
			var received = msg.data;
			//console.log("received: "+received);

			var command = received.split(":")[0];

			if (command === "STATE") {
				orbium.machine.setStateString(received);
			} else if (command === "R") {
				var arg1 = received.split(":")[1];

				orbium.machine.rotateRotator(parseInt(arg1));
			}
		};

		var that = this; this.construct.apply(this, arguments);
	};
}(typeof window != "undefined" ? window.orbium = window.orbium || {} : orbium));
