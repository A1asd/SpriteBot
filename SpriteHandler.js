class SpriteHandler {
	static spriteCount = 0;
	static imageContainer;
	static allOwners = {};

	static spawnSprite(user, spriteString) {
		// Check if sprite exists
		if (Sprite.dataset[spriteString] === undefined) return;

		if (SpriteHandler.allOwners[user] === undefined) {
			SpriteHandler.addNewSprite(user, spriteString);
		}

		//SpriteHandler.allOwners[user] = spriteString;
	}

	static createImageContainer(user) {
		SpriteHandler.spriteCount++;
		let container = document.createElement("div");
		container.id = "imageContainer" + SpriteHandler.spriteCount;
		container.style.width = "48px";
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
		sprite.imageContainer.style.backgroundImage = "url('Sprites/" + sprite.currentSprite.name + ".png')";

		sprite.setTarget({x: Math.random() * 800, y:0});
		SpriteHandler.allOwners[user] = {};
		SpriteHandler.allOwners[user].sprite = sprite;
		SpriteHandler.allOwners[user].container = container;
		spriteArray.push(sprite);
	}

	static changeSprite(user, spriteString) {
		let container = SpriteHandler.allOwners[user].container;

		let sprite = new Sprite(spriteString, container);
		sprite.imageContainer.style.backgroundImage = "url('Sprites/" + sprite.currentSprite.name + ".png')";

		SpriteHandler.allOwners[user].sprite = sprite;
	}

	static animateSprite(user, animationString) {
		SpriteHandler.allOwners[user].sprite.setAnimation(animationString);
	}

	static removeSprite(user) {
		SpriteHandler.allOwners[user].sprite;
	}
}
