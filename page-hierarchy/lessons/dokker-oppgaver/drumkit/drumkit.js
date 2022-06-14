// global variables
let keyRegister = {}; // holds keybindings
let drumKit = []; // holds list of drums in kit
// handles
const drumkitWrapper = document.getElementById("drumkit-wrapper");
const drumkitJSON = `drumkit.json`

// drum class
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
    this.sound.currentTime = 0;
    this.sound.play();
  };
};

// keyboard input
document.addEventListener("keydown", (keyDownEvent) => {
  if (typeof(keyRegister[keyDownEvent.code]) === "function"){
  keyRegister[keyDownEvent.code]();
  };
});

// install drums
function initDrumkit(drums, target) {
  const fragment = new DocumentFragment();
  let node = document.createElement("div");
  node.id = "drum-kit"
  
  // ataches every drum in kit
  for (const drum of drums) {
    attachDrum(drum, node);
  };
  
  fragment.appendChild(node);
  target.appendChild(fragment);
};

// add to HTML and set meta tags
function attachDrum(drum, node) {
  let newDrum = document.createElement("div");
  newDrum.id = drum.name;
  newDrum.className = `${drum.type} instrument`;
  newDrum.innerHTML = `${drum.name}<br>shortcut:<br>${drum.inputKey.charAt(3)}`;
  node.appendChild(newDrum);

  // bind events
  bindInputEvents(drum, newDrum)
};

function bindInputEvents(drum, newDrum) {
  // add on click
  newDrum.addEventListener("click", () => drum.playSound());
  // register keybeinding
  keyRegister[drum.inputKey] = () => drum.playSound();
}

// TODO: implement a generic JSON grabber
/*
function fetchJSON(handle) {
  fetch(handle)
  .then(response => response.json())
  .then(data => {return data});
};
*/

// fetch drumkit json and initialize drum kit
fetch(drumkitJSON)
  .then(response => response.json())
  .then((data) => {
    for (entry of data) {
      drumKit.push(new drum(entry));
    };
  // order instalation of drums
  initDrumkit(drumKit, drumkitWrapper);
  });

  