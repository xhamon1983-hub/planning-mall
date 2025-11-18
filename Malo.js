// SCRIPT PRINCIPAL – PLANNING GAMER

// Gestion des boutons de type de journée
const dayButtons = document.querySelectorAll("[data-daytype]");
const normalBlocks = document.querySelectorAll(".apres-ecole-normal");
const longueBlocks = document.querySelectorAll(".apres-ecole-longue");

// Gestion des citations (chargées via citations.js, fallback local au cas où)
const fallbackCitations = [
    { text: "Un héros se construit en gagnant un peu d’XP chaque jour, pas en farmant une seule fois.", source: "Coach du Sanctuaire" },
    { text: "Les légendes ne spamment pas les sorts : elles gèrent leur mana avec discipline.", source: "Grimoire du Paladin" },
    { text: "Chaque fois que tu ranges ton stuff, tu prépares la victoire de demain.", source: "Forgeron de la Citadelle" },
    { text: "Le vrai loot, c’est la confiance que tu gagnes en terminant tes quêtes IRL.", source: "Chroniques des Aventuriers" },
    { text: "Pour passer un boss, tu dois apprendre son pattern. Pour la vie aussi.", source: "Journal du Stratège" },
    { text: "Un clan avance plus loin que n’importe quel joueur solo.", source: "Ancien du Village" },
    { text: "Les buffs les plus puissants viennent d’un bon sommeil et d’un repas avec ton équipe.", source: "Alchimiste des Rêves" },
    { text: "Échouer, c’est juste découvrir ce qu’il manque à ton build.", source: "Guide du Speedrunner" },
    { text: "Chaque habitude est un point de compétence. Investis dans celles qui te rendent plus fort.", source: "Arbre des Talents" },
    { text: "La progression lente mais régulière dépasse toutes les strats éclairs.", source: "Manuel du Tank" }
];
const citations = Array.isArray(window.CITATIONS) && window.CITATIONS.length
    ? window.CITATIONS
    : fallbackCitations;
const citationText = document.getElementById("citation-text");
const citationSource = document.getElementById("citation-source");
const btnNewCitation = document.getElementById("btn-new-citation");

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
// 1bis. CITATIONS
// ----------------------------

let citationIndex = -1;

function renderCitation(index) {
    if (!citationText || !citations.length) return;
    const citation = citations[index] || citations[0];
    citationText.textContent = citation.text;
    if (citationSource) {
        citationSource.textContent = citation.source ? `— ${citation.source}` : "";
    }
}

function pickCitationIndex() {
    if (!citations.length) return -1;
    if (citations.length === 1) return 0;

    let next = Math.floor(Math.random() * citations.length);
    if (citations.length > 1) {
        // Évite de répéter la même citation deux fois de suite
        while (next === citationIndex) {
            next = Math.floor(Math.random() * citations.length);
        }
    }
    return next;
}

function loadInitialCitation() {
    if (!citationText) return;
    if (!citations.length) {
        citationText.textContent = "Pas de citation chargée pour le moment.";
        if (citationSource) citationSource.textContent = "";
        return;
    }

    const saved = parseInt(localStorage.getItem("planning-citation-index"), 10);
    if (!Number.isNaN(saved) && saved >= 0 && saved < citations.length) {
        citationIndex = saved;
    } else {
        citationIndex = pickCitationIndex();
    }
    if (citationIndex !== -1) {
        renderCitation(citationIndex);
        localStorage.setItem("planning-citation-index", String(citationIndex));
    }
}

loadInitialCitation();

if (btnNewCitation) {
    btnNewCitation.addEventListener("click", () => {
        const nextIndex = pickCitationIndex();
        if (nextIndex !== -1) {
            citationIndex = nextIndex;
            renderCitation(citationIndex);
            localStorage.setItem("planning-citation-index", String(citationIndex));
        }
    });
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
