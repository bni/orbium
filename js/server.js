orbium = {};

(function(orbium) {
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

	var server = net.createServer();
	server.listen(1991);

	var clients = [];

	var send = function(client, msg) {
	    client.socket.write("\u0000", "binary");
	    client.socket.write(msg, "utf8");
	    client.socket.write("\uffff", "binary");
	}

	var broadcast = function(msg) {
		for (var i = 0, j = clients.length; i < j; i++) {
		    clients[i].socket.write("\u0000", "binary");
		    clients[i].socket.write(msg, "utf8");
		    clients[i].socket.write("\uffff", "binary");
		}
	}

	orbium.has_dom = false;
	orbium.has_transform = false;
	orbium.has_canvas = false;

	orbium.has_touch_screen = false;
	orbium.has_touch_api = false;

	orbium.Machine.timeLimits = true;
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

	var target_fps = 60;

	setInterval(function() {orbium.machine.run();},
		Math.round(1000/target_fps));

	orbium.machine.startLevel();

	server.on("connection", function (socket) {
	    socket.setEncoding("binary");
	
		var handshakeComplete = false;

		var client = {};
		client.id = orbium.Util.generateUniqeString();
		client.socket = socket;
		orbium.Util.addArrayElement(clients, client);

		socket.on("data", function(data) {
			if (!handshakeComplete) {
				//console.log("REQ:\r\n"+data);
				var request = (""+data).split("\r\n");

				var k1 = request[5].split(": ")[1];
				var k2 = request[6].split(": ")[1];
				//console.log("k1: "+k1);
				//console.log("k2: "+k2);

				var n1 = parseInt(k1.replace(/[^\d]/g, ''));
				var n2 = parseInt(k2.replace(/[^\d]/g, ''));
				//console.log("n1: "+n1);
				//console.log("n2: "+n2);

				var s1 = k1.replace(/[^ ]/g, '').length;
				var s2 = k2.replace(/[^ ]/g, '').length;
				//console.log("s1: "+s1);
				//console.log("s2: "+s2);

				n1 /= s1;
				n2 /= s2;
				//console.log("n1: "+n1);
				//console.log("n2: "+n2);

				var head = request[8];
				//console.log("head: "+head);
				//console.log("head.length: "+head.length);

				var md5 = crypto.createHash("md5");

				md5.update(String.fromCharCode(
				        n1 >> 24 & 0xFF,
				        n1 >> 16 & 0xFF,
				        n1 >> 8  & 0xFF,
				        n1       & 0xFF));

				md5.update(String.fromCharCode(
				        n2 >> 24 & 0xFF,
				        n2 >> 16 & 0xFF,
				        n2 >> 8  & 0xFF,
				        n2       & 0xFF));

				md5.update(head);

				var result = md5.digest("binary");
				//console.log("result: "+result);

				var response = [
					"HTTP/1.1 101 WebSocket Protocol Handshake",
					"Upgrade: WebSocket",
					"Connection: Upgrade",
					"Sec-WebSocket-Origin: "+request[4].split(": ")[1],
					"Sec-WebSocket-Location: ws://"+request[3].split(": ")[1]+"/",
					"",
					result];

				//console.log("RESP:\r\n"+response.join("\r\n"));

				socket.write(response.join("\r\n"), "binary");

			    socket.setTimeout(0);
			    socket.setNoDelay(true);
			    socket.setEncoding("utf-8");

				console.log("connected: "+client.id+", "+clients.length+" clients connected");
				send(client, "you are: "+client.id+"\r\n");
				broadcast(""+client.id+" joined\r\n");

				handshakeComplete = true;
			} else {
				broadcast(""+client.id+" says: "+data);
			}
		});

		socket.on("close", function(had_error) {
			orbium.Util.removeArrayElement(clients, client);
			broadcast(""+client.id+" left\r\n");
			console.log("disconnected: "+client.id+", "+clients.length+" clients connected");
		});
	});
}(orbium));
