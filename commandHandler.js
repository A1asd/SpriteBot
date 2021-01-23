const twitchTvHandle = "amoistbeard";

ComfyJS.Init(twitchTvHandle);
ComfyJS.onCommand = (user, command, message, flags, extra) => {
	console.log(`!${command} was typed in chat`);

	if (command == "cheer") {
		user.sprite.setAnimation("cheer");
	}
}