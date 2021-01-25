class Sprite {
	currentFrame;
	imageContainer;
	currentAnimation;
	currentSprite;
	targetPosition = null;

	static dataset = {
		"HollowKnight" : {
			"name": "HollowKnight",
			"height": 64,
			"width": 48,
			"animations": {
				"idle": {
					"row": 1,
					"frames": 4,
					"loops": 0,
				},
				"cheer": {
					"row": 2,
					"frames": 6,
					"loops": 7,
				},
			},
		},
		"MushroomMan" : {
			"name": "MushroomMan",
			"height": 64,
			"width": 32,
			"animations": {
				"idle": {
					"row": 1,
					"frames": 4,
					"loops": 0,
				},
				"cheer": {
					"row": 2,
					"frames": 4,
					"loops": 1,
				},
			},
		},
	};

	constructor(spriteString, imageContainer) {
		this.currentFrame = 0;
		this.imageContainer = imageContainer;
		this.currentSprite = Sprite.dataset[spriteString];
		this.setAnimation("idle");
	}

	setAnimation(animationString) {
		this.currentAnimation = this.currentSprite.animations[animationString];
		this.currentFrame = 0;
	}

	setTarget(position) {
		if (this.targetPosition === null) {
			this.targetPosition = position;
		}
	}

	incrementFrame() {
		this.currentFrame++;
		if (this.currentAnimation.frames <= this.currentFrame) {
			this.currentFrame = 0;
		}
	}

	move() {
		if (this.targetPosition === null) {
			this.setTarget({x: Math.random() * 800, y:0});
			return;
		}

		let step = Math.min(Math.abs(this.targetPosition.x - this.imageContainer.offsetLeft) / 15, 5);

		if (this.targetPosition.x >= this.imageContainer.offsetLeft) {
			this.imageContainer.style.transform = "scaleX(-1)";
			this.imageContainer.style.left = (this.imageContainer.offsetLeft + step) + "px";
		} else {
			this.imageContainer.style.transform = "";
			this.imageContainer.style.left = (this.imageContainer.offsetLeft - step) + "px";
		}

		if (Math.abs(this.targetPosition.x - this.imageContainer.offsetLeft) <= 10) {
			this.targetPosition = null;
		}
	}

	parting() {

	}
	
	update() {
		let x = this.currentSprite.width * this.currentFrame;
		let y = this.currentSprite.height * (this.currentAnimation.row - 1);

		this.imageContainer.style.backgroundPositionX = x + "px";
		this.imageContainer.style.backgroundPositionY = y + "px";
	}
}

class SpriteHandler {
	static spriteCount = 0;
	static imageContainer;
	static allOwners = {};

	static spawnSprite(user, spriteString) {
		// Check if sprite exists
		if (Sprite.dataset[spriteString] === undefined) return;

		if (SpriteHandler.allOwners[user] === undefined) {
			SpriteHandler.addNewSprite(user, spriteString);
		} else {
			SpriteHandler.changeSprite(user, spriteString);
		}

		//SpriteHandler.allOwners[user] = spriteString;
	}

	static createImageContainer(user) {
		SpriteHandler.spriteCount++;
		let container = document.createElement("div");
		container.id = "imageContainer" + SpriteHandler.spriteCount;
		container.style.width = "32px";
		container.style.height = "64px";
		container.style.position = "absolute";
		container.style.bottom = "-64px";
		container.style.left = Math.random() * 400;
		container.style.color = getRandomColor();

		let textNode = document.createTextNode(user)
		container.appendChild(textNode);


		return container;
	}

	static addNewSprite(user, spriteString) {
		let container = SpriteHandler.createImageContainer(user);
		document.body.appendChild(container);
		
		let sprite = new Sprite(spriteString, container);
		sprite.imageContainer.style.backgroundImage = "url('" + sprite.currentSprite.name + ".png')";

		sprite.setTarget({x: Math.random() * 800, y:0});
		SpriteHandler.allOwners[user] = {};
		SpriteHandler.allOwners[user].sprite = sprite;
		SpriteHandler.allOwners[user].container = container;
		spriteArray.push(sprite);
	}

	static changeSprite(user, spriteString) {
		let container = SpriteHandler.allOwners[user].container;

		let sprite = new Sprite(spriteString, container);
		sprite.imageContainer.style.backgroundImage = "url('" + sprite.currentSprite.name + ".png')";

		SpriteHandler.allOwners[user].sprite = sprite;
	}

	static removeSprite(user) {
		SpriteHandler.allOwners[user].sprite;
	}
}

const FRAME_DURATION = 1000/60;
const getTime = typeof performance === 'function' ? performance.now : Date.now;

let lastUpdate = getTime();
let spriteArray = [];
let elapsedTime = 0;

function animate() {
	const now = getTime();

	const delta = (now - lastUpdate) / FRAME_DURATION;

	elapsedTime = elapsedTime + delta;

	if (spriteArray.length > 0 && elapsedTime > 10) {
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

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

document.addEventListener("DOMContentLoaded", function() {
	animate();
});
