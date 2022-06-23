class PokeCard {
  constructor(pokemonObject) {
    // get pokemon object from pokeapi.com
    this.pokeObject = pokemonObject;

    // grab important info
    const name = this.pokeObject.name;
    const imageSrc = this.pokeObject.sprites.front_default;

    // define card structure
    const designString = `
    <div class="pokecard">
      <h1>${name.toUpperCase()}</h1>
      <img class="pokemon-image" src="${imageSrc}">
    </div>
    `;

    this.cardNode = designString;
  };

  // members
  #pokeObject;
  #cardNode;

  set pokeObject(object) {
    this.#pokeObject = object;
  };
  get pokeObject() {
    return this.#pokeObject;
  };

  set cardNode(string) {
    this.#cardNode = new DOMParser().parseFromString(string, "text/html").body.firstChild;
  };
  get cardNode() {
    return this.#cardNode;
  };
};

async function fetchPokemon(name, appendTarget) {
  // fetch from api
  const newPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  const parsedPokemon = await newPokemon.json();

  // create new instance with fetched info
  const newCard = new PokeCard(parsedPokemon);

  // append
  appendTarget.appendChild(newCard.cardNode);
};

// ========================================
// ----------------- main -----------------
// ========================================

// helper
function randomon() {
  return Math.floor((Math.random() * pokemonNumber) + 1);
};

// where to attach
const targetCards = document.getElementById("target-cards");
// number of pokemons in pokemonapi.com
const pokemonNumber = 905
// number of card to create
const population = 1;


for (let i = 0; i < population; i++) {
  fetchPokemon(randomon(), targetCards);
}