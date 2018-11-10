(function (orbium, undefined) {
  orbium.has_touch_screen = false;

  orbium.pane = null;
  orbium.canv = null;
  orbium.ctx = null;

  orbium.loader = null;
  orbium.player = null;
  orbium.storage = null;
  orbium.menu = null;
  orbium.editor = null;
  orbium.sign = null;
  orbium.tutorial = null;
  orbium.machine = null;

  orbium.packs = null;
  orbium.pack_idx = null;
  orbium.level = null;

  orbium.xpos = 0;
  orbium.ypos = 0;
  orbium.width = 0;
  orbium.height = 0;

  orbium.gfx_path = null;

  orbium.init = function () {
    // If touch API is available always use touch screen.
    if ("ontouchstart" in window) {
      orbium.has_touch_screen = true;
    }

    var ratio = window.devicePixelRatio || 1;

    // Determine the width and height we have avalable for disposal
    var avail_width = 0;
    var avail_height = 0;
    if (!orbium.has_touch_screen) { // Desktop
      var w = orbium.Util.getRequestParameter("w");
      var h = orbium.Util.getRequestParameter("h");

      if (w !== undefined && h !== undefined) {
        avail_width = parseInt(w);
        avail_height = parseInt(h);
      } else {
        avail_width = window.innerWidth;
        avail_height = window.innerHeight;
      }
    } else { // Device with touch screen
      // Width and height is dependent on rotation. Use the largest value as width.
      if (screen.width > screen.height) {
        avail_width = screen.width;
        avail_height = screen.height;
      } else {
        avail_width = screen.height;
        avail_height = screen.width;
      }

      avail_width = Math.round(avail_width * ratio);
      avail_height = Math.round(avail_height * ratio);
    }

    var dimensions = orbium.dimensions_1152x784;

    orbium.Machine.timeLimits = true;
    orbium.Machine.editorMode = false;
    orbium.Machine.horizTiles = 8;
    orbium.Machine.vertTiles = 5;

    orbium.Tile.size = dimensions.tile_size;
    orbium.Marble.size = dimensions.marble_size;
    orbium.Bar.height = dimensions.bar_height;

    orbium.gfx_path = dimensions.gfx_path;

    var refMarbleSpeed = 48;
    var refRotatorSpeed = 60;
    var refTilesize = 36;
    orbium.Marble.speed =
      Math.round(orbium.Tile.size / refTilesize * refMarbleSpeed);
    orbium.Rotator.speed =
      Math.round(orbium.Tile.size / refTilesize * refRotatorSpeed);

    orbium.packs = [];
    orbium.pack_idx = 0;

    orbium.packs[orbium.pack_idx] = {
      id: "000000",
      name: "DEFAULT",
      level: null
    };

    if (orbium.levels !== undefined) {
      orbium.packs[orbium.pack_idx].level = orbium.levels;
    } else {
      return; // No levels was found
    }

    orbium.level = orbium.packs[orbium.pack_idx].level;

    orbium.width = orbium.Tile.size * orbium.Machine.horizTiles;
    orbium.height = orbium.Tile.size * orbium.Machine.vertTiles +
      orbium.Bar.height;

    // Calculate placement
    if (navigator.userAgent.indexOf("iPhone") !== -1) {
      orbium.xpos = Math.round((avail_width/2-orbium.width/2));

      if (ratio === 3) {
        orbium.xpos = Math.round((avail_width/2-orbium.width/2) - avail_width*0.185); // Hack
      } else {
        orbium.xpos = Math.round((avail_width/2-orbium.width/2));
      }

      orbium.ypos = 0;
    } else if (navigator.userAgent.indexOf("iPad") !== -1) {
      orbium.xpos = 0;

      orbium.ypos = Math.round((avail_height*0.009)); // Hack
    } else {
      orbium.xpos = Math.round(avail_width/2-orbium.width/2);
      orbium.ypos = Math.round(avail_height/2-orbium.height/2);
    }

    orbium.pane = document.getElementById("pane");
    orbium.pane.style.width = "" + orbium.width + "px";
    orbium.pane.style.height = "" + orbium.height + "px";

    orbium.pane.style.left = "" + orbium.xpos + "px";
    orbium.pane.style.top = "" + orbium.ypos + "px";

    // Create a canvas element
    orbium.canv = document.getElementById("canv");
    orbium.canv.style.visibility = "visible";
    orbium.canv.width = orbium.width;
    orbium.canv.height = orbium.height;
    orbium.ctx = orbium.canv.getContext("2d");

    // Calculate scale and set viewport, will fill screen precisely
    var scale = 1.0;
    if (navigator.userAgent.indexOf("iPhone") !== -1) {
      scale = (1 / ratio) * (avail_height / orbium.height);
    } else if (navigator.userAgent.indexOf("iPad") !== -1) {
      scale = (1 / ratio) * (avail_width / orbium.width);
    }

    var vp_value = "width=device-width, ";
    vp_value += "initial-scale=" + scale + ", ";
    vp_value += "minimum-scale=" + scale + ", ";
    vp_value += "maximum-scale=" + scale;

    document.getElementById("vp").attributes.content.value = vp_value;

    orbium.loader = new orbium.Loader();
    orbium.player = new orbium.Player();
    orbium.storage = new orbium.Storage();
    orbium.menu = new orbium.Menu();
    orbium.sign = new orbium.Sign();
    orbium.perf = new orbium.Perf();
    orbium.tutorial = new orbium.Tutorial();
    orbium.machine = new orbium.Machine();
    orbium.machine.nextLevel();

    if (orbium.has_touch_screen) {
      orbium.Util.attachListener(orbium.pane, "touchstart", function(e) {orbium.machine.startDrag(e);});
      orbium.Util.attachListener(orbium.pane, "touchend", function(e) {orbium.machine.endDrag(e);});
      orbium.Util.attachListener(orbium.pane, "touchmove", function(e) {orbium.machine.moveDrag(e);});

      orbium.menu.setupTouchEvents();
    } else {
      orbium.Util.attachListener(orbium.pane, "mousedown", function(e) {orbium.machine.mouseDown(e);});

      orbium.menu.setupMouseEvents();
    }

    orbium.editor = new orbium.Editor();

    (function animloop() {
      orbium.machine.run();
      window.requestAnimationFrame(animloop);
    })();
  };
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
