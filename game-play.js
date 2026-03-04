document.addEventListener("DOMContentLoaded", function() {
    fetch('game-sets.json')
        .then(response => response.json())
        .then(data => displaySet(data))
        .catch(error => console.error('Error loading the sets:', error));
});

function displaySet(data) {
    const sets = data.sets;
    const arrowsPath = data.arrows;
    const currentSet = sets[Math.floor(Math.random() * sets.length)];
    const setContainer = document.getElementById("currentSet");

    setContainer.querySelector(".problem-icon").src = currentSet.icon;
    setContainer.querySelector(".problem-icon").alt = "Icon for " + currentSet.title;
    setContainer.querySelector(".problem-title").textContent = currentSet.title;

    const arrowsContainer = setContainer.querySelector(".arrows");
    arrowsContainer.innerHTML = ""; // Clear previous arrows
    currentSet.arrows.forEach(arrowKey => {
        const img = document.createElement("img");
        img.src = arrowsPath[arrowKey];
        img.alt = "Arrow";
        img.classList.add("arrow-icon");
        arrowsContainer.appendChild(img);
    });
}
