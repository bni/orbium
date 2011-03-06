[Orbium](http://jsway.se) - The Ancient Alien Puzzle Game
================================

About the game
---------------------------------------
Orbium is a modern version of the 90's game [Log!cal](http://hol.abime.net/906).

Try the game at [http://bni.github.com/orbium](http://bni.github.com/orbium).

The code is JavaScript without external dependencies or frameworks. Rendering is done to CSS3 (translate3d), canvas or DOM, depending on browser capabilities.

The game targets both desktop and mobile browsers, and works equally well with mouse as with touch input (swipes). Resolution independence is done by selecting an optimal set of resized graphics (done offline previously). Game code can optimally run in a WebView (PhoneGap), and it is currently sold in multiple app stores.

Future plans include a node.js multiplayer server that accept WebSocket connections from game clients. As WebGL becomes more mainstream a renderer using it will most likely happen.

More info can be found at [http://jsway.se](http://jsway.se).

Licenses
----------------------------------------
Source code is licensed under the GNU General Public License, version 2.
Graphics is licensed under the Creative Commons Attribution-NonCommercial 3.0 Unported License.
