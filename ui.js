
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
