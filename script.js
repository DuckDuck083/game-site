/* ================================================================
   CONTENT CONTROL
   Add games, projects, and updates here. Copy an object, then change
   its title, description, image class/URL, status, and link.
   ================================================================ */

const games = [
  {
    title: "PrototypeFPS",
    description: "A fast tactical combat sandbox made in Unity, built around responsive weapons, compact maps, and rapid iteration.",
    status: "Playable now",
    category: "playable",
    platform: "Windows · Free",
    imageClass: "one", // IMAGE: replace this with imageUrl: "images/your-game.jpg"
    link: "https://drive.google.com/file/d/1vwGdQ09eUQ04viy-0xRtiZNRX-cLX0ho/view?usp=drive_link"
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

const updates = [
  { date: "July 18, 2026", title: "PrototypeFPS build 0.7.2", text: "Improved recoil feedback, enemy pathfinding, and performance across Sector 04." },
  { date: "July 02, 2026", title: "New project enters pre-production", text: "Early worldbuilding and system tests are underway for an unannounced project." },
  { date: "June 14, 2026", title: "Studio site online", text: "The new command center is live. Future builds and development notes will land here." }
];

const gameGrid = document.querySelector("#game-grid");
if (gameGrid) {
  const renderGames = (filter = "all") => {
    gameGrid.innerHTML = games.map((game) => {
      const imageStyle = game.imageUrl ? `style="background-image:url('${game.imageUrl}')"` : "";
      const hidden = filter !== "all" && game.category !== filter ? " hidden" : "";
      const statusClass = game.category === "playable" ? " live" : "";
      return `<article class="game-card reveal visible${hidden}" data-category="${game.category}">
        <div class="game-image ${game.imageClass || ""}" ${imageStyle} role="img" aria-label="${game.title} artwork"></div>
        <div class="game-card-body">
          <div class="game-card-head"><span class="status${statusClass}">${game.status}</span><span class="platform">${game.platform}</span></div>
          <h2>${game.title}</h2><p>${game.description}</p>
          <div class="card-actions"><a class="text-link" href="${game.link}"${game.link.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${game.category === "playable" ? "Play / download" : "View game"} <span>→</span></a></div>
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
