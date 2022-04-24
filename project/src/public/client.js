import { Router } from "./Router.js";

let store = {
  apod: "",
  rovers: ["Perseverance", "Curiosity", "Opportunity", "Spirit"],
  currentPage: "/",
};

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

// add our markup to the page
const root = document.getElementById("root");

const render = async (root, state) => {
  checkCurrentPage();
  console.log("render!");
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let { rovers, apod } = state;

  return `
        <header>Mars Rover Gallery</header>
        <main>
        ${Router(state, updateStore)}
        </main>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  if (!apod)
    fetch(`http://localhost:3000/apod`)
      .then((res) => res.json())
      .then((apod) => updateStore(store, { apod }));
};

const checkCurrentPage = () => {
  if (store.currentPage !== window.location.pathname)
    updateStore(store, { currentPage: window.location.pathname });
};
