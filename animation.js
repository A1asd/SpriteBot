class Sprite {
	currentFrame;
	imageContainer;
	currentAnimation;
	dataset = {
		"name": "HollowKnight",
		"height": 64,
		"width": 32,
		"animations": {
			"idle": {
				"row": 1,
				"frames": 2
			}
		}
	};

	constructor(spriteString) {
		this.currentFrame = 0;
		this.setAnimation("idle");
	}

	setAnimation(animationString) {
		this.currentAnimation = this.dataset.animations[animationString];
		this.currentFrame = 0;
	}

	incrementFrame() {
		this.currentFrame++;
		if (this.currentAnimation.frames <= this.currentFrame) {
			this.currentFrame = 0;
		}
	}

	move(position) {
		if (position.x > this.imageContainer.offsetLeft) {
			this.imageContainer.style.transform = "scaleX(-1)";
			this.imageContainer.style.left = (this.imageContainer.offsetLeft + 5) + "px";
		} else {
			this.imageContainer.style.transform = "";
		}
		position.x;
		position.y;
	}
	
	update() {
		let x = this.dataset.width * this.currentFrame;
		let y = this.dataset.height * (this.currentAnimation.row - 1);

		this.imageContainer.style.backgroundPositionX = x + "px";
		this.imageContainer.style.backgroundPositionY = y + "px";
	}

	attach(container) {
		this.imageContainer = container;
		this.imageContainer.style.backgroundImage = "url('" + this.dataset.name + ".png')";
	}
}

class SpriteHandler {
	static spriteCount = 0;
	static imageContainer;

	static addNewSprite(spriteString) {
		SpriteHandler.spriteCount++;
		let container = document.createElement("div");
		container.id = "imageContainer" + SpriteHandler.spriteCount;
		container.style.width = "32px";
		container.style.height = "64px";
		container.style.position = "absolute";
		container.style.bottom = "-64px";
		container.style.left = "0";

		document.body.appendChild(container);
		
		let sprite = new Sprite(spriteString);
		sprite.attach(container);
		spriteArray.push(sprite);
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
			sprite.move({x: 60, y:0});
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
