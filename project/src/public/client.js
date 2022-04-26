const root = document.getElementById("root");

let store = {
  rovers: ["Perseverance", "Curiosity", "Opportunity", "Spirit"],
  currentPath: "/",
};

//functions
const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

window.clickRoute = (path) => {
  window.history.pushState({}, path, window.location.origin + path);
  updateStore(store, { currentPath: window.location.pathname });
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let { rovers, currentPath } = state;

  console.log(state);

  switch (currentPath) {
    case "/":
      return Template(Home(rovers));
    default:
      return Template(EachRovers(currentPath.split("/")[1]));
  }
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

window.addEventListener("popstate", () =>
  updateStore(store, { currentPath: window.location.pathname })
);

// ------------------------------------------------------  COMPONENTS
const Template = (func) => {
  return `
      <header>Mars Rover Gallery</header>
      <main>
      ${func}
      </main>
`;
};

const Home = (rovers) => {
  let html = "";
  rovers.map(
    (rover) =>
      (html += `<li class="roverLink" onclick=clickRoute('/${rover.toLowerCase()}')>🚀 ${rover}</li>`)
  );
  return store.currentPath === "/"
    ? `
  <div class="background"></div>
  <h3>👉 pick rover!</h3>
  <br>
  <ul class="roverList">${html}</ul>`
    : `
  <h3><a href="/" class="homeLink">🏠 go back Home</a></h3>
  <br>
  <ul class="roverList">${html}</ul>`;
};

const EachRovers = (rover) => {
  const photoName = `${rover}_photos`;
  let html = "";
  let roverHtml = "";
  if (!store[photoName]) {
    getRoverPhoto(rover);
    return `<h1>Loading...</h1>`;
  } else {
    const { latest_photos } = store[photoName].photos;
    const roverInfo = latest_photos[0].rover;
    latest_photos.map((photo) => {
      html += `<img class="image" src=${photo.img_src} />`;
    });
    for (const [key, value] of Object.entries(roverInfo)) {
      if (key !== "id" && key !== "name")
        roverHtml += `<li class="eachRoverInfo"><span class="roverInfoKey">${key} : </span><span>${value}</span></li>`;
    }
    roverHtml += `<li class="eachRoverInfo"><span class="roverInfoKey">photo_date : </span><span>${latest_photos[0].earth_date}</span></li>`;
    return `${Home(store.rovers)}
    <hr>
    <h2 class="roverName">🛰 ${rover} 🛰</h2>
    <br>
    <ul class="roverInfoList">${roverHtml}</ul>
    <br>
    <div class="grid">${html}</div>`;
  }
};

// ------------------------------------------------------  API CALLS

const getRoverPhoto = async (rover) => {
  let photoName = `${rover}_photos`;
  let photos = await fetch(`http://localhost:3400/rover?name=${rover}`).then(
    (res) => res.json()
  );
  updateStore(store, { [photoName]: photos });
};

const createAsteroid = () => {
  const back = document.getElementsByClassName("background")[0];
  const asteroid = document.createElement("i");
  asteroid.innerHTML = "☄️";
  asteroid.classList.add("fall");
  asteroid.style.left = Math.random() * window.innerWidth - 60 + "px";
  back.appendChild(asteroid);

  setTimeout(() => asteroid.remove(), 5000);
};

if (store.currentPath === "/") setInterval(createElement, 1000);
