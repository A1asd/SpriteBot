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
			"width": 32,
			"animations": {
				"idle": {
					"row": 1,
					"frames": 2
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
					"frames": 4
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
			return;
		}

		if (this.targetPosition.x > this.imageContainer.offsetLeft) {
			this.imageContainer.style.transform = "scaleX(-1)";
			this.imageContainer.style.left = (this.imageContainer.offsetLeft + 5) + "px";
		} else {
			this.imageContainer.style.transform = "";
			this.imageContainer.style.left = (this.imageContainer.offsetLeft - 5) + "px";
		}
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

	static addOwner(user, spriteString) {
		console.log(Sprite.dataset, user, spriteString);
		if (Sprite.dataset[spriteString] === undefined) return;

		if (SpriteHandler.allOwners[user] === undefined) {
			SpriteHandler.addNewSprite(spriteString);
		} else {
			SpriteHandler.changeSprite(user, spriteString);
		}

		//SpriteHandler.allOwners[user] = spriteString;
	}

	static addNewSprite(spriteString) {
		SpriteHandler.spriteCount++;
		let container = document.createElement("div");
		container.id = "imageContainer" + SpriteHandler.spriteCount;
		container.style.width = "32px";
		container.style.height = "64px";
		container.style.position = "absolute";
		container.style.bottom = "-64px";
		container.style.left = "400";

		document.body.appendChild(container);
		
		let sprite = new Sprite(spriteString, container);

		sprite.imageContainer.style.backgroundImage = "url('" + sprite.currentSprite.name + ".png')";

		sprite.setTarget({x: Math.random() * 800, y:0});
		spriteArray.push(sprite);
	}

	static changeSprite(user, spriteString) {
		console.log(SpriteHandler.allOwners[user]);
		let sprite = new Sprite(spriteString, SpriteHandler.allOwners[user].imageContainer);
		//SpriteHandler.allOwners[user] = sprite;
		
		sprite.imageContainer.style.backgroundImage = "url('" + sprite.currentSprite.name + ".png')";
	}
}

function animateContainer() {
	sprite.setAnimation("cheer");
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

document.addEventListener("DOMContentLoaded", function() {
	animate();
});
