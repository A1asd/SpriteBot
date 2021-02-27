class User {
	constructor(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	getSprite() {
		return this.sprite;
	}

	connectSprite(sprite) {
		this.sprite = sprite;
	}

	disconnectSprite() {
		this.sprite.destroy();
		delete this.sprite;
	}

	connectImageContainer(imageContainer) {
		this.imageContainer = imageContainer;
	}

	disconnectImageContainer() {
		delete this.imageContainer;
	}
}
