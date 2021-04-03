class User {
	id;
	sprite;
	imageContainer;

	constructor(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	getSprite() {
		return this.sprite;
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	disconnectSprite() {
		this.sprite.destroy();
		delete this.sprite;
	}

	setImageContainer(imageContainer) {
		this.imageContainer = imageContainer;
	}

	disconnectImageContainer() {
		delete this.imageContainer;
	}
}
