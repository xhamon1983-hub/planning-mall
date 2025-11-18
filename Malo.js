// SCRIPT PRINCIPAL – PLANNING GAMER

// Gestion des boutons de type de journée
const dayButtons = document.querySelectorAll("[data-daytype]");
const normalBlocks = document.querySelectorAll(".apres-ecole-normal");
const longueBlocks = document.querySelectorAll(".apres-ecole-longue");

// Gestion des tâches (checkbox)
const checkboxes = document.querySelectorAll("input[type='checkbox'][data-task-id]");

// Gestion du système de points
const pointsFill = document.getElementById("points-fill");
const pointsValue = document.getElementById("points-value");
const btnAddPoint = document.getElementById("btn-add-point");
const btnResetPoints = document.getElementById("btn-reset-points");

// ----------------------------
// 1. TOGGLE JOURNÉE NORMALE / LONGUE
// ----------------------------

dayButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-daytype");

        // Style visuel des boutons
        dayButtons.forEach((b) => b.classList.remove("btn-active"));
        btn.classList.add("btn-active");

        // Affichage des blocs selon le type de journée
        if (type === "normal") {
            normalBlocks.forEach((b) => b.classList.remove("hidden"));
            longueBlocks.forEach((b) => b.classList.add("hidden"));
        } else {
            normalBlocks.forEach((b) => b.classList.add("hidden"));
            longueBlocks.forEach((b) => b.classList.remove("hidden"));
        }

        // Sauvegarde du choix
        localStorage.setItem("planning-daytype", type);
    });
});

// Restaurer le type de journée choisi
const savedDayType = localStorage.getItem("planning-daytype");
if (savedDayType === "longue") {
    const longBtn = document.querySelector("[data-daytype='longue']");
    if (longBtn) longBtn.click();
} else {
    const normalBtn = document.querySelector("[data-daytype='normal']");
    if (normalBtn) normalBtn.click();
}

// ----------------------------
// 2. GESTION DES CHECKBOXES (TÂCHES)
// ----------------------------

function updateTaskVisual(checkbox) {
    const label = checkbox.closest("label");
    if (!label) return;

    if (checkbox.checked) {
        label.classList.add("task-done");
    } else {
        label.classList.remove("task-done");
    }
}

// Charger l’état des tâches depuis le localStorage
checkboxes.forEach((cb) => {
    const id = cb.getAttribute("data-task-id");
    const saved = localStorage.getItem("task-" + id);

    if (saved === "1") {
        cb.checked = true;
    } else {
        cb.checked = false;
    }

    updateTaskVisual(cb);

    cb.addEventListener("change", () => {
        localStorage.setItem("task-" + id, cb.checked ? "1" : "0");
        updateTaskVisual(cb);
    });
});

// ----------------------------
// 3. SYSTÈME DE POINTS
// ----------------------------

let points = 0;

// Charger les points
const savedPoints = localStorage.getItem("planning-points");
if (savedPoints !== null) {
    points = parseInt(savedPoints, 10) || 0;
}
updatePointsDisplay();

function updatePointsDisplay() {
    if (points < 0) points = 0;
    if (points > 10) points = 10;

    pointsValue.textContent = points.toString();
    const percent = (points / 10) * 100;
    pointsFill.style.width = percent + "%";
    localStorage.setItem("planning-points", points.toString());
}

// Bouton +1 point
if (btnAddPoint) {
    btnAddPoint.addEventListener("click", () => {
        points++;
        updatePointsDisplay();
    });
}

// Bouton reset
if (btnResetPoints) {
    btnResetPoints.addEventListener("click", () => {
        if (confirm("Réinitialiser les points ?")) {
            points = 0;
            updatePointsDisplay();
        }
    });
}