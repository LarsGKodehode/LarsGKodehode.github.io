class PokemonCodex {
  constructor() {

    this.#APIEndpoint = `https://pokeapi.co/api/v2/pokemon/`;
    this.#cacheKey = `codexData`; // array of pokemon details
    this.#experiationTime = 3600000; // milliseconds, time before local cache is stale
    
    this.loadData();
  };
  

  // members public
  #data = []; // array of all pokemons

  // members private
  #APIEndpoint; // endpoint for pokeapi.co
  #cacheKey; // localStorage key
  #experiationTime; // how long data is fresh
  #currentExperiationDate; // current data timestamp


  // methods public

  // methods private // commented out, cause can't forward declare private functions
  //async #loadData() {};
  //async #fetchLocal() {};
  //async #fetchServer() {};
  //#cacheFresh() {};
  //async #updateCache(data) {};


  // setters and getters
  get data() {
    return this.#data;
  };


  // methods definition
  async loadData() {
    let newData;
    // first check cache for data
    if (this.#localCache()) {
      newData = await this.#fetchLocal();
      if (newData) {
        this.#data = newData;
        return;
      };
    };

    console.log("cache none exsistant or stale");
    newData = await this.#fetchServer();
    this.#data = newData;
  };

  async #fetchLocal() {
    console.log(`Using data from cache`);

    const dataRaw = localStorage.getItem(this.#cacheKey);
    if (dataRaw === null) {return false};
    const data = await JSON.parse(dataRaw);

    if (this.#currentExperiationDate === undefined) {
      this.#currentExperiationDate = data.expirationDate;
    };

    return data;
  };

  async #fetchServer() {
    console.log(`Fetching data from server`);

    let data = [];

    // loop until all data is retrived from server
    let newData;
    let stride = 100; // how many to fetch at once
    let iteration = 0;
    do {
      console.log(`Fetching dataset:\t ${iteration}`);
      const currentEndpoint = this.#APIEndpoint + `?offset=${stride * iteration}&limit=${stride}`;
      const newDataRaw = await fetch(currentEndpoint);
      newData = await newDataRaw.json();
      data = data.concat(newData.results);
      iteration++;
    } while (newData.next !== null);
    
    // request details from every pokemon
    const details = await Promise.all(data.map(async (pokemon) => {
      const detailsRaw = await fetch(pokemon.url);
      const detailsParsed = await detailsRaw.json();
      // filter out wanted data
      const detailsFiltered = {
        "name": detailsParsed.name,
        "order": detailsParsed.order,
        "spriteURL": detailsParsed.sprites.front_default
      };
      return detailsFiltered;
    }));

    this.#updateCache(details);
    return details;
  };

  #localCache() {
    if (this.#currentExperiationDate === undefined) {
      console.log("expiration date not set")
      return true;
    } else if (this.#currentExperiationDate < Date.now()) {
      console.log("cache is fresh");
      return true;
    } else {
      console.log("cache is stale");
      return false;
    };
  };

  async #updateCache(data) {
    console.log("updating cache");
    const currentTime = Date.now();
    const storageObject = {
      "expirationDate": currentTime + this.#experiationTime,
      "data": data
    };
    console.log(storageObject);
    const packedObject = JSON.stringify(storageObject);

    // storing might fail
    try {
      localStorage.setItem(this.#cacheKey, packedObject);
      console.log(`Updated cache`)
    } catch (error) {
      console.warn(error);
      return; // don't update local freshness if we can't store
    };
    this.#currentExperiationDate = currentTime;
  };

};

export default PokemonCodex;