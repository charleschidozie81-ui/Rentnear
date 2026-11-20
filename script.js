const params = new URLSearchParams(window.location.search);
const categoryParam = params.get("category");

let category = categories.find(function (c) {
  return c.id === categoryParam && c.active;
});

if (!category) {
  category = categories[0];
}

const categoryList = document.getElementById("category-list");
const areaList = document.getElementById("area-list");
const areasTitle = document.getElementById("areas-title");

function countProviders(areaId) {
  const matching = providers.filter(function (provider) {
    return provider.areas.includes(areaId) && provider.categories.includes(category.id);
  });
  return matching.length;
}

function renderCategories() {
  let html = "";

  categories.forEach(function (cat) {
    const description = cat.description
      ? `<span class="category-desc">${cat.description}</span>`
      : "";

    if (cat.active) {
      const selected = cat.id === category.id ? " is-selected" : "";
      html += `
        <a class="category-card${selected}" href="index.html?category=${cat.id}#areas">
          <span class="category-name">${cat.name}</span>
          ${description}
        </a>
      `;
    } else {
      html += `
        <div class="category-card is-soon">
          <span class="category-name">${cat.name}</span>
          ${description}
          <span class="soon-tag">Coming soon</span>
        </div>
      `;
    }
  });

  categoryList.innerHTML = html;
}

function renderAreas() {
  areasTitle.textContent = category.name + ": choose your area";

  let html = "";

  areas.forEach(function (area) {
    const count = countProviders(area.id);
    let label;

    if (count === 0) {
      label = "No " + category.providers + " yet";
    } else if (count === 1) {
      label = "1 " + category.provider;
    } else {
      label = count + " " + category.providers;
    }

    html += `
      <a class="area-card" href="area.html?area=${area.id}&category=${category.id}">
        <span class="area-name">${area.name}</span>
        <span class="area-count">${label}</span>
      </a>
    `;
  });

  areaList.innerHTML = html;
}

renderCategories();
renderAreas();
