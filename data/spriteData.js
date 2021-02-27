const spriteData = {
	"HollowKnight" : {
		"name": "HollowKnight",
		"height": 64,
		"width": 48,
		"animations": {
			"idle": {
				"row": 1,
				"frames": 4,
				"loops": 0,
			},
			"cheer": {
				"row": 2,
				"frames": 2,
				"loops": 12,
				"keyframes": {
					1: { bottom: "-62px" },
				},
			},
			"sit": {
				"row": 3,
				"frames": 7,
				"loops": 1,
				"persist": true,
			},
		},
	},
	"MushroomMan" : {
		"name": "MushroomMan",
		"height": 64,
		"width": 32,
		"animations": {
			"idle": {
				"row": 1,
				"frames": 4,
				"loops": 0,
			},
			"cheer": {
				"row": 2,
				"frames": 4,
				"loops": 1,
			},
		},
	},
};