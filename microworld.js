
/**
 * Turtle Graphics Microwold in Javascript
 *
 * Author: Juliano Bittencourt <juliano@hardfunstudios.com>
 *
 * This work was heavely beased on Joshua's Bell Turtle Graphics in Javascript.
 * See the original code in https://github.com/inexorabletash/jslogo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/

function Microworld(canvasElement, width, height) {
  width = Number(width);
  height = Number(height);

	var turtleCanvas = null;   //canvas elements
	var turtleCanvas_ctx = null; //canvas context

	var penCanvas = null;     //canvas elements
	var penCanvas_ctx = null; //canvas context

	var renderCanvas = canvasElement; //canvas elements
	var renderCanvas_ctx = canvasElement.getContext('2d'); //canvas context

	var initilized = false;



	var turtleImageFile = "t0.png";
	var turtles = []; // array containing all turtles
	var currentTurtleIndex = 0; //point to the current turtle in the array
	var currentTurtle = null;  //pointer to the current turtle



  function deg2rad(d) { return d / 180 * Math.PI; }
  function rad2deg(r) { return r * 180 / Math.PI; }

  this.renderAtEachCommand = true;

  var self = this;

	function Turtle(turtleName,imageFilename, microworld) {

		this.turtleImageFile = imageFilename;
		this.name = turtleName;

		this.turtleImage = new Image();
		this.turtleImage.src = imageFilename;
		this.visible = true;

    this.microworld = microworld;    //references the parant microworld

    this.turtleImage.onload = function() { microworld.render(); }  //when finished loading the image, forces the microworld to render again

	}

  function moveto(x, y) {
    function _go(x1, y1, x2, y2) {
      if (self.filling) {
        penCanvas_ctx.lineTo(x1, y1);
        penCanvas_ctx.lineTo(x2, y2);
      } else if (self.down) {
        penCanvas_ctx.beginPath();
        penCanvas_ctx.moveTo(x1, y1);
        penCanvas_ctx.lineTo(x2, y2);
        penCanvas_ctx.stroke();
      }
    }

    var ix, iy, wx, wy, fx, fy, less;

    while (true) {
      // TODO: What happens if we switch modes and turtle is outside bounds?

      switch (self.turtlemode) {
        case 'window':
          _go(self.x, self.y, x, y);
          self.x = x;
          self.y = y;
          return;

        default:
        case 'wrap':
        case 'fence':

          // fraction before intersecting
          fx = 1;
          fy = 1;

          if (x < 0) {
            fx = (self.x - 0) / (self.x - x);
          } else if (x >= width) {
            fx = (self.x - width) / (self.x - x);
          }

          if (y < 0) {
            fy = (self.y - 0) / (self.y - y);
          } else if (y >= height) {
            fy = (self.y - height) / (self.y - y);
          }

          // intersection point (draw current to here)
          ix = x;
          iy = y;

          // endpoint after wrapping (next "here")
          wx = x;
          wy = y;

          if (fx < 1 && fx <= fy) {
            less = (x < 0);
            ix = less ? 0 : width;
            iy = self.y - fx * (self.y - y);
            x += less ? width : -width;
            wx = less ? width : 0;
            wy = iy;
          } else if (fy < 1 && fy <= fx) {
            less = (y < 0);
            ix = self.x - fy * (self.x - x);
            iy = less ? 0 : height;
            y += less ? height : -height;
            wx = ix;
            wy = less ? height : 0;
          }

          _go(self.x, self.y, ix, iy);

          if (self.turtlemode === 'fence') {
            // FENCE - stop on collision
            self.x = ix;
            self.y = iy;
            return;
          } else {
            // WRAP - keep going
            self.x = wx;
            self.y = wy;
            if (fx === 1 && fy === 1) {
              return;
            }
          }

          break;
      }
    }
  }

  this.move = function(distance) {
    var x, y, point, saved_x, saved_y, EPSILON = 1e-3;

    point = Math.abs(distance) < EPSILON;

    if (point) {
      saved_x = this.x;
      saved_y = this.y;
      distance = EPSILON;
    }

    x = this.x + distance * Math.cos(this.r);
    y = this.y - distance * Math.sin(this.r);
    moveto(x, y);

    if (point) {
      this.x = saved_x;
      this.y = saved_y;
    }

    if(this.renderAtEachCommand) this.render();
  };

  this.turn = function(angle) {
    this.r -= deg2rad(angle);

    if(this.renderAtEachCommand) this.render();
  };

  this.penup = function() { this.down = false; };
  this.pendown = function() { this.down = true; };

  this.setpenmode = function(penmode) {
    this.penmode = penmode;
    penCanvas_ctx.globalCompositeOperation =
                (this.penmode === 'erase') ? 'destination-out' :
                (this.penmode === 'reverse') ? 'xor' : 'source-over';
  };
  this.getpenmode = function() { return this.penmode; };

  this.setturtlemode = function(turtlemode) { this.turtlemode = turtlemode; };
  this.getturtlemode = function() { return this.turtlemode; };

  this.ispendown = function() { return this.down; };

  // To handle additional color names (localizations, etc):
  // turtle.colorAlias = function(name) {
  //   return {internationalorange: '#FF4F00', ... }[name];
  // };
  this.colorAlias = null;

  var STANDARD_COLORS = {
    0: "black", 1: "blue", 2: "lime", 3: "cyan",
    4: "red", 5: "magenta", 6: "yellow", 7: "white",
    8: "brown", 9: "tan", 10: "green", 11: "aquamarine",
    12: "salmon", 13: "purple", 14: "orange", 15: "gray"
  };

  function parseColor(color) {
    color = String(color);
    if (STANDARD_COLORS.hasOwnProperty(color))
      return STANDARD_COLORS[color];
    if (self.colorAlias)
      return self.colorAlias(color) || color;
    return color;
  }

  this.setcolor = function(color) {
    this.color = color;
    penCanvas_ctx.strokeStyle = parseColor(this.color);
    penCanvas_ctx.fillStyle = parseColor(this.color);
  };
  this.getcolor = function() { return this.color; };

  this.setwidth = function(width) {
    this.width = width;
    penCanvas_ctx.lineWidth = this.width;
  };
  this.getwidth = function() { return this.width; };

  this.setfontsize = function(size) {
    this.fontsize = size;
    penCanvas_ctx.font = this.fontsize + 'px sans-serif';
  };
  this.getfontsize = function() { return this.fontsize; };

  this.setposition = function(x, y) {
    x = (x === undefined) ? this.x : x + (width / 2);
    y = (y === undefined) ? this.y : -y + (height / 2);

    moveto(x, y);
  };

  this.towards = function(x, y) {
    x = x + (width / 2);
    y = -y + (height / 2);

    return 90 - rad2deg(Math.atan2(this.y - y, x - this.x));

    if(this.renderAtEachCommand) this.render();
  };

  this.setheading = function(angle) {
    this.r = deg2rad(90 - angle);

    if(this.renderAtEachCommand) this.render();
  };

  this.clearscreen = function() {
    this.home();
    this.clear();

    if(this.renderAtEachCommand) this.render();
  };

  this.clear = function() {
    penCanvas_ctx.clearRect(0, 0, width, height);
    penCanvas_ctx.save();
    try {
      penCanvas_ctx.fillStyle = parseColor(this.bgcolor);
      penCanvas_ctx.fillRect(0, 0, width, height);
    } finally {
      penCanvas_ctx.restore();
    }

    if(this.renderAtEachCommand) this.render();
  };

  this.home = function() {
    moveto(width / 2, height / 2);
    this.r = deg2rad(90);

    if(this.renderAtEachCommand) this.render();
  };

  this.showturtle = function() {
    currentTurtle.visible = true;

    if(this.renderAtEachCommand) this.render();
  };

  this.hideturtle = function() {
    currentTurtle.visible = false;

    if(this.renderAtEachCommand) this.render();
  };

  this.isturtlevisible = function() {
    return currentTurtle.visible;
  };

  this.getheading = function() {
    return 90 - rad2deg(this.r);
  };

  this.getxy = function() {
    return [this.x - (width / 2), -this.y + (height / 2)];
  };

  this.drawtext = function(text) {
    penCanvas_ctx.save();
    penCanvas_ctx.translate(this.x, this.y);
    penCanvas_ctx.rotate(-this.r);
    penCanvas_ctx.fillText(text, 0, 0);
    penCanvas_ctx.restore();

    if(this.renderAtEachCommand) this.render();
  };

  this.filling = 0;
  this.beginpath = function() {
    if (this.filling === 0) {
      this.saved_turtlemode = this.turtlemode;
      this.turtlemode = 'window';
      ++this.filling;
      penCanvas_ctx.beginPath();
    }
  };

  this.fillpath = function(fillcolor) {
    --this.filling;
    if (this.filling === 0) {
      penCanvas_ctx.closePath();
      penCanvas_ctx.fillStyle = parseColor(fillcolor);
      penCanvas_ctx.fill();
      penCanvas_ctx.fillStyle = this.color;
      if (this.down)
        penCanvas_ctx.stroke();
      this.turtlemode = this.saved_turtlemode;
    }

    if(this.renderAtEachCommand) this.render();
  };

  this.fill = function() {
    // TODO: implement flood fill funcion to canvas
    penCanvas_ctx.floodFill(this.x, this.y);

    if(this.renderAtEachCommand) this.render();
  };

  this.arc = function(angle, radius) {
    var self = this;
    if (this.turtlemode == 'wrap') {
      [self.x, self.x + width, this.x - width].forEach(function(x) {
        [self.y, self.y + height, this.y - height].forEach(function(y) {
          if (!this.filling)
            penCanvas_ctx.beginPath();
          penCanvas_ctx.arc(x, y, radius, -self.r, -self.r + deg2rad(angle), false);
          if (!this.filling)
            penCanvas_ctx.stroke();
        });
      });
    } else {
      if (!this.filling)
        penCanvas_ctx.beginPath();
      penCanvas_ctx.arc(this.x, this.y, radius, -this.r, -this.r + deg2rad(angle), false);
      if (!this.filling)
        penCanvas_ctx.stroke();
    }

    if(this.renderAtEachCommand) this.render();
  };

  this.getstate = function () {
    return {
      isturtlestate: true,
      color: this.getcolor(),
      xy: this.getxy(),
      heading: this.getheading(),
      penmode: this.getpenmode(),
      turtlemode: this.getturtlemode(),
      width: this.getwidth(),
      fontsize: this.getfontsize(),
      visible: this.isturtlevisible(),
      pendown: this.down
    };
  };

  this.setstate = function (state) {
    if ((! state) || ! state.isturtlestate) {
      throw new Error("Tried to restore a state that is not a turtle state");
    }
    this.penup();
    this.hideturtle();
    this.setturtlemode(state.turtlemode);
    this.setcolor(state.color);
    this.setwidth(state.width);
    this.setfontsize(state.size);
    this.setposition(state.xy[0], state.xy[1]);
    this.setheading(state.heading);
    this.setpenmode(state.penmode);
    if (state.visible) {
      this.showturtle();
    }
    if (state.pendown) {
      this.pendown();
    }
  };

	this.render = function() {


		// Erase turtle canvas
    turtleCanvas_ctx.clearRect(0, 0, width, height);

    // Stub for old browsers w/ canvas but no text functions
    //penCanvas_ctx.fillText = penCanvas_ctx.fillText || function fillText(string, x, y) { };
		var turtle = currentTurtle;

    if (turtle.visible) {
      var ctx = turtleCanvas_ctx;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI/2 - this.r);

      dx = -(turtle.turtleImage.width / 2);
      dy = -(turtle.turtleImage.height / 2);


			ctx.drawImage(turtle.turtleImage, dx, dy);

      ctx.restore();
    }



		renderCanvas_ctx.clearRect(0,0,renderCanvas.width,renderCanvas.height);

		renderCanvas_ctx.drawImage(penCanvas,0,0);
		renderCanvas_ctx.drawImage(turtleCanvas,0,0);

		// window.requestAnimationFrame(render);
  };

  this.x = width / 2;
  this.y = height / 2;
  this.r = Math.PI / 2;

  this.bgcolor = '#ffffff';
  this.color = '#000000';
  this.width = 1;
  this.penmode = 'paint';
  this.fontsize = 14;
  this.turtlemode = 'wrap';
  this.visible = true;
  this.down = true;

  function init() {
		//Create 2 adictional canvas
		turtleCanvas = document.createElement("CANVAS");
		turtleCanvas.id = "mwTurtleCanvas";
		turtleCanvas.width = width;
		turtleCanvas.height = height;
		turtleCanvas.style.display = "none";
		document.body.appendChild(turtleCanvas);
		turtleCanvas_ctx = turtleCanvas.getContext('2d');

		penCanvas = document.createElement("CANVAS");
		penCanvas.id = "mwPenCanvas";
		penCanvas.width = width;
		penCanvas.height = height;
		penCanvas.style.display = "none";
		document.body.appendChild(penCanvas);
		penCanvas_ctx = penCanvas.getContext('2d');

		turtleCanvas_ctx.lineCap = 'round';
		turtleCanvas_ctx.strokeStyle = 'green';
		turtleCanvas_ctx.lineWidth = 2;

		penCanvas_ctx.lineCap = 'round';

		penCanvas_ctx.strokeStyle = parseColor(this.color);
		penCanvas_ctx.fillStyle = parseColor(this.color);
		penCanvas_ctx.lineWidth = this.width;
		penCanvas_ctx.font = this.fontsize + 'px sans-serif';
		penCanvas_ctx.globalCompositeOperation =
			(self.penmode === 'erase') ? 'destination-out' :
			(self.penmode === 'reverse') ? 'xor' : 'source-over';


		//creates first turtle 0
		var turtle0 = new Turtle("0",turtleImageFile,self);
		turtles.push(turtle0);

		currentTurtle = turtles[currentTurtleIndex];
  }

  this.resize = function(w, h) {
    width = w;
    height = h;
    init();
  };

  init();
  this.render();
}
