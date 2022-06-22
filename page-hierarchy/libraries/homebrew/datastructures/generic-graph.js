class GenericGraphNode {
  constructor(data) {
    this.data = data;
  };

  #data;
  #edges = [];

  set data(data) {
    this.#data = data;
  };
  get data() {
    return this.#data;
  };

  set edges(edge) {
    this.#edges.push(edge);
  };
  get edges() {
    return this.#edges;
  };

  insertNeighbor(data) {
    const newNode = new GenericGraphNode(data);
    this.edges = newNode;
    newNode.edges = this;
  };
};






// =======================================
//  -------------- Testing --------------
// =======================================

// initial setup
const firstNode = new GenericGraphNode(1);

console.log(" -------- test 01 --------");
console.log(firstNode);
console.log(firstNode.data);
console.log(firstNode.edges.length);
console.log(firstNode.edges);
console.log("==========================");

console.log(" -------- test 02 --------");
firstNode.insertNeighbor(2)
firstNode.insertNeighbor(3)
console.log(firstNode);
console.log(firstNode.edges);
console.log("==========================");