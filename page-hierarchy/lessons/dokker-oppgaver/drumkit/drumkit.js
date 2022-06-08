// global variables
let keyRegister = {}; // holds keybinds
let drumKit = []; // holds list of drums in kit
// handles
const drumkitWrapper = document.getElementById("drumkit-wrapper");
const drumkitJSON = `http://127.0.0.1:5500/page-hierarchy/lessons/dokker-oppgaver/drumkit/drumkit.json`



// drum object
class drum {
  constructor(object) {
    for (const field in object) {
      if(field === "sound") {
        this[field] = new Audio(object[field]);
        continue;
      };
      this[field] = object[field];
    };
  };
  
  // playing the drums
  playSound() {
    this.sound.play();
    console.log(`Playing the:\t ${this.name}`);
  };
};

// keyboard input
document.addEventListener("keydown", (keyDownEvent) => {
  if (typeof(keyRegister[`${keyDownEvent.code}`]) === "function"){
  keyRegister[`${keyDownEvent.code}`]();
  };
});

// install drums
function initDrumkit(drums, target) {
  const fragment = new DocumentFragment();
  const node = document.createElement("div");
  node.id = "drum-kit"
  
  for (const drum of drums) {
    // add to HTML and set meta tags
    const newDrum = document.createElement("div");
    adjustMeta(drum, newDrum);
    node.appendChild(newDrum);
    
    // add on click for drum
    newDrum.addEventListener("click", () => drum.playSound());
    // add keybeinding for drum
    keyRegister[`${drum.keyCode}`] = () => drum.playSound();
  };
  
  fragment.appendChild(node);
  target.appendChild(fragment);
};

function adjustMeta(drum, newDrum) {
  newDrum.id = drum.name;
  newDrum.className = `${drum.type} sound-tool`;
  newDrum.textContent = drum.icon;
};

// fetch drumkit file
fetch(drumkitJSON)
  .then(response => response.json())
  .then((data) => {
    for (entry of data) {
      drumKit.push(new drum(entry));
    };
  // order instalation of drums
  initDrumkit(drumKit, drumkitWrapper);
  });