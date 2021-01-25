const twitchTvHandle = "amoistbeard";
const colorRegex = new RegExp("^\#[a-fA-F0-9]{6}$");

ComfyJS.Init(twitchTvHandle);

ComfyJS.onCommand = (user, command, message, flags, extra) => {
	if (command === "color") {
		if (colorRegex.test(message)) {
			SpriteHandler.changeTextColor(user, message);
		}
	}

	if (command === "create" || command === "spawn" || command === "respawn") {
		SpriteHandler.spawnSprite(user, message);
	}

	if (command === "cheer") {
		SpriteHandler[user].sprite.setAnimation("cheer");
	}

	if (command === "sit") {
		SpriteHandler[user].sprite.setAnimation("sit");
	}
};

ComfyJS.onPart = (user, self, extra) => {
	SpriteHandler.removeSprite(user);
};
