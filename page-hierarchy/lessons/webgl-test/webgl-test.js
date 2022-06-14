// canvas object class
class webGlCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.#canvasWidth = canvas.clientWidth;
    this.#canvasHeight = canvas.clientHeight;
  };
  // PUBLIC
  startRendering() {
    // --- initialize webgl context ---
    // create context
    const gl = this.canvas.getContext("webgl2", this.renderArgs);

    // ----- create and compile shaders -----
    // -- create and compile vertex shader
    let vertexShaderSource = getSource(getJSON("data/vertex-shader-source.json", true));
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    // check if sucess
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(vertexShader));
    };

    // -- create and compile fragment shader
    let fragmentShaderSource = getSource(getJSON("data/fragment-shader-source.json", true));
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    // check if sucess
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(fragmentShader));
    };

    // -- combine and apply shaders
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
    };

    // activate program
    gl.useProgram(program);

    // ----- bind and enable shader to object -----
    // -- bind vertex buffer object ( VBO )
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // -- get coordinates of attribute. ( in shader code)
    const coordinates = gl.getAttribLocation(program, "coordinates");
    // -- point it to currently bound VBO
    gl.vertexAttribPointer(coordinates, 2, gl.FLOAT, false, 0, 0);
    // enable attribute
    gl.enableVertexAttribArray(coordinates);

    // ----- start rendering -----
    // -- clear canvas
    gl.clearColor( 0, 0, 0, 1);
    // -- TODO: check webgl depth_test
    gl.enable(gl.DEPTH_TEST);
    // -- clear color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // -- configures viewport TODO: extract to allow resizing of canvas
    gl.viewport(0, 0, this.#canvasWidth, this.#canvasHeight);
    // -- actually draw geometry
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  // PRIVATE
  // get geometry
  #loadVertices() {
    const vertexArray = [
      -0.5, 0.5, -0.5, -0.5, 0.0, -0.5,
    ];
    return vertexArray;
  };

  // -- variables
  #canvas;
  #canvasWidth;
  #canvasHeight;

  // webgl options
  #renderArgs = {
    alpha: false,
  };
};

// page variables
const guiButtonRun = document.getElementById("main-canvas-button-start-render");
const guiButtonStop = document.getElementById("main-canvas-button-stop-render");

// start rendering to main canvas when loaded
guiButtonRun.addEventListener("click", () => {
  // select canvas
  const canvas = document.getElementById("main-canvas");
  // load renderer
  const renderer = new webGlCanvas(canvas);
  // start renderer
  renderer.startRendering();
});



// --- helper functions ---

// loading json
function getJSON(path, required = true) {
  fetch(path)
  .then(response => {
    console.log(`fetched ${path}`);
    if (!response.ok && required) {
      throw new Error(`Could not load: ${path}`);
    };
    response.json()})
  .then(data => {console.log(`this is ${path}:\tdata`); return data});
};

// extract string from json
function getSource (object) {
  console.log(object)
  let string = "";
  for (entry of Object.entries(object)) {
    string += entry;
  };
  return string;
};