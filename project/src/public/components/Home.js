export const Home = (list) => {
  return RoverList(list);
};

const clickRoute = (path) => {
  window.history.pushState({}, path, window.location.origin + path);
};

const RoverList = (list) => {
  return `<ul>${list.map(
    (elem) => `<li><div onclick="clickRoute("/curiocity")}">${elem}</a></li>`
  )}</ul>`;
};

const home = `<h1>Home</h1>`;

const perseverance = `<h1>perseverance</h1>`;

const curiosity = `<h1>curiosity</h1>`;

const opportunity = `<h1>opportunity</h1>`;

const spirit = `<h1>spirit</h1>`;

const Routes = {
  "/": home,
  "/perserverance": perseverance,
  "/curiosity": curiosity,
  "/opportunity": opportunity,
  "/spirit": spirit,
};
