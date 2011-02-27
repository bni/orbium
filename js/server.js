orbium = {};

(function(orbium) {
	var net = require("net");
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

	require("./machine.js");

	var server = net.createServer();
	server.listen(1991);

	var clients = [];

	var broadcast = function(msg) {
		for (var i = 0, j = clients.length; i < j; i++) {
			clients[i].socket.write(msg);
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

	server.on("connection", function (socket) {
		var client = {};
		client.id = orbium.Util.generateUniqeString();
		client.socket = socket;
		orbium.Util.addArrayElement(clients, client);

		console.log("connected: "+client.id+", "+clients.length+" clients connected");
		socket.write("you are: "+client.id+"\r\n");
		broadcast(""+client.id+" joined\r\n");

		socket.on("data", function(data) {
			broadcast(""+client.id+" says: "+data);
		});

		socket.on("close", function(had_error) {
			orbium.Util.removeArrayElement(clients, client);
			broadcast(""+client.id+" left\r\n");
			console.log("disconnected: "+client.id+", "+clients.length+" clients connected");
		});
	});
}(orbium));
