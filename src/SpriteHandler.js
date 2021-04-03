class SpriteHandler {
	static spriteCount = 0;
	static imageContainer;
	static userList = {};

	static spawnSprite(userId, spriteString) {
		// Check if sprite exists
		if (spriteData[spriteString] === undefined) return;

		if (SpriteHandler.getUserById(userId) === null) {
			let user = new User(userId);
			SpriteHandler.addNewSprite(user, spriteString);
		}

		//SpriteHandler.allOwners[user] = spriteString;
	}

	static addNewSprite(user, spriteString) {
		let sprite = new Sprite(spriteString);

		let userContainer = document.createElement("div");
		let textNode = document.createTextNode(user.getId())
		container.appendChild(textNode);
		userContainer.appendChild(textNode);

		let container = sprite.createImageContainer(SpriteHandler.spriteCount);

		userContainer.appendChild(container);
		document.body.appendChild(userContainer);
		
		sprite.setImageContainer(container);

		sprite.setTarget({x: Math.random() * 800, y:0});

		user.setSprite(sprite);
		user.setImageContainer(userContainer);

		SpriteHandler.spriteCount++;
		SpriteHandler.addUserToList(user.getId(), user);

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
