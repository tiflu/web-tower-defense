const upgrades = document.getElementById("upgradeMenu");
const info = document.getElementById("infoMenu");

function insertTowerPurchase(tower) {
    const upgradeContainer = document.createElement("section");
    const icon = document.createElement("img")
    icon.src = tower.texture;
    upgradeContainer.append(icon);

    const textContainer = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = tower.name;
    const description = document.createElement("span");
    description.textContent = tower.description;
    textContainer.append(title);
    textContainer.append(description);
    upgradeContainer.append(textContainer);
    upgrades.append(upgradeContainer);
}