const twitchTvHandle = "amoistbeard";

ComfyJS.Init(twitchTvHandle);

ComfyJS.onCommand = (user, command, message, flags, extra) => {
	console.log(`!${command} was typed in chat`);

	if (command === "create") {
		SpriteHandler.addOwner(user, message);
	}

	if (command === "cheer") {
		SpriteHandler[user].sprite.setAnimation("cheer");
	}
}
