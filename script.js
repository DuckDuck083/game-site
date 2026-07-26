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
    link: "prototypefps.html" // DOWNLOAD/PAGE LINK: put your game URL here
  },
  {
    title: "Ashfall Protocol",
    description: "A tense survival strategy concept about holding a remote outpost through one impossible winter.",
    status: "In development",
    category: "development",
    platform: "PC · Coming soon",
    imageClass: "two",
    link: "#"
  },
  {
    title: "Signal Lost",
    description: "A short atmospheric exploration experiment set aboard a station that should have stayed silent.",
    status: "Concept",
    category: "concept",
    platform: "Browser · Prototype",
    imageClass: "three",
    link: "#"
  }
];

const projects = [
  { type: "Web experiment", title: "Mission Control", description: "A compact sci-fi dashboard concept for tracking builds, tasks, and launch milestones.", link: "#" },
  { type: "Game jam", title: "Last Light", description: "A 48-hour top-down survival game where every shot drains the only light you have.", link: "#" },
  { type: "Developer tool", title: "Loadout Lab", description: "A browser-based tool for quickly balancing weapons and exporting clean JSON data.", link: "#" },
  { type: "Archive", title: "Early Experiments", description: "Small mechanics, shaders, prototypes, and lessons collected from the workshop.", link: "#" }
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
          <div class="card-actions"><a class="text-link" href="${game.link}">View game <span>→</span></a></div>
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

const projectList = document.querySelector("#project-list");
if (projectList) projectList.innerHTML = projects.map((project, index) => `
  <a class="project-card reveal" href="${project.link}">
    <span class="project-num">0${index + 1}</span>
    <h2><span>${project.type}</span>${project.title}</h2>
    <p>${project.description}</p><span class="arrow">↗</span>
  </a>`).join("");

const homeUpdates = document.querySelector("#home-updates");
if (homeUpdates) homeUpdates.innerHTML = updates.map((update, index) => `
  <article class="update-card reveal"><span class="number">LOG // 0${index + 1}</span>
  <time>${update.date}</time><h3>${update.title}</h3><p>${update.text}</p></article>`).join("");

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
