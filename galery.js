const galery = document.getElementById('galery');

for (let sprite in spriteData) {
	
}

function createSprite() {
	let container = document.createElement('div');
	
	let sprite = new Sprite(spriteString, container);
	sprite.imageContainer.style.backgroundImage = "url('res/Sprites/" + sprite.spriteData.name + ".png')";
	sprite.imageContainer.style.width = sprite.spriteData.width;
	sprite.imageContainer.style.height = sprite.spriteData.height;

	console.log(sprite);

	container.appendChild(sprite.imageContainer)
}