class SpriteHandler {
	static spriteCount = 0;
	static imageContainer;
	static userList = {};

	static spawnSprite(user, spriteString) {
		// Check if sprite exists
		if (spriteData[spriteString] === undefined) return;

		if (SpriteHandler.getUserById(user) === null) {
			SpriteHandler.addNewSprite(user, spriteString);
		}

		//SpriteHandler.allOwners[user] = spriteString;
	}

	static createImageContainer(user) {
		SpriteHandler.spriteCount++;
		let container = document.createElement("div");
		container.id = "imageContainer" + SpriteHandler.spriteCount;
		container.style.position = "absolute";
		container.style.left = Math.random() * 400;
		container.style.fontSize = "12px";
		//container.style.color = getRandomColor();

		let textNode = document.createTextNode(user)
		container.appendChild(textNode);

		return container;
	}

	static addNewSprite(userId, spriteString) {
		let container = SpriteHandler.createImageContainer(userId);
		document.body.appendChild(container);
		
		let sprite = new Sprite(spriteString, container);
		sprite.imageContainer.style.backgroundImage = "url('res/Sprites/" + sprite.spriteData.name + ".png')";
		sprite.imageContainer.style.width = sprite.spriteData.width;
		sprite.imageContainer.style.height = sprite.spriteData.height;
		sprite.imageContainer.style.bottom = "-" + sprite.spriteData.height;

		sprite.setTarget({x: Math.random() * 800, y:0});

		let user = new User(userId);
		user.connectSprite(sprite);
		user.connectImageContainer(container);
		SpriteHandler.addUserToList(userId, user);

		/*SpriteHandler.userList[user] = {};
		SpriteHandler.userList[user].sprite = sprite;
		SpriteHandler.userList[user].container = container;*/

		spriteArray.push(sprite);
	}

	static changeSprite(user, spriteString) {
		let container = SpriteHandler.userList[user].container;

		let sprite = new Sprite(spriteString, container);
		sprite.imageContainer.style.backgroundImage = "url('res/Sprites/" + sprite.spriteData.name + ".png')";

		SpriteHandler.userList[user].sprite = sprite;
	}

	static animateSprite(user, animationString) {
		SpriteHandler.getUserById(user).getSprite().setAnimation(animationString);
	}

	static removeSprite(user) {
		SpriteHandler.userList[user].sprite;
	}
	
	static getUserById(id) {
		if (SpriteHandler.userList.hasOwnProperty(id)) {
			return SpriteHandler.userList[id];
		}
		return null;
	}

	static addUserToList(id, userObject) {
		if (!SpriteHandler.userList.hasOwnProperty(id)) {
			SpriteHandler.userList[id] = userObject;
		}
	}

	static removerUserById(id) {
		delete SpriteHandler.userList[id];
	}
}
