class Sprite {
	currentFrame;
	imageContainer;
	animation;
	spriteData;
	currentIteration = 0;
	targetPosition = null;

	constructor(spriteString) {
		this.currentFrame = 0;
		this.spriteData = spriteData[spriteString];
		this.setAnimation("idle");
	}

	createImageContainer(idString) {
		let container = document.createElement("div");
		container.id = "imageContainer" + idString;
		container.style.position = "absolute";
		container.style.left = Math.random() * 400;
		//container.style.color = getRandomColor();

		return container;
	}

	setImageContainer(container) {
		this.imageContainer = container
		this.imageContainer.style.backgroundImage = "url('res/Sprites/" + this.spriteData.name + ".png')";
		this.imageContainer.style.width = this.spriteData.width;
		this.imageContainer.style.height = this.spriteData.height;
		this.imageContainer.style.bottom = "-" + this.spriteData.height;
	}

	setAnimation(animationString) {
		this.animation = this.spriteData.animations[animationString];
		this.resetAnimation();
	}

	resetAnimation() {
		this.currentIteration = 0;
		this.currentFrame = 0;
	}

	isBusy() {
		if (this.animation == this.spriteData.animations["idle"]) {
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
		if (this.currentIteration > this.animation.loops) {
			this.setAnimation('idle');
			return;
		}
		this.currentFrame++;
		if (this.animation.frames <= this.currentFrame) {
			this.currentFrame = 0;
			if (this.animation.loops !== 0) {
				this.currentIteration++;
			}
		}
	}

	move(delta) {
		if (this.isBusy()) {
			return;
		}
		if (this.targetPosition === null) {
			this.setTarget({x: Math.random() * 800, y:0});
			return;
		}

		let step = Math.min(Math.abs(this.targetPosition.x - this.imageContainer.offsetLeft - delta) / 15, 1);

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
		let x = -(this.spriteData.width * this.currentFrame);
		let y = -(this.spriteData.height * (this.animation.row - 1));

		if (this.animation.hasOwnProperty('keyframes') !== false) {	
			if (this.animation.keyframes.hasOwnProperty(this.currentFrame) !== false) {
				this.imageContainer.style.bottom = this.animation.keyframes[this.currentFrame].bottom;
			} else {
				this.imageContainer.style.bottom = "-" + this.spriteData.height;
			}
		}

		this.imageContainer.style.backgroundPositionX = x + "px";
		this.imageContainer.style.backgroundPositionY = y + "px";
	}
}
