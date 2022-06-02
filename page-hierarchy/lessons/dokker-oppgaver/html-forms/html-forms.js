// element to start insertion from
const insertionNode = document.getElementById("forms-wrapper");

// all my form info
const myForms = [
  "input",
  [
  {type: "button", value: "click me", description: "this is a button to click"},
  {type: "checkbox", name: "checker box", description: "check this checkbox out"},
  {type: "color", name: "colorpicker", description: "chose your very own color"},
  {type: "date", name: "date", description: "pick a date"},
  {type: "email", name: "mail", description: "mail me today"},
  {type: "file", name: "file", description: "find a file"},
  {type: "number", name: "number", description: "numbers all day long"},
  {type: "password", name: "password", description: "pass me your password"},
  {type: "radio", name: "radio", description: "radio GAGA"},
  {type: "range", name: "range", description: "in rang of everyone"},
  {type: "search", name: "search", description: "search the world for me"},
  {type: "submit", value: "submit form", description: "submit your bodily form here"},
  {type: "text", name: "text", description: "text another person"},
  {type: "url", name: "url", description: "I'll check your url for you"},
  ]
];


// returns a filled node
function createContainer(type, object) {
  const {description: text} = object;
  
  const container = document.createElement("div");
  container.appendChild(document.createTextNode(text));
  
  const button = document.createElement(type);
  for ([key, value] of Object.entries(object)) {
    button[key] = value;
  }
  button.type = "button";
  
  container.appendChild(button);
  
  console.log(`logging out returned node:\n\t`, container);
  return container;
};

// creates a child at node filled with all the forms
function fillForms(insertionNode, forms) {
  // getting the type
  const type = forms[0];
  // creating the fragment
  const fragment = new DocumentFragment;
  // extracting all the elements
  for (element of forms[1]) {
    fragment.appendChild(createContainer(type, element));
  };
  insertionNode.appendChild(fragment);
};

fillForms(insertionNode, myForms);