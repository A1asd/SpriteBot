const FRAME_DURATION = 1000/60;
const getTime = typeof performance === 'function' ? performance.now : Date.now;

let lastUpdate = getTime();
let spriteArray = [];
let elapsedTime = 0;

function animate() {
	const now = getTime();

	const delta = (now - lastUpdate) / FRAME_DURATION;

	elapsedTime = elapsedTime + delta;

	

	if (spriteArray.length > 0 && elapsedTime > 1) {
		spriteArray.forEach(function(sprite) {
			sprite.move(delta);
			sprite.update();
		});
		
	}
	if (spriteArray.length > 0 && elapsedTime > 10) {
		spriteArray.forEach(function(sprite) {
			sprite.incrementFrame();
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
	createSpawnButton("amoistbeard", "HollowKnight");
	createAnimateButton("amoistbeard", "sit");
	createAnimateButton("amoistbeard", "cheer");
	createSpawnButton("inzane", "MushroomMan");
	createSpawnButton("baaam24", "HollowKnight");
}

function createSpawnButton(name, sprite) {
	let buttonElem = document.createElement('button');
	let buttonText = document.createTextNode(sprite + ' - ' + name);
	buttonElem.appendChild(buttonText);
	buttonElem.onclick = function() {
		console.log("Spawning a " + sprite + " for " + name);
		SpriteHandler.spawnSprite(name, sprite)
	};
	document.body.appendChild(buttonElem);
}

function createAnimateButton(name, animation) {
	let buttonElem = document.createElement('button');
	let buttonText = document.createTextNode(animation + ' - ' + name);
	buttonElem.appendChild(buttonText);
	buttonElem.onclick = function() {
		console.log("Setting " + animation + " animation for " + name);
		SpriteHandler.animateSprite(name, animation)
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
	/*if (configuration.debugMode) {
		initDom();
	}*/
	animate();
});
