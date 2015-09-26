
var currentworld = null;
var workspace = null;
var myInterpreter = null;

function getCurrentMicroworld() {
  return currentworld;
}

function initUI() {

  workspace = Blockly.inject('blocklyDiv',
     {media: 'blockly/media/',
      toolbox: document.getElementById('toolbox')});

  Blockly.Xml.domToWorkspace(workspace,
      document.getElementById('startScript'));

  workspace.addChangeListener(parseCode);

  //init the turtle geometry microworldDiv
  var canvas_element = document.getElementById("microworld");

  currentworld = new Microworld(canvas_element, canvas_element.width, canvas_element.height);
}


function initApi(interpreter, scope) {
  // Add an API function for the alert() block.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(steps) {
        steps = steps ? steps.toString() : '';
        return interpreter.createPrimitive(drawCurrentTurtle(steps));
  };
  interpreter.setProperty(scope, 'drawCurrentTurtle',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(degrees) {
        degrees = degrees ? degrees.toString() : '';
        return interpreter.createPrimitive(rightCurrentTurtle(degrees));
  };
  interpreter.setProperty(scope, 'rightCurrentTurtle',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(degrees) {
        degrees = degrees ? degrees.toString() : '';
        return interpreter.createPrimitive(leftCurrentTurtle(degrees));
  };
  interpreter.setProperty(scope, 'leftCurrentTurtle',
      interpreter.createNativeFunction(wrapper));


}

var highlightPause = false;

function highlightBlock(id) {
  workspace.highlightBlock(id);
  highlightPause = true;
}

function parseCode() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  var code = Blockly.JavaScript.workspaceToCode(workspace);

  myInterpreter = new Interpreter(code, initApi);

  console.log(code)
  document.getElementById('stepButton').disabled = '';
  document.getElementById('runButton').disabled = '';
  highlightPause = false;
  workspace.traceOn(true);
  workspace.highlightBlock(null);
}


function runCode() {
  myInterpreter.run();
}

function stepCode() {
  try {
    var ok = myInterpreter.step();
  } finally {
    if (!ok) {
      // Program complete, no more code to execute.
      document.getElementById('stepButton').disabled = 'disabled';
      return;
    }
  }
  if (highlightPause) {
    // A block has been highlighted.  Pause execution here.
    highlightPause = false;
  } else {
    // Keep executing until a highlight statement is reached.
    stepCode();
  }
}
