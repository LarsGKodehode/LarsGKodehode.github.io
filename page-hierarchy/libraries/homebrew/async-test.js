class Test {
  constructor(target) {
    this.target = target
  };

  // members
  #target;
  #keys;

  // getters and setters
  set target(node) {
    this.#target = node;
  };
  get target() {
    return this.#target;
  };

  set keys(object) {
    this.#keys = object;
  };
  get keys() {
    return this.#keys;
  };

  // methods
  async run() {
    this.keys = this.#grabAndParse("apiKeys");
    for (let timesRan = 0; timesRan < 10000; timesRan++) {
      if (timesRan % 1000 === 0) {
        console.log(timesRan);
      };
      if (!(this.keys === undefined)) {
        console.log(this.keys);
      };
    };
  };

  async #grabAndParse(what) {
    const target = `/.secrets/${what}.json`;
    console.log(target);
  
    fetch(target)
      .then((json) => {json.json})
      .then((parsedJson) => {return parsedJson})
  };
};


// ============================
// ---------- main ------------
// ============================
const target2 = document.getElementById("target-2");
const program = new Test(target2);

//program.run();

// web-page-internal\.secrets\apiKeys.json