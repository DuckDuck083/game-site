/* ================================================================
   CONTENT CONTROL
   Add games, projects, and updates here. Copy an object, then change
   its title, description, image class/URL, status, and link.
   ================================================================ */

const defaultGames = [
  {
    title: "PrototypeFPS",
    description: "A fast tactical combat sandbox made in Unity, built around responsive weapons, compact maps, and rapid iteration.",
    status: "Playable now",
    category: "playable",
    platform: "Windows · Free",
    imageClass: "one", // IMAGE: replace this with imageUrl: "images/your-game.jpg"
    link: "https://drive.google.com/file/d/1XfSDtv_Veiazsivb_hjUuXNXB-1cepGR/view?usp=drive_link"
  },
  {
    title: "Bounty Hunter",
    description: "Track your targets, collect the bounty, and survive the hunt in this browser-based action game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "two",
    link: "https://duckduck083.github.io/Hunter/"
  },
  {
    title: "Zombie Shooter",
    description: "Fight through waves of the undead and survive for as long as you can in this browser shooter.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "three",
    link: "https://duckduck083.github.io/Zombie/"
  },
  {
    title: "Mafia",
    description: "Enter a dangerous criminal underworld in this browser-based Mafia game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "one",
    link: "https://duckduck083.github.io/Mafia/"
  },
  {
    title: "Fort",
    description: "Build your defenses and hold the line in this playable browser game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "two",
    link: "https://duckduck083.github.io/Fort/"
  },
  {
    title: "Tower Defense",
    description: "Place your defenses, stop incoming waves, and protect your position in this browser strategy game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "three",
    link: "https://duckduck083.github.io/sniper/"
  },
  {
    title: "Platformer",
    description: "Jump through the levels in this straightforward browser platformer.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "one",
    link: "https://duckduck083.github.io/Platformer/"
  },
  {
    title: "Garden",
    description: "Grow and tend your own virtual garden in this relaxing browser game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "two",
    link: "https://duckduck083.github.io/Garden/"
  },
  {
    title: "Fishing",
    description: "Cast your line, catch fish, and enjoy a laid-back fishing trip from your browser.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "three",
    link: "https://duckduck083.github.io/Fisch/"
  },
  {
    title: "Blacksmith",
    description: "Work the forge and master the craft in this browser-based blacksmith game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "one",
    link: "https://duckduck083.github.io/Blacksmith/"
  },
  {
    title: "Chess",
    description: "Plan your moves and challenge the board in this playable browser chess game.",
    status: "Play now",
    category: "playable",
    platform: "Browser · Free",
    imageClass: "two",
    link: "https://duckduck083.github.io/Chess/"
  }
];

const storageKey = "duckduck083-games-v1";
let games;
try {
  const savedGames = JSON.parse(localStorage.getItem(storageKey));
  games = Array.isArray(savedGames) ? savedGames : structuredClone(defaultGames);
} catch {
  games = structuredClone(defaultGames);
}

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
})[character]);

const safeLink = (value = "") => {
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
};

const updates = [
  { date: "July 18, 2026", title: "PrototypeFPS build 0.7.2", text: "Improved recoil feedback, enemy pathfinding, and performance across Sector 04." },
  { date: "July 02, 2026", title: "New project enters pre-production", text: "Early worldbuilding and system tests are underway for an unannounced project." },
  { date: "June 14, 2026", title: "Studio site online", text: "The new command center is live. Future builds and development notes will land here." }
];

const gameGrid = document.querySelector("#game-grid");
let renderGames;
if (gameGrid) {
  renderGames = (filter = "all") => {
    gameGrid.innerHTML = games.map((game) => {
      const imageStyle = game.imageUrl ? `style="background-image:url('${escapeHtml(game.imageUrl)}')"` : "";
      const hidden = filter !== "all" && game.category !== filter ? " hidden" : "";
      const statusClass = game.category === "playable" ? " live" : "";
      const link = safeLink(game.link);
      const instructionsButton = game.title.toLowerCase() === "prototypefps"
        ? '<button class="text-link instructions-trigger" type="button">Instructions <span>?</span></button>'
        : "";
      return `<article class="game-card reveal visible${hidden}" data-category="${game.category}">
        <div class="game-image ${escapeHtml(game.imageClass || "")}" ${imageStyle} role="img" aria-label="${escapeHtml(game.title)} artwork"></div>
        <div class="game-card-body">
          <div class="game-card-head"><span class="status${statusClass}">${escapeHtml(game.status)}</span><span class="platform">${escapeHtml(game.platform)}</span></div>
          <h2>${escapeHtml(game.title)}</h2><p>${escapeHtml(game.description)}</p>
          <div class="card-actions"><a class="text-link" href="${link}"${link !== "#" ? ' target="_blank" rel="noopener noreferrer"' : ""}>${game.category === "playable" ? "Play / download" : "View game"} <span>→</span></a>${instructionsButton}</div>
        </div></article>`;
    }).join("");
  };
  renderGames();
  document.querySelectorAll("#game-filters button").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("#game-filters button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderGames(button.dataset.filter);
  }));
}

document.body.insertAdjacentHTML("beforeend", `
  <dialog class="instructions-modal" aria-labelledby="instructions-title">
    <button class="modal-close" type="button" aria-label="Close instructions">&times;</button>
    <p class="eyebrow"><span></span> Mission briefing</p>
    <h2 id="instructions-title">How to Play PrototypeFPS</h2>
    <ol>
      <li>Go to <a href="https://duckduck083.games" target="_blank" rel="noopener noreferrer">duckduck083.games</a>.</li>
      <li>Click <strong>Download PrototypeFPS</strong>.</li>
      <li>Wait for the ZIP file to finish downloading.</li>
      <li>Right-click the ZIP file and choose <strong>Extract All...</strong></li>
      <li>Open the extracted folder.</li>
      <li>Double-click <strong>PrototypeFPS.exe</strong> to launch the game.</li>
    </ol>
    <h3>If Windows shows a security warning</h3>
    <ol><li>Click <strong>More info</strong>.</li><li>Click <strong>Run anyway</strong>.</li></ol>
    <p class="modal-note">Windows sometimes does this for games made by independent developers.</p>
    <h3>Notes</h3>
    <ul>
      <li>Don't run the game directly from inside the ZIP file—extract it first.</li>
      <li>Keep the .exe and the PrototypeFPS_Data folder together in the same folder.</li>
      <li>If you find any bugs or have suggestions, let me know!</li>
    </ul>
  </dialog>`);
const instructionsModal = document.querySelector(".instructions-modal");
document.addEventListener("click", (event) => {
  if (event.target.closest(".instructions-trigger")) instructionsModal.showModal();
  if (event.target.closest(".modal-close") || event.target === instructionsModal) instructionsModal.close();
});

if (gameGrid) {
  document.body.insertAdjacentHTML("beforeend", `
    <dialog class="owner-editor" aria-labelledby="editor-title">
      <button class="modal-close editor-close" type="button" aria-label="Close editor">&times;</button>
      <p class="eyebrow"><span></span> Owner controls</p>
      <h2 id="editor-title">Game card editor</h2>
      <p class="editor-help">Changes are stored only in this browser. Press <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> to open this panel.</p>
      <div class="editor-list"></div>
      <div class="editor-toolbar">
        <button class="button secondary add-game" type="button">+ Add card</button>
        <button class="button primary save-games" type="button">Save changes</button>
        <button class="button secondary export-games" type="button">Export backup</button>
        <label class="button secondary import-games">Import backup<input type="file" accept="application/json" hidden></label>
      </div>
    </dialog>`);
  const editor = document.querySelector(".owner-editor");
  const editorList = editor.querySelector(".editor-list");
  const renderEditor = () => {
    editorList.innerHTML = games.map((game, index) => `
      <fieldset class="editor-card">
        <legend>Card ${index + 1}</legend>
        <label>Name<input name="title" value="${escapeHtml(game.title)}"></label>
        <label>Description<textarea name="description">${escapeHtml(game.description)}</textarea></label>
        <label>Link<input name="link" type="url" value="${escapeHtml(game.link)}"></label>
        <label>Status<input name="status" value="${escapeHtml(game.status)}"></label>
        <label>Platform<input name="platform" value="${escapeHtml(game.platform)}"></label>
        <label>Category<select name="category">${["playable", "development", "concept"].map((category) => `<option${game.category === category ? " selected" : ""}>${category}</option>`).join("")}</select></label>
        <label>Image URL (optional)<input name="imageUrl" type="url" value="${escapeHtml(game.imageUrl || "")}"></label>
        <button class="remove-game" type="button">Remove card</button>
      </fieldset>`).join("");
  };
  const readEditor = () => [...editorList.querySelectorAll(".editor-card")].map((card) =>
    Object.fromEntries([...card.querySelectorAll("input, textarea, select")].map((input) => [input.name, input.value.trim()]))
  );
  document.addEventListener("keydown", (event) => {
    if (event.altKey && event.shiftKey && event.key.toLowerCase() === "e") {
      renderEditor();
      editor.showModal();
    }
  });
  editor.addEventListener("click", (event) => {
    if (event.target.closest(".editor-close")) editor.close();
    if (event.target.closest(".remove-game")) event.target.closest(".editor-card").remove();
    if (event.target.closest(".add-game")) {
      games = readEditor();
      games.push({ title: "New Game", description: "Add a description.", link: "https://", status: "In development", platform: "TBA", category: "development", imageClass: "one" });
      renderEditor();
      editorList.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
    if (event.target.closest(".save-games")) {
      games = readEditor();
      localStorage.setItem(storageKey, JSON.stringify(games));
      renderGames(document.querySelector("#game-filters .active")?.dataset.filter || "all");
      editor.close();
    }
    if (event.target.closest(".export-games")) {
      const blob = new Blob([JSON.stringify(readEditor(), null, 2)], { type: "application/json" });
      const anchor = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "game-cards.json" });
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }
  });
  editor.querySelector('input[type="file"]').addEventListener("change", async (event) => {
    try {
      const imported = JSON.parse(await event.target.files[0].text());
      if (!Array.isArray(imported)) throw new Error();
      games = imported;
      renderEditor();
    } catch {
      alert("That backup file could not be read.");
    }
  });
}

const prototypeUpdates = document.querySelector("#prototype-updates");
if (prototypeUpdates) prototypeUpdates.innerHTML = updates.slice(0, 2).map((update) => `
  <article class="timeline-item reveal"><time>${update.date}</time><div><h3>${update.title}</h3><p>${update.text}</p></div></article>`).join("");

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll("[data-year]").forEach((el) => el.textContent = new Date().getFullYear());

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Placeholder download guard. Remove this listener after adding a real download URL.
document.querySelectorAll("[data-download]").forEach((button) => button.addEventListener("click", (event) => {
  if (button.getAttribute("href") === "#") {
    event.preventDefault();
    button.textContent = "ADD YOUR DOWNLOAD LINK";
    setTimeout(() => button.innerHTML = "Download for Windows <span>↓</span>", 1800);
  }
}));
