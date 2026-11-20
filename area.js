const params = new URLSearchParams(window.location.search);
const areaId = params.get("area");
const categoryParam = params.get("category");

const area = areas.find(function (a) {
  return a.id === areaId;
});

let category = categories.find(function (c) {
  return c.id === categoryParam && c.active;
});

if (!category) {
  category = categories[0];
}

// One flat list of every type in this category
let categoryTypes = [];
category.groups.forEach(function (group) {
  categoryTypes = categoryTypes.concat(group.types);
});

const titleEl = document.getElementById("area-title");
const listEl = document.getElementById("agent-list");
const filterEl = document.getElementById("type-filter");
const filterLabel = document.querySelector(".filter-label");
const backLink = document.getElementById("back-link");

backLink.href = "index.html?category=" + category.id + "#areas";

function buildWhatsAppLink(provider, typeChoice) {
  let message = "Hello, I found you on RentNear. I'm looking for " + category.lookingFor;
  message += " in " + area.name;
  if (typeChoice) {
    message += " (" + typeChoice + ")";
  }
  message += ". Is anything available?";
  return "https://wa.me/" + provider.whatsapp + "?text=" + encodeURIComponent(message);
}

function renderProviders() {
  const typeChoice = filterEl.value;

  const matching = providers.filter(function (provider) {
    const coversArea = provider.areas.includes(areaId);
    const inCategory = provider.categories.includes(category.id);
    const handlesType = typeChoice === "" || provider.types.includes(typeChoice);
    return coversArea && inCategory && handlesType;
  });

  if (matching.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <h2>No ${category.provider} here yet</h2>
        <p>We are still adding verified ${category.providers} for this area. Please check again soon.</p>
      </div>
    `;
    return;
  }

  let html = "";

  matching.forEach(function (provider) {
    const badge = provider.verified
      ? '<span class="badge-verified">Verified by us</span>'
      : "";

    const shownTypes = provider.types.filter(function (type) {
      return categoryTypes.includes(type);
    });

    html += `
      <article class="agent-card">
        <div class="agent-top">
          <h2 class="agent-name">${provider.name}</h2>
          ${badge}
        </div>
        <p class="agent-types">${shownTypes.join(", ")}</p>
        <p class="agent-phone">${provider.phone}</p>
        <div class="agent-actions">
          <a class="btn btn-call" href="tel:${provider.phone}">Call</a>
          <a class="btn btn-whatsapp" href="${buildWhatsAppLink(provider, typeChoice)}">WhatsApp</a>
        </div>
      </article>
    `;
  });

  listEl.innerHTML = html;
}

if (!area) {
  titleEl.textContent = "Area not found";
  filterEl.hidden = true;
  filterLabel.hidden = true;
  listEl.innerHTML = '<p><a class="back-link" href="index.html">Go back to all areas</a></p>';
} else {
  titleEl.textContent = category.name + " in " + area.name;
  document.title = category.name + " in " + area.name + " | RentNear";

  let optionsHtml = '<option value="">All types</option>';

  category.groups.forEach(function (group) {
    optionsHtml += `<optgroup label="${group.label}">`;
    group.types.forEach(function (type) {
      optionsHtml += `<option value="${type}">${type}</option>`;
    });
    optionsHtml += "</optgroup>";
  });

  filterEl.innerHTML = optionsHtml;
  filterEl.addEventListener("change", renderProviders);

  renderProviders();
}
