import { Home } from "./components/Home.js";
import { EachRovers } from "./components/EachRovers.js";

export const Router = (state, updateStore) => {
  if (state.currentPage === "/") {
    return Home(state.rovers);
  } else {
    return EachRovers(state.currentPage, state, updateStore);
  }
};
