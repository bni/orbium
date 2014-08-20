[Orbium](http://bni.github.com/orbium)
================================

About the game
---------------------------------------
Orbium is a modern version of the 90's game [Log!cal](http://hol.abime.net/906).

Try the game at [http://bni.github.com/orbium](http://bni.github.com/orbium).

The code is JavaScript without external dependencies or frameworks. Rendering is done using CSS (translate3d), HTML5 Canvas or DOM manipulation, depending on browser capabilities.

The game targets both desktop and mobile browsers, and works equally well with mouse as with touch input (swipes). Resolution independence is done by selecting an optimal set of resized graphics.

Orbium has partially completed multiplayer (not playable yet). The game server can be run in Node.js, and uses the same code as the client for running the server side simulation. WebSockets is used for communication.

Licenses
----------------------------------------
Source code is licensed under the GNU General Public License, version 2.
Graphics is licensed under the Creative Commons Attribution-NonCommercial 3.0 Unported License.
