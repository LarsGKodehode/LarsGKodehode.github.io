
const testVar = "text from variable"

const domString = `
<div>${testVar}</div>
`;
const newDocument = new window.DOMParser().parseFromString(domString, "text/html").body.firstChild;



console.clear();
console.log(newDocument);

const documentTarget = document.getElementById("target-1");
documentTarget.appendChild(newDocument);