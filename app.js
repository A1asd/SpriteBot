const FRAME_DURATION = 1000/60;
const getTime = typeof performance === 'function' ? performance.now : Date.now;

let lastUpdate = getTime();
let spriteArray = [];
let elapsedTime = 0;

function animate() {
	const now = getTime();

	const delta = (now - lastUpdate) / FRAME_DURATION;

	elapsedTime = elapsedTime + delta;

	if (spriteArray.length > 0 && elapsedTime > 5) {
		spriteArray.forEach(function(sprite) {
			sprite.incrementFrame();
			sprite.move();
			sprite.update();
		});
		elapsedTime = 0;
	}

	lastUpdate = now;

	requestAnimationFrame(animate);
}

function initDom() {
	/*
		<button onclick="SpriteHandler.animateSprite('amoistbeard', 'cheer')">cheer animation</button>
		<button onclick="SpriteHandler.animateSprite('amoistbeard', 'sit')">sit animation</button>
	*/
	createButton("amoistbeard", "HollowKnight");
	createButton("inzane", "MushroomMan");
	createButton("baaam24", "HollowKnight");
}

function createButton(name, sprite) {
	let buttonElem = document.createElement('button');
	let buttonText = document.createTextNode(sprite + ' - ' + name);
	buttonElem.appendChild(buttonText);
	buttonElem.onclick = function() {
		SpriteHandler.spawnSprite(name, sprite)
	};
	document.body.appendChild(buttonElem);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

document.addEventListener("DOMContentLoaded", function() {
	if (configuration.debugMode) {
		initDom();
	}
	animate();
});
