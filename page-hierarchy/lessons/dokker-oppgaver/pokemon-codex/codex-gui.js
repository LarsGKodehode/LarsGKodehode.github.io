class GUI {
  constructor(node, storageReference) {
    if (!(node instanceof Element)) {console.warn("node is not DOM element"); return};
    this.#documentTarget = node;
    this.#storageReference = storageReference.data;

    console.log(this.#storageReference);
    this.#createGUI();
    this.#attachCards();
  };

  // members public
  
  // members private
  #documentTarget;
  #storageReference;
  #targetGuiTop;
  #targetGuiCards;

  // setters and getters

  // methods public

  // methods private // commented out, cause can't forward declare private functions
  //#createGUI() {};
  //async #attachCards() {};

  // methods definition
  #createGUI() {
    const guiRaw = `
    <nav id="app-wrapper">

      <div id="gui-top">
      </div>

      <div id="gui-cards">
      </div>

    </nav>

    `;
    const gui = new DOMParser().parseFromString(guiRaw, "text/html").body.firstChild;

    // grab target references
    this.#targetGuiTop = gui.querySelector("#gui-top");
    this.#targetGuiCards = gui.querySelector("#gui-cards");
    if (this.#targetGuiCards === null) {console.log("target is null")}

    // append GUI
    this.#documentTarget.append(gui);
  };

  async #attachCards() {
    const nodeList = await Promise.all(this.#storageReference.data.map(async (pokemon) => {
      const card = this.#createCard(pokemon);
      return card;
    }));

    nodeList.forEach((node) => this.#targetGuiCards.appendChild(node))
  };

  #createCard(pokemon) {
    const cardRaw = `
    <div class="pokemon-card glass plane">
      <div class="top">
        <h1>${pokemon.name}</h1> <p>${pokemon.order}</p>
      </div>

      <img class="middle glass image" src=${pokemon.spriteURL} alt="">
      
      <div class="bottom"></div>
    </div>
    `;
    const card = new DOMParser().parseFromString(cardRaw, "text/html").body.firstChild;
    return card;
  };
};

export default GUI