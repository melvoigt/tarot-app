(function () {
  const screens = {
    welcome: document.getElementById("screen-welcome"),
    theme: document.getElementById("screen-theme"),
    spread: document.getElementById("screen-spread"),
    reading: document.getElementById("screen-reading")
  };

  const state = {
    theme: null,
    spread: null
  };

  const soundToggle = document.getElementById("sound-toggle");
  function setSoundUI(on) {
    soundToggle.setAttribute("aria-pressed", on ? "true" : "false");
    soundToggle.title = on ? "Ambient sound: on" : "Ambient sound: off";
  }
  async function setSound(on) {
    setSoundUI(on);
    if (window.ambience) await window.ambience.setEnabled(on);
  }
  soundToggle.addEventListener("click", () => {
    setSound(!(window.ambience && window.ambience.enabled));
  });

  // ---- PWA: service worker + install prompt ----
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  let deferredInstall = null;
  const installBtn = document.getElementById("install-btn");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstall = e;
    installBtn.hidden = false;
  });
  installBtn.addEventListener("click", async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    installBtn.hidden = true;
  });
  window.addEventListener("appinstalled", () => {
    installBtn.hidden = true;
  });

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function drawCards(count) {
    const deck = [...MAJOR_ARCANA];
    const out = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * deck.length);
      out.push(deck.splice(idx, 1)[0]);
    }
    return out;
  }

  function renderReading() {
    const theme = THEME_META[state.theme];
    const count = state.spread;
    const cards = drawCards(count);

    document.getElementById("reading-title").textContent =
      `${theme.icon}  ${theme.label} Reading  ${theme.icon}`;
    document.getElementById("reading-context").textContent = theme.intro;

    const container = document.getElementById("cards");
    container.innerHTML = "";

    const positions = count === 3 ? POSITIONS_3 : [{ label: "Your Card", note: "a message for you" }];

    cards.forEach((card, i) => {
      const pos = positions[i];
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div class="card-position">
          ${pos.label}
          <span class="card-position-note">${pos.note}</span>
        </div>
        <div class="card-inner" role="button" tabindex="0" aria-label="Reveal ${pos.label} card">
          <div class="card-cover">
            <div class="card-cover-symbol">✦</div>
            <div class="card-cover-label">Tap to Reveal</div>
          </div>
          <div class="card-face">
            <div class="card-number">${romanNumeral(card.num)}</div>
            <div class="card-symbol">${card.symbol}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-keywords">${card.keywords.join(" · ")}</div>
          </div>
        </div>
        <div class="card-reading">${card.readings[state.theme]}</div>
      `;
      container.appendChild(el);

      const inner = el.querySelector(".card-inner");
      const flip = () => {
        const wasFlipped = el.classList.contains("flipped");
        el.classList.toggle("flipped");
        if (!wasFlipped && window.ambience) window.ambience.chime();
        maybeShowActions();
      };
      inner.addEventListener("click", flip);
      inner.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip();
        }
      });
    });

    // Shuffle animation on entry
    container.classList.add("shuffling");
    setTimeout(() => container.classList.remove("shuffling"), 900);

    document.getElementById("reading-actions").hidden = true;
    showScreen("reading");
  }

  function maybeShowActions() {
    const allFlipped = Array.from(document.querySelectorAll(".card"))
      .every((c) => c.classList.contains("flipped"));
    if (allFlipped) {
      document.getElementById("reading-actions").hidden = false;
    }
  }

  function romanNumeral(n) {
    const map = [
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    if (n === 0) return "0";
    let num = n, out = "";
    // Only need up to 21
    const lookup = { 0:"0",1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII",9:"IX",
                     10:"X",11:"XI",12:"XII",13:"XIII",14:"XIV",15:"XV",16:"XVI",17:"XVII",
                     18:"XVIII",19:"XIX",20:"XX",21:"XXI" };
    return lookup[n] || String(n);
  }

  // ---- Event wiring ----

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (t) {
      const action = t.dataset.action;
      if (action === "go-theme") {
        setSound(true);
        showScreen("theme");
        return;
      }
      if (action === "back-theme") showScreen("theme");
      if (action === "new-reading") {
        state.theme = null;
        state.spread = null;
        showScreen("theme");
      }
      if (action === "same-theme") renderReading();
      return;
    }

    const theme = e.target.closest("[data-theme]");
    if (theme) {
      state.theme = theme.dataset.theme;
      showScreen("spread");
      return;
    }

    const spread = e.target.closest("[data-spread]");
    if (spread) {
      state.spread = parseInt(spread.dataset.spread, 10);
      renderReading();
      return;
    }
  });
})();
