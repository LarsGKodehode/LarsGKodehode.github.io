import PokemonCodex from "./codex-storage.js";
import GUI from "./codex-gui.js";



// ==================================
// -------------- main --------------
// ==================================


// DOM elements
const target = document.getElementById("app-wrapper");

const buttonRefresh = document.getElementById(`button-refresh`);
const buttonCreateGui = document.getElementById(`button-create-gui`);
const buttonDeleteCards = document.getElementById(`button-delete-cards`);

// global elements
const codex = new PokemonCodex(); // forward declaration for use with create button
let gui; // new GUI reference


// listners
buttonRefresh.addEventListener("click", () => {
  codex.loadData();
});

buttonCreateGui.addEventListener("click", () => {
  gui = new GUI(target, codex);
});

buttonDeleteCards.addEventListener("click", () => {
  
});