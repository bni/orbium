orbium = {};

(function(orbium, undefined) {
	var net = require("net");
	var crypto = require("crypto");

	require("./level_show.js");
	require("./util.js");
	require("./sprite.js");
	require("./tile.js");
	require("./emptytile.js");
	require("./rotator.js");
	require("./horiztile.js");
	require("./verttile.js");
	require("./crosstile.js");
	require("./counter.js");
	require("./announcer.js");
	require("./timer.js");
	require("./clock.js");
	require("./teleporter.js");
	require("./inspector.js");
	require("./transformer.js");
	require("./director.js");
	require("./matcher.js");
	require("./sequencer.js");
	require("./indicator.js");
	require("./falltile.js");
	require("./lane.js");
	require("./bar.js");
	require("./marble.js");
	require("./dockee.js");
	require("./machine.js");

	var handshake = function(client, data) {
		var request = (""+data).split("\r\n");

		var k1 = request[5].split(": ")[1];
		var k2 = request[6].split(": ")[1];

		var n1 = parseInt(k1.replace(/[^\d]/g, ''));
		var n2 = parseInt(k2.replace(/[^\d]/g, ''));

		var s1 = k1.replace(/[^ ]/g, '').length;
		var s2 = k2.replace(/[^ ]/g, '').length;

		n1 /= s1;
		n2 /= s2;

		var head = request[8];

		var md5 = crypto.createHash("md5");

		md5.update(String.fromCharCode(
			n1 >> 24 & 0xFF,
			n1 >> 16 & 0xFF,
			n1 >> 8 & 0xFF,
			n1 & 0xFF));

		md5.update(String.fromCharCode(
			n2 >> 24 & 0xFF,
			n2 >> 16 & 0xFF,
			n2 >> 8 & 0xFF,
			n2 & 0xFF));

		md5.update(head);

		var response = [
			"HTTP/1.1 101 WebSocket Protocol Handshake",
			"Upgrade: WebSocket",
			"Connection: Upgrade",
			"Sec-WebSocket-Origin: "+request[4].split(": ")[1],
			"Sec-WebSocket-Location: ws://"+request[3].split(": ")[1]+"/",
			"",
			md5.digest("binary")];

		client.socket.write(response.join("\r\n"), "binary");
	};

	var send = function(client, msg) {
		client.socket.write("\u0000", "binary");
		client.socket.write(JSON.stringify(msg), "utf8");
		client.socket.write("\uffff", "binary");
	};

	orbium.Server = function() {
		var clients = [];
		
		this.addClient = function(client) {
			orbium.Util.addArrayElement(clients, client);			
		};

		this.removeClient = function(client) {
			orbium.Util.removeArrayElement(clients, client);
		};

		this.broadcast = function(msg, exclude) {
			for (var i = 0, j = clients.length; i < j; i++) {
				var client = clients[i];

				if (exclude === undefined || client !== exclude) {
					send(client, msg);
				}
			}
		};
	};

	orbium.server = new orbium.Server();

	orbium.has_dom = false;
	orbium.has_transform = false;
	orbium.has_canvas = false;

	orbium.has_touch_screen = false;
	orbium.has_touch_api = false;

	orbium.Machine.timeLimits = false;
	orbium.Machine.editorMode = false;
	orbium.Machine.horizTiles = 8;
	orbium.Machine.vertTiles = 5;

	orbium.Tile.size = 128;
	orbium.Marble.size = 40;
	orbium.Bar.height = 57;

	var refMarbleSpeed = 48;
	var refRotatorSpeed = 60;
	var refTilesize = 36;
	orbium.Marble.speed =
		Math.round(orbium.Tile.size/refTilesize*refMarbleSpeed);
	orbium.Rotator.speed =
		Math.round(orbium.Tile.size/refTilesize*refRotatorSpeed);

	orbium.level = orbium.level_show;

	orbium.width = orbium.Tile.size*orbium.Machine.horizTiles;
	orbium.height = orbium.Tile.size*orbium.Machine.vertTiles+
		orbium.Bar.height;

	orbium.machine = new orbium.Machine();
	orbium.machine.nextLevel();

	orbium.machine.loaded = true;
	orbium.machine.first = false;

	setInterval(function() {orbium.machine.run();}, 1000/60);
	
	var levelStarted = false;

	var listener = net.createServer();
	listener.listen(1991);

	listener.on("connection", function (socket) {
		socket.setEncoding("binary");

		var handshakeComplete = false;

		var client = {};
		client.id = orbium.Util.generateUniqeString();
		client.socket = socket;
		orbium.server.addClient(client);

		socket.on("data", function(data) {
			if (!handshakeComplete) {
				handshake(client, data);

				client.socket.setNoDelay(true);
				client.socket.setEncoding("utf8");

				console.log(client.id+" connected");

				var state = orbium.machine.getState();

				send(client, state);

				handshakeComplete = true;

				if (!levelStarted) {
					levelStarted = true;

					orbium.machine.startLevel();
				}
			} else {
				// trim padding
				var received = data.substring(1, data.length-1);

				var msg = JSON.parse(received);

				if (msg.rotate !== undefined) {
					orbium.machine.rotateRotator(msg.rotate);

					var dist = {rotate: msg.rotate};
					orbium.server.broadcast(dist, client);
				} else if (msg.launch !== undefined) {
					orbium.machine.launchRotator(msg.launch, msg.dir);

					var dist = {launch: msg.launch, dir: msg.dir};
					orbium.server.broadcast(dist, client);
				}
			}
		});

		socket.on("close", function(had_error) {
			orbium.server.removeClient(client);
			console.log(client.id+" disconnected");
		});
	});
})(orbium);
