const root = document.getElementById("root");

let store = {
  apod: "",
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
  let { rovers, apod, currentPath } = state;

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
      (html += `<li class="roverLink" onclick=clickRoute('/${rover.toLowerCase()}')>${rover} /</li>`)
  );
  return `<ul class="roverList">${html}</ul>`;
};

const EachRovers = (rover) => {
  const photoName = `${rover}_photos`;
  let html = "";
  if (!store[photoName]) {
    getRoverPhoto(rover);
    return `<h1>Loading...</h1>`;
  } else {
    const { latest_photos } = store[photoName].photos;
    latest_photos.map((photo) => {
      html += `<img class="image" src=${photo.img_src} />`;
    });
    return `${Home(store.rovers)}
    <h2>${rover}</h2>
    <div class="grid">${html}</div>`;
  }
};

// ------------------------------------------------------  API CALLS

const getImageOfTheDay = (state) => {
  let { apod } = state;

  if (!apod)
    fetch(`http://localhost:5300/apod`)
      .then((res) => res.json())
      .then((apod) => updateStore(store, { apod }));
};

const getRoverPhoto = async (rover) => {
  let photoName = `${rover}_photos`;
  let photos = await fetch(`http://localhost:5300/rover?name=${rover}`).then(
    (res) => res.json()
  );
  updateStore(store, { [photoName]: photos });
};
