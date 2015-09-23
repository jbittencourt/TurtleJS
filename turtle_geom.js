/******************************************************************************
 * START
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ccn3xf
 ******************************************************************************/


Blockly.Blocks['controls_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Largada");
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['controls_start'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '' ; //'var currentworld = getCurrentMicroworld();';
  return code;
};

/******************************************************************************
 * MOVE FORWARD
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#f2d4ru
 *
 ******************************************************************************/

Blockly.Blocks['move_forward'] = {
  init: function() {
    this.appendValueInput("steps")
        .setCheck("Number")
        .appendField("para frente");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.JavaScript['move_forward'] = function(block) {
  var value_steps = Blockly.JavaScript.valueToCode(block, 'steps', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'drawCurrentTurtle('+value_steps+');';
  return code;
};

/******************************************************************************
 * MOVE BACKWARD
 ******************************************************************************/

Blockly.Blocks['move_backward'] = {
  init: function() {
    this.appendValueInput("steps")
        .setCheck("Number")
        .appendField("para trás");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.JavaScript['move_backward'] = function(block) {
  var value_steps = Blockly.JavaScript.valueToCode(block, 'steps', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'drawCurrentTurtle(-'+value_steps+');';
  return code;
};


/******************************************************************************
 * TURN RIGHT
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#nzgbrs
 *
 ******************************************************************************/
 Blockly.Blocks['turn_right'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("gira")
         .appendField(new Blockly.FieldAngle("90"), "degrees")
         .appendField("para direita");
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['turn_right'] = function(block) {
  var angle_degrees = block.getFieldValue('degrees');
  var code = 'rightCurrentTurtle('+angle_degrees+');';
  return code;
};

/******************************************************************************
 * TURN LEFT
 ******************************************************************************/
 Blockly.Blocks['turn_left'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("gira")
         .appendField(new Blockly.FieldAngle("90"), "degrees")
         .appendField("para esquerda");
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['turn_left'] = function(block) {
  var angle_degrees = block.getFieldValue('degrees');
  var code = 'leftCurrentTurtle('+angle_degrees+');';
  return code;
};
