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
					"frames": 2,
					"loops": 7,
				},
				"sit": {
					"row": 3,
					"frames": 7,
					"loops": 1,
					"persist": true,
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

	isBusy() {
		if (this.currentAnimation == this.currentSprite.animations["idle"]) {
			return false;
		}
		return true;
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
		if (this.isBusy()) {
			return;
		}
		if (this.targetPosition === null) {
			this.setTarget({x: Math.random() * 800, y:0});
			return;
		}

		let step = Math.min(Math.abs(this.targetPosition.x - this.imageContainer.offsetLeft) / 17, 5);

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
		let x = -(this.currentSprite.width * this.currentFrame);
		let y = -(this.currentSprite.height * (this.currentAnimation.row - 1));

		this.imageContainer.style.backgroundPositionX = x + "px";
		this.imageContainer.style.backgroundPositionY = y + "px";
	}
}
