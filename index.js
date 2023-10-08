console.log(window);

/** keys:
 * - walk -> w
 * - run -> r
 * - shoot -> space bar
 */
const bots = {
	yurei: {
		idle: "./sprites/yurei/yurei-idle.gif",
		walk: "./sprites/yurei/yurei-walk.gif",
		run: "./sprites/yurei/yurei-run.gif",
		dead: "./sprites/yurei/yurei-dead.gif",
	},
	gotoku: {
		idle: "./sprites/yurei/yurei-idle.gif",
		walk: "./sprites/gotoku/gotoku-walk.gif",
		run: "./sprites/yurei/yurei-run.gif",
		dead: "./sprites/yurei/yurei-dead.gif",
	},
};

const amountBots = 10;
const raceWidth = window.innerWidth * 0.9;
const raceHeight = (raceWidth / 3) * 2;
const spriteHeight = 128;
const raceSpace$$ = getElement(".race-space");
const playerId = amountBots + 1;
let bullets = 1;
let playerPosition = 0;

const randomPositionSprite = (botId, botElement, isPlayer = false) => {
	const randomXPosition = `${randomNumber(0, 40)}px`;
	const randomYPosition = `${randomNumber(0, raceHeight - spriteHeight / 2)}px`;
	botElement.id = `${botId}`;
	botElement.style.left = randomXPosition;
	botElement.style.top = randomYPosition;
	if (isPlayer) playerPosition = randomXPosition;
};

const addBot = () => {
	const bot$$ = document.createElement("img");
	bot$$.className = "bot";
	bot$$.src = "./sprites/yurei/yurei-walk.gif";
	setTimeout(() => {
		raceSpace$$.appendChild(bot$$);
	}, randomNumber(0, 500));

	return bot$$;
};

const addPlayerSprit = () => {
	const playerSprite$$ = addBot();
	randomPositionSprite(playerId, playerSprite$$);
	playerSprite$$.classList.add("player");

	return playerSprite$$;
};

const setSpriteMode = (element$$, newModel) => {
	element$$.src = newModel;
};

const dead = (element$$) => {
	setSpriteMode(element$$, bots.yurei.dead);
	setTimeout(() => {
		element$$.remove();
	}, 800);
};

window.addEventListener("keypress", (evt) => {
	// console.log();
	if (evt.key === "w") {
		player$$.style.left = `${playerPosition + 2}px`;
		playerPosition += 2;
	}
	if (evt.key === "r") {
		player$$.style.left = `${playerPosition + 4}px`;
		playerPosition += 4;
	}
});

window.addEventListener("click", (evt) => {
	console.log(evt);
	if (bullets === 0) return;
	if (evt.target.className.includes("bot")) {
		const spriteId = evt.target.id;
		const sprite$$ = document.getElementById(spriteId);
		dead(sprite$$);
	}
	bullets--;
	console.log(bullets);
});

//*---------GAME----------------------------------------
for (let index = 0; index < amountBots; index++) {
	const botId = index + 1;
	const sprite$$ = addBot();
	randomPositionSprite(botId, sprite$$);
}
const player$$ = addPlayerSprit();
