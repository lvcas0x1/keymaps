const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");

function kbd(key) {
  const el = document.createElement("kbd");
  el.textContent = key;
  return el;
}

function renderKeys(keys) {
  const wrapper = document.createElement("div");
  keys.forEach((key) => wrapper.appendChild(kbd(key)));
  return wrapper;
}

function matchesItem(item, groupName, system, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return [
    system.name,
    system.badge,
    system.description,
    groupName,
    item.action,
    item.note,
    ...(item.keys || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(q);
}

function render(data, query = "") {
  app.innerHTML = "";
  nav.innerHTML = "";

  let visibleSections = 0;

  document.title = data.title;

  for (const system of data.systems) {
    const section = document.createElement("section");
    section.className = "section";
    section.dataset.system = system.id;
    section.id = system.id;

    const navLink = document.createElement("a");
    navLink.href = `#${system.id}`;
    navLink.textContent = system.name;
    nav.appendChild(navLink);

    const header = document.createElement("div");
    header.className = "section-header";

    const left = document.createElement("div");

    const title = document.createElement("div");
    title.className = "section-title";

    const dot = document.createElement("span");
    dot.className = "dot";

    const h2 = document.createElement("h2");
    h2.textContent = system.name;

    title.append(dot, h2);

    const desc = document.createElement("p");
    desc.className = "description";
    desc.textContent = system.description || "";

    left.append(title, desc);

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = system.badge || "";

    header.append(left, badge);

    const cards = document.createElement("div");
    cards.className = "cards";

    let visibleCards = 0;

    for (const group of system.groups) {
      const visibleItems = group.items.filter((item) =>
        matchesItem(item, group.name, system, query)
      );

      if (visibleItems.length === 0) continue;

      visibleCards += 1;

      const card = document.createElement("article");
      card.className = "card";

      const h3 = document.createElement("h3");
      h3.textContent = group.name;

      const table = document.createElement("table");
      table.className = "table";

      for (const item of visibleItems) {
        const tr = document.createElement("tr");

        const tdKeys = document.createElement("td");
        tdKeys.className = "keys";
        tdKeys.appendChild(renderKeys(item.keys || []));

        const tdAction = document.createElement("td");

        const action = document.createElement("div");
        action.className = "action";
        action.textContent = item.action;

        tdAction.appendChild(action);

        if (item.note) {
          const note = document.createElement("div");
          note.className = "note";
          note.textContent = item.note;
          tdAction.appendChild(note);
        }

        tr.append(tdKeys, tdAction);
        table.appendChild(tr);
      }

      card.append(h3, table);
      cards.appendChild(card);
    }

    if (visibleCards > 0) {
      visibleSections += 1;
      section.append(header, cards);
      app.appendChild(section);
    }
  }

  empty.style.display = visibleSections === 0 ? "block" : "none";
}

async function main() {
  const response = await fetch("./assets/shortcuts.json");
  const data = await response.json();

  document.querySelector("#title").textContent = data.title;
  document.querySelector("#subtitle").textContent = data.subtitle;
  document.querySelector("#updated").textContent = `Updated: ${data.updated}`;

  render(data);

  search.addEventListener("input", (event) => {
    render(data, event.target.value);
  });
}

main().catch((error) => {
  app.innerHTML = `<pre>${error.message}</pre>`;
});
