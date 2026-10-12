const upgrades = document.getElementById("upgradeMenu");
const main = document.getElementById("mainMenu");
const info = document.getElementById("infoMenu");


function createTowerTitle(tower) {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title");
    const icon = document.createElement("img")
    icon.src = tower.texture;
    titleContainer.append(icon);

    const title = document.createElement("h3");
    title.textContent = tower.name + " - L" + tower.level;
    titleContainer.append(title);
    return titleContainer;
}

// Takes a dummy tower
function insertTowerPurchase(tile, tower) {
    const upgradeContainer = document.createElement("section");
    upgradeContainer.classList.add("upgrade");
    upgradeContainer.append(createTowerTitle(tower));


    const textContainer = document.createElement("div");
    textContainer.classList.add("text");

    const moneyContainer = document.createElement("section");
    moneyContainer.classList.add("money");
    const goldIcon = document.createElement("img");
    goldIcon.src = "./texture/gold.png";
    moneyContainer.append(goldIcon);
    const cost = document.createElement("span");
    cost.textContent = tower.cost;
    moneyContainer.append(cost);
    textContainer.append(moneyContainer);

    const description = document.createElement("span");
    description.textContent = tower.description;
    textContainer.append(description);
    upgradeContainer.append(textContainer);

    if (game.player.canAfford(tower.cost)) {
        const buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        buyButton.addEventListener("click", () => {
            game.player.spend(tower.cost);
            const newTower = new tower.constructor(tile.x, tile.y);
            game.grid.replaceTile(newTower);
            insertTowerUpgrades(newTower);
        });
        upgradeContainer.append(buyButton);
    }

    upgrades.append(upgradeContainer);
}

function insertTowerPurchases(tile) {
    for (const tower of dummyTowers) {
        insertTowerPurchase(tile, tower);
    }
}

// Takes a real tower
function insertTowerUpgrades(tower) {
    upgrades.innerHTML = "";
    const upgradeContainer = document.createElement("section");
    upgradeContainer.classList.add("upgrade");
    upgradeContainer.append(createTowerTitle(tower));

    const description = document.createElement("span");
    description.textContent = tower.description;
    upgradeContainer.append(description);

    const upgradeCost = 50 * tower.level

    if (game.player.canAfford(upgradeCost)) {
        const upgradeButton = document.createElement("button");
        upgradeButton.textContent = "Upgrade: " + upgradeCost + " Gold";
        upgradeButton.addEventListener("click", () => {
            game.player.spend(upgradeCost);
            tower.upgrade();
            insertTowerUpgrades(tower);
        });
        upgradeContainer.append(upgradeButton);
    }

    upgrades.append(upgradeContainer);
}

function insertContinueButton(buttonText="Continue") {
    const continueButton = document.createElement("button");
    continueButton.classList.add("continue");
    continueButton.textContent = buttonText;
    continueButton.addEventListener("click", () => {
        game.startRound().then(() => insertContinueButton());
        continueButton.remove();
    });

    main.append(continueButton);
}

function resetTowerMenu() {
    const clickedTile = document.querySelector(".tile.clicked");
    if (clickedTile) clickedTile.click();
}

function clearUpgrades() {
    upgrades.innerHTML = "";
}

function updateInfo() {
    info.innerHTML = "";
    const health = document.createElement("p");
    health.textContent = "Health: " + game.player.health;
    const gold = document.createElement("p");
    gold.textContent = "Gold: " + game.player.gold;
    const round = document.createElement("p");
    console.log(game.currentRound);
    round.textContent = "Round: " + (game.currentRound) + "/" + game.rounds.length;

    info.append(health);
    info.append(round);
    info.append(gold);
}