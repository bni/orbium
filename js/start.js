if (top.location !== self.location) { top.location = self.location; }

if (window.applicationCache) {
	applicationCache.addEventListener("updateready", function() {
		window.location.reload();
	});
}

document.addEventListener("DOMContentLoaded", function() {
	orbium.init();
}, false);
