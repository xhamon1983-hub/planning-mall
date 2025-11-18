// SCRIPT PRINCIPAL – PLANNING GAMER

// Gestion des boutons de type de journée
const dayButtons = document.querySelectorAll("[data-daytype]");
const normalBlocks = document.querySelectorAll(".apres-ecole-normal");
const longueBlocks = document.querySelectorAll(".apres-ecole-longue");

// Gestion des citations (chargées via citations.js, fallback local au cas où)
const fallbackCitations = [
     {
    text: "Chaque journée bien gérée, c’est un point de parangon en plus.",
    source: "Tyrael, veilleur du Sanctuaire"
  },
  {
    text: "Un vrai nephalem fait ses quêtes IRL avant de farmer le loot.",
    source: "Deckard Cain, vieux sage de Tristram"
  },
  {
    text: "Tu n’as pas besoin d’être parfait, juste d’être un peu meilleur qu’hier.",
    source: "Un moine d’Ivgorod"
  },
  {
    text: "Les devoirs, c’est l’entraînement. Les contrôles, c’est le boss de fin.",
    source: "Capitaine des Croisés de l’Ouestmarche"
  },
  {
    text: "Plus tu ranges ton inventaire, moins tu perds de temps à chercher ton stuff.",
    source: "Forgeron de la Nouvelle-Tristram"
  },
  {
    text: "Les dents propres, c’est comme une bonne armure : tu regrettes seulement quand tu n’en as pas.",
    source: "Apothicaire de Caldeum"
  },
  {
    text: "Ton cerveau est ta meilleure arme légendaire, prends-en soin.",
    source: "Archiviste du Sanctuaire"
  },
  {
    text: "Un héros fatigué ne fait pas de critique. Dormir, c’est aussi progresser.",
    source: "Tyrael, gardien des veilles"
  },
  {
    text: "Les petites quêtes du quotidien donnent les plus gros bonus cachés.",
    source: "Journal d’un jeune nephalem"
  },
  {
    text: "Respecter le clan, c’est le vrai mode coop.",
    source: "Chef barbare des Steppes du Nord"
  },
  {
    text: "Chaque révision, c’est un point d’XP de plus, même si tu ne le vois pas tout de suite.",
    source: "Scribe de la Bibliothèque oubliée"
  },
  {
    text: "Tu ne peux pas contrôler les monstres, mais tu peux contrôler tes réactions.",
    source: "Moine d’Ivgorod"
  },
  {
    text: "Moins tu râles, plus tu gagnes de temps de jeu.",
    source: "Sorcière de Caldeum"
  },
  {
    text: "Les responsabilités, c’est comme les donjons : plus tu en fais, plus tu deviens fort.",
    source: "Capitaine des Gardes-Cités"
  },
  {
    text: "Un vrai joueur ne ragequit pas ses devoirs.",
    source: "Commandant des Croisés"
  },
  {
    text: "Tu n’es pas en retard, tu fais juste un run de rattrapage d’XP.",
    source: "Chroniqueur horadrim"
  },
  {
    text: "Les héros aussi ont la flemme. La différence, c’est qu’ils avancent quand même.",
    source: "Tyrael, confident des mortels"
  },
  {
    text: "Quand tu aides à la maison, tu buffes tout ton clan.",
    source: "Matriarche barbare"
  },
  {
    text: "La chambre rangée, c’est comme un inventaire trié : tu vois mieux tes trésors.",
    source: "Forgeron de la Couronne brisée"
  },
  {
    text: "Chaque fois que tu t’appliques, tu montes une compétence passive.",
    source: "Maître enchanteur de Caldeum"
  },
  {
    text: "Ton futur toi te dira merci pour les efforts d’aujourd’hui.",
    source: "Archiviste du Futur probable"
  },
  {
    text: "Plus tu es organisé, plus tu peux profiter du reste tranquille.",
    source: "Stratège des Nephalems"
  },
  {
    text: "Le bus, c’est le portail vers la journée. Ne rate pas le portail.",
    source: "Mage des Portails"
  },
  {
    text: "Une quête à la fois. Tu ne peux pas battre tous les boss en même temps.",
    source: "Deckard Cain, patient comme toujours"
  },
  {
    text: "Les erreurs, c’est juste de l’XP bonus si tu apprends quelque chose.",
    source: "Maître d’armes du Bastion"
  },
  {
    text: "Rester poli quand tu es énervé, c’est du vrai mode hardcore.",
    source: "Moine d’Ivgorod"
  },
  {
    text: "Tu es le seul à pouvoir jouer ton perso dans la vie réelle.",
    source: "Tyrael, témoin des choix"
  },
  {
    text: "Accepter une règle, c’est comme accepter une quête : tu gagnes quelque chose à la fin.",
    source: "Capitaine du Guet de Tristram"
  },
  {
    text: "Tu vaux plus qu’un simple score de notes.",
    source: "Archiviste des Âmes mortelles"
  },
  {
    text: "Prendre soin de toi, c’est le meilleur buff long terme.",
    source: "Soigneuse du Sanctuaire"
  },
  {
    text: "Les grands pouvoirs viennent avec… les brossages de dents.",
    source: "Sorcier du Conclave"
  },
  {
    text: "Même les légendaires ont commencé niveau 1.",
    source: "Barbare vétéran"
  },
  {
    text: "Quand tu écoutes vraiment, tu lootes des infos que les autres ratent.",
    source: "Espion de Westmarch"
  },
  {
    text: "Faire un effort quand personne ne regarde, c’est ça être légendaire.",
    source: "Voix de la Lumière"
  },
  {
    text: "Tu n’es pas tout seul dans cette partie, ton clan est derrière toi.",
    source: "Mère du Campement caché"
  },
  {
    text: "Parler de ce que tu ressens, c’est comme ouvrir ton inventaire pour réparer.",
    source: "Guérisseur d’Ivgorod"
  },
  {
    text: "Les jours difficiles, c’est comme les donjons chiants : tu es fier quand c’est fini.",
    source: "Chasseur de démons des Marches"
  },
  {
    text: "Tu peux toujours recommencer un run, pas une journée.",
    source: "Chroniqueur du Temps fragmenté"
  },
  {
    text: "Même 1% d’effort en plus finit par faire une grosse différence.",
    source: "Mathémagicien de Caldeum"
  },
  {
    text: "Un héros ne se définit pas par ses chutes, mais par sa manière de se relever.",
    source: "Tyrael, témoin des combats"
  },
  {
    text: "Les révisions ne donnent pas de loot immédiat, mais elles débloquent des légendaires à long terme.",
    source: "Sage horadrim"
  },
  {
    text: "Chaque “oui” rapide te rend plus fort que dix “j’arrive…” sans action.",
    source: "Général de l’Ouestmarche"
  },
  {
    text: "La discipline, c’est un buff que les boss ne peuvent pas te retirer.",
    source: "Maître de guerre du Bastion"
  },
  {
    text: "Gérer ton temps, c’est comme gérer tes cooldowns.",
    source: "Sorcier du Temps plié"
  },
  {
    text: "Même les barbares rangent leur équipement avant la bataille.",
    source: "Chef barbare amusé"
  },
  {
    text: "Un clan soudé vaut plus qu’un stuff parfait.",
    source: "Ancien de la Tribu"
  },
  {
    text: "Une journée où tu apprends quelque chose n’est jamais perdue.",
    source: "Maître érudit"
  },
  {
    text: "La patience, c’est la compétence passive la plus rare.",
    source: "Moine contemplatif"
  },
  {
    text: "Tu n’es pas obligé d’aimer une tâche pour la réussir.",
    source: "Commandant des Croisés"
  },
  {
    text: "Le courage, c’est avancer même quand tu n’en as pas envie.",
    source: "Tyrael, gardien des choix difficiles"
  },
  {
    text: "Moins de chaos IRL = plus de chaos en jeu.",
    source: "Démon repenti"
  },
  {
    text: "Chaque minute gagnée IRL, c’est une minute de plus pour tes passions.",
    source: "Marchand du Temps volé"
  },
  {
    text: "Ton calme est un buff qui se recharge en respirant.",
    source: "Moine des vents paisibles"
  },
  {
    text: "Parler au lieu de crier est un sort de soutien très puissant.",
    source: "Archimage de la Voix claire"
  },
  {
    text: "Les héros savent demander de l’aide.",
    source: "Tyrael, protecteur des vulnérables"
  },
  {
    text: "Chaque choix augmente ou baisse tes stats : choisis bien.",
    source: "Enchanteuse de Caldeum"
  },
  {
    text: "Être gentil est un coup critique sur le cœur des autres.",
    source: "Barde itinérant"
  },
  {
    text: "Les grands héros se construisent dans les petites routines.",
    source: "Historien du Sanctuaire"
  },
  {
    text: "Quand tu prends soin de toi, tu montes ta stat de survie long terme.",
    source: "Médecin de campagne"
  },
  {
    text: "Faire un effort maintenant évite un boss plus dur plus tard.",
    source: "Stratège nephalem"
  },
  {
    text: "La vraie force vient d’un petit apprentissage chaque jour.",
    source: "Archiviste horadrim"
  },
  {
    text: "Ton avenir est ta meilleure monture : garde-la en bon état.",
    source: "Maître des coursiers célestes"
  },
  {
    text: "La colère baisse ton DPS de décision.",
    source: "Moine de la maîtrise de soi"
  },
  {
    text: "La maîtrise vient en répétant, pas en espérant.",
    source: "Maître d’armes"
  },
  {
    text: "Une bonne nuit de sommeil bat n’importe quel buff temporaire.",
    source: "Guérisseuse des Songes"
  },
  {
    text: "Même un mage doit ranger ses grimoires.",
    source: "Bibliothécaire grincheux"
  },
  {
    text: "Réviser 15 minutes vaut mieux qu’une heure stressée.",
    source: "Professeur calme"
  },
  {
    text: "Chaque matin est un nouveau spawn.",
    source: "Chroniqueur des cycles"
  },
  {
    text: "Les héros procrastinent aussi… mais pas trop longtemps.",
    source: "Tyrael, observateur amusé"
  },
  {
    text: "Ton clan te soutient : tu n’es jamais vraiment AFK.",
    source: "Matriarche du campement"
  },
  {
    text: "L’hygiène est ton enchantement permanent.",
    source: "Alchimiste prudent"
  },
  {
    text: "La discipline bat le talent quand le talent ne se discipline pas.",
    source: "Maître d’armes intransigeant"
  },
  {
    text: "Les petites victoires construisent les grandes sagas.",
    source: "Barde conteur"
  },
  {
    text: "Tu n’as rien à prouver, juste à progresser.",
    source: "Sage solitaire"
  },
  {
    text: "Chaque jour où tu fais de ton mieux est une journée gagnée.",
    source: "Tyrael, témoin de tes efforts"
  },
  {
    text: "La magie ne remplace pas le travail bien fait.",
    source: "Archimage de la Tour d’ivoire"
  },
  {
    text: "Tu es ton meilleur build : optimise-toi avec douceur.",
    source: "Théoricien nephalem"
  },
  {
    text: "Les bonnes habitudes sont des buffs cumulables.",
    source: "Enchanteuse des routines"
  },
  {
    text: "Même les anges prennent des pauses.",
    source: "Tyrael, légèrement souriant"
  },
  {
    text: "Ton attitude détermine la puissance de ta journée.",
    source: "Moine de la voie intérieure"
  },
  {
    text: "Tu peux être fatigué, mais pas déconnecté de toi-même.",
    source: "Guérisseuse des esprits"
  },
  {
    text: "Faire le bon choix est presque toujours un coup critique.",
    source: "Oracle des chemins"
  },
  {
    text: "La bienveillance est une aura qui booste tout le clan.",
    source: "Paladin de Lumière"
  },
  {
    text: "Le respect ouvre plus de portes que n’importe quel sort.",
    source: "Ambassadeur d’Ouestmarche"
  },
  {
    text: "Mieux vaut un petit pas que pas de pas du tout.",
    source: "Marcheur des plaines éternelles"
  },
  {
    text: "Ton histoire commence tout juste : écris-la en légendaire.",
    source: "Barde prophétique"
  },
  {
    text: "Chaque tâche terminée est un monstre en moins dans ton donjon.",
    source: "Chasseur de démons fatigué"
  },
  {
    text: "Le vrai loot, c’est la paix dans ton esprit.",
    source: "Moine des jardins cachés"
  },
  {
    text: "Tu n’es jamais trop jeune pour être un héros.",
    source: "Tyrael, protecteur des jeunes"
  },
  {
    text: "Un bon humain sera toujours plus fort qu’un bon joueur.",
    source: "Ancien du Conseil"
  },
  {
    text: "Tu peux devenir la meilleure version de toi-même, un jour à la fois.",
    source: "Archiviste des futurs possibles"
  }
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
