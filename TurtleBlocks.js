/******************************************************************************
 * START
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ccn3xf
 ******************************************************************************/


Blockly.Blocks['controls_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("start");
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

Blockly.Blocks['turtle_forward'] = {
  init: function() {
    this.appendValueInput("steps")
        .setCheck("Number")
        .appendField("forward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.JavaScript['turtle_forward'] = function(block) {
  var value_steps = Blockly.JavaScript.valueToCode(block, 'steps', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'moveCT('+value_steps+');';
  return code;
};

/******************************************************************************
 * MOVE BACKWARD
 ******************************************************************************/

Blockly.Blocks['turtle_back'] = {
  init: function() {
    this.appendValueInput("steps")
        .setCheck("Number")
        .appendField("back");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.JavaScript['turtle_back'] = function(block) {
  var value_steps = Blockly.JavaScript.valueToCode(block, 'steps', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'moveCT(-'+value_steps+');';
  return code;
};


/******************************************************************************
 * TURN RIGHT
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#nzgbrs
 ******************************************************************************/
 Blockly.Blocks['turtle_right'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("right")
         .appendField(new Blockly.FieldAngle("90"), "degrees")
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['turtle_right'] = function(block) {
  var angle_degrees = block.getFieldValue('degrees');
  var code = 'turnCT('+angle_degrees+');';
  return code;
};

/******************************************************************************
 * TURN LEFT
 ******************************************************************************/
 Blockly.Blocks['turtle_left'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("left")
         .appendField(new Blockly.FieldAngle("90"), "degrees")
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['turtle_left'] = function(block) {
  var angle_degrees = block.getFieldValue('degrees');
  var code = 'turnCT(-'+angle_degrees+');';
  return code;
};

/******************************************************************************
 * SETPOS, SETPOSX, SETPOSY, SETHEADING
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#oixy2v
 ******************************************************************************/
 Blockly.Blocks['turtle_setpos'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("set position");
     this.appendValueInput("x")
         .setCheck("Number")
         .appendField("x");
     this.appendValueInput("y")
         .setCheck("Number")
         .appendField("y");
     this.setPreviousStatement(true);
     this.setInputsInline(true);
     this.setNextStatement(true);
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

Blockly.JavaScript['turtle_setpos'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'setpositionCT('+value_x+','+value_y+');';
  return code;
};

Blockly.Blocks['turtle_setposx'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set position");
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("x");
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_setposx'] = function(block) {
 var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
 // TODO: Assemble JavaScript into code variable.
 var code = 'setpositionCT('+value_x+',undefined);';
 return code;
};


Blockly.Blocks['turtle_setposy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set position");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField("y");
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_setposy'] = function(block) {
 var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
 // TODO: Assemble JavaScript into code variable.
 var code = 'setpositionCT(undefined,'+value_y+');';
 return code;
};

Blockly.Blocks['turtle_setheading'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set heading")
        .appendField(new Blockly.FieldAngle("90"), "degrees");
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_setheading'] = function(block) {
 var angle_degrees = block.getFieldValue('degrees');
 var code = 'setheadingCT('+angle_degrees+');';
 return code;
};

/******************************************************************************
 * HOME
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#d2xwdw
 ******************************************************************************/

 Blockly.Blocks['turtle_home'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("home");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_home'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'homeCT();';
  return code;
};

//show current turle
Blockly.Blocks['turtle_show'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("show turtle");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(210);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['turtle_show'] = function(block) {
 // TODO: Assemble JavaScript into code variable.
 var code = 'showCT();';
 return code;
};

//hide current turle
Blockly.Blocks['turtle_hide'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("hide turtle");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(210);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['turtle_hide'] = function(block) {
 // TODO: Assemble JavaScript into code variable.
 var code = 'hideCT();';
 return code;
};

//clears screen
Blockly.Blocks['screen_clean'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("clean");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(60);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['screen_clean'] = function(block) {
 // TODO: Assemble JavaScript into code variable.
 var code = 'clearCT();';
 return code;
};

//clear screen
Blockly.Blocks['screen_clearscreen'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("clear screen");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(60);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['screen_clearscreen'] = function(block) {
 var code = 'clearscreenCT();';
 return code;
};



//sets bouncing to wrap
Blockly.Blocks['screen_wrap'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("wrap");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(60);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['screen_wrap'] = function(block) {
 var code = 'setturtlemodeCT("wrap");';
 return code;
};

//sets turtle mode to fence
Blockly.Blocks['screen_fence'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("fence");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(60);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['screen_fence'] = function(block) {
 var code = 'setturtlemodeCT("fence");';
 return code;
};

//sets turtle mode to fence
Blockly.Blocks['screen_window'] = {
 init: function() {
   this.appendDummyInput()
       .appendField("window");
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setColour(60);
   this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
 }
};

Blockly.JavaScript['screen_window'] = function(block) {
 var code = 'setturtlemodeCT("window ");';
 return code;
};

/******************************************************************************
 * ARC
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#7kyzds
 ******************************************************************************/
 Blockly.Blocks['turtle_arc'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("arc")
         .appendField("angle")
         .appendField(new Blockly.FieldAngle("90"), "angle");
     this.appendValueInput("radius")
         .setCheck("Number")
         .appendField("radius");
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['turtle_arc'] = function(block) {
  var angle_angle = block.getFieldValue('angle');
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'arcCT('+angle_angle+','+value_radius+');';
  return code;
};

/******************************************************************************
 * XPOS, YPOS, HEADING
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pgyj5w
 ******************************************************************************/
 Blockly.Blocks['turtle_xcor'] = {
   init: function() {
     this.appendDummyInput()
         .appendField("x coordinate");
     this.setOutput(true, "Number");
     this.setColour(210);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['turtle_xcor'] = function(block) {
  var code = 'getxyCT()[0]';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['turtle_ycor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("y coordinate");
    this.setOutput(true, "Number");
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_ycor'] = function(block) {
 var code = 'getxyCT()[1]';
 return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['turtle_heading'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("heading");
    this.setOutput(true, "Number");
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_heading'] = function(block) {
 var code = 'headingCT()';
 return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['turtle_towards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set position");
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("x");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField("y");
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['turtle_towards'] = function(block) {
 var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
 var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
 // TODO: Assemble JavaScript into code variable.
 var code = 'towardsCT('+value_x+','+value_y+');';
 return code;
};


/******************************************************************************
 * FILL, SETPENCOLOR, SETPENSIZE
 * PenColor: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ey35tk
 * PenSize: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vboywc
 ******************************************************************************/
 Blockly.Blocks['pen_fill'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("fill");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
 };

 Blockly.JavaScript['pen_fill'] = function(block) {
  var code = 'fillCT();';
  return code;
 };


 Blockly.Blocks['pen_setpencolor'] = {
   init: function() {
     this.appendValueInput("color")
         .setCheck("Number")
        .appendField("set pen color to");
     this.setColour(230);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setTooltip('');
     this.setHelpUrl('http://www.example.com/');
   }
 };

 Blockly.JavaScript['pen_setpencolor'] = function(block) {
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'setcolorCT('+value_color+');';
  return code;
};


Blockly.Blocks['pen_setpensize'] = {
  init: function() {
    this.appendValueInput("size")
        .setCheck("Number")
        .appendField("set pen size to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['pen_setpensize'] = function(block) {
  var value_size = Blockly.JavaScript.valueToCode(block, 'size', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'setsizeCT('+value_size+')';
  return code;
};
