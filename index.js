const githubUrl = "https://ihatov08.github.io/";
const allApi = "kimetsu_api/api/all.json";
const kisatsutaiApi = "kimetsu_api/api/kisatsutai.json";
const hashiraApi = "kimetsu_api/api/hashira.json";
const oniApi = "kimetsu_api/api/oni.json";

function loadingHTML() {
  const container = document.getElementById("content");
  container.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>ロード中です</h3>`;
  container.appendChild(div);
}

function errorHTML(e) {
  const container = document.getElementById("content");
  container.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>${e}</h3>`;
  container.appendChild(div);
}

function createHTML(json) {
  const container = document.getElementById("content");
  container.innerHTML = "";

  json.forEach((character) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span>${character.name}</span>
      <span>${character.category}</span>
      <img src="${githubUrl + character.image}" alt="${character.name}">
    `;
    container.appendChild(div);
  });
}

document.getElementById("category").addEventListener("change", (event) => {
  const apiMap = {
    all: allApi,
    kisatsutai: kisatsutaiApi,
    hashira: hashiraApi,
    oni: oniApi,
  };

  const selectedApi = apiMap[event.target.value];
  init(selectedApi);
});

async function fetchCharacter(api) {
  const response = await fetch(`${githubUrl + api}`);
  if (response.ok) {
    const json = await response.json();
    if (!json.length) {
      throw new Error("データが見つかりません");
    }
    return json;
  }
}

async function init(api) {
  loadingHTML();
  try {
    const characters = await fetchCharacter(api);
    createHTML(characters);
  } catch (e) {
    errorHTML(e);
  }
}

init(allApi);
