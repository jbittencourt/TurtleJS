/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Canvas Turtle provides LOGO Turtle Grpahics Javascript API
 * and LOGO Turtle Grpahic language interpreter for drawing
 * objects in Canvas
 *
 * For more information, examples and online documentation visit:
 * http://webcodingeasy.com/JS-classes/Canvas-Turtle-graphics-using-javascript
**************************************************************/
var microworld = function(id, config) {
	var ob = this;
	//wrapper element
	this.elem = document.getElementById(id);
	//canvas element
	var canvas = document.createElement("canvas");
	//canvas context
	var ctx;
	//rotation orientation
	var total_rot = 0;
	//rotation stack
	var stack = [];
	//variable stack
	var var_stack = [];
	//variable holder
	var vars = new Object();
	//loop holder
	var loops = [];
	//if holder
	var ifs = [];
	//current loop
	var cur_loop = -1;
	//current if
	var cur_if = -1;
	//last scope
	var last = [];
	//function holder
	var funcs = new Object();
	//function name holder
	var func_stack = [];
	//current function
	var cur_func = -1;
	//shor turtle
	var turtle = false;
	//some configuration
	this.conf = {
		width: 800,
		height: 600,
		on_error: null,
		turtle: "./turtle.png"
	};

	//construct
	this.construct = function(){
		//check support
		if(canvas.getContext)
		{
			//copy configuration
			for(var opt in config){
				this.conf[opt]= config[opt];
			}
			//canvas setup
			this.elem.appendChild(canvas);
			canvas.setAttribute("width", parseInt(this.conf.width) + "px");
			canvas.setAttribute("height", parseInt(this.conf.height) + "px");
			canvas.className = "microworld"

			//context setup
			ctx = canvas.getContext('2d');
			//putting turtle into cente facing up
			ctx.translate(Math.round(this.conf.width/2), Math.round(this.conf.height/2));
			ctx.rotate(Math.PI);
			//starting turtle path
			ctx.beginPath();
			//call moveTo so first lineTo won't be ignored
			ctx.moveTo(0,0);
		}
		//browser doesn't support canvas
		else if(on_error)
		{
			on_error();
		}
	};

	//move turtle
	this.move = function(units){
		units = get_val(units);
		ctx.moveTo(0, units);
		ctx.translate(0, units);
		draw_turtle();
	};
	//draw a line moving turtle
	this.draw = function(units){
		units = get_val(units);
		ctx.lineTo(0, units);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, units);
		ctx.translate(0, units);
		draw_turtle();
	};
	//turn turtle to the right (relative to current)
	this.right = function(deg){
		deg = get_val(deg);
		var rad = (Math.PI/180)*deg;
		total_rot += parseInt(deg);
		ctx.rotate(rad);
		draw_turtle();
	};
	//turn turtle to the left (relative to current)
	this.left = function(deg){
		deg = get_val(deg);
		var rad = (Math.PI/180)*(360-deg);
		total_rot -= parseInt(deg);
		ctx.rotate(rad);
		draw_turtle();
	};
	//clear canvas and reset turtle position to center faced up
	this.clear = function(){
		ctx.closePath();
		ctx.setTransform(1,0,0,1,0,0);
		ctx.clearRect(0, 0, this.conf.width, this.conf.height);
		ctx.translate(Math.round(this.conf.width/2), Math.round(this.conf.height/2));
		ctx.rotate(Math.PI);
		ctx.beginPath();
		ctx.moveTo(0,0);
		draw_turtle();
	};
	//reset turtle position to center faced up
	this.home = function(){
		ctx.closePath();
		ctx.setTransform(1,0,0,1,0,0);
		ctx.translate(Math.round(this.conf.width/2), Math.round(this.conf.height/2));
		ctx.rotate(Math.PI);
		ctx.beginPath();
		ctx.moveTo(0,0);
		draw_turtle();
	};
	//change line color
	this.color = function(color){
		var c = get_val(color);
		c = (c == 0) ? color : c;
		ctx.strokeStyle = c;
	};
	//change line thickness
	this.thick = function(thick){
		thick = get_val(thick);
		ctx.lineWidth = thick;
	};
	//change transparency of line
	this.transparent = function(alpha){
		alpha = get_val(alpha);
		ctx.globalAlpha = alpha/100;
	};
	//stack position and settings
	this.remember = function(){
		ctx.save();
		stack.push(last);
	};
	//restore position and settings from stack
	this.goback = function(){
		ctx.restore();
		ctx.moveTo(0,0);
		last = stack[stack.length-1];
		stack.splice(stack.length-1,1);
	};
	//face turtle towards specified angle (absolute no relative)
	this.point = function(deg){
		deg = get_val(deg);
		var g = total_rot%360;
		this.right(deg-g);
		draw_turtle();
	};
	//store variable value
	this.let = function(name){
		var arr = [];
		for(var i in arguments)
		{
			if(i > 0)
			{
				arr.push(arguments[i]);
			}
		}
		var text;
		if(arr.length == 1 && vars[arr[0]])
		{
			text = vars[arr[0]];
		}
		else
		{
			text = arr.join(" ");
		}
		vars[name] = text;
	};
	//mark start of the loop
	this.repeat = function(it){
		it = get_val(it);
		cur_loop = loops.length;
		loops[cur_loop] = new Object();
		loops[cur_loop].iter = it;
		loops[cur_loop].arr = [];
		last.push("loop");
	};
	//end loop and execute all commands in loop
	this.next = function(){
		var loop = loops.splice(cur_loop,1);
		loop = loop[0];
		cur_loop--;
		var l = loop.arr.length;
		var it = loop.iter;
		//looping
		for(var i = 0; i < it; i++)
		{
			//executing all commands in loop
			for(var j = 0; j < l; j++)
			{
				this.exec(loop.arr[j].toString());
			}
		}
		last.pop();
	};
	//saving variable to stack (for recursion)
	this.push = function(stack, val){
		val = get_val(val);
		if(!var_stack[stack])
		{
			var_stack[stack] = [];
		}
		var_stack[stack].push(val);
	};
	//getting variable from stack (for recursion)
	this.pop = function(stack, name){
		if(!var_stack[stack])
		{
			vars[name] = var_stack[stack].pop();
		}
	};

	//execute function
	this.go = function(name){
		if(funcs[name])
		{
			var l = funcs[name].length;
			//executing function commands
			for(var i = 0; i < l; i++)
			{
				this.exec(funcs[name][i]);
			}
		}
	};
	//show turtle for debugging
	this.showturtle = function(){
		turtle = true;
		draw_turtle();
	};
	//legacy to ending (actually drawing) - we are drawing realtime
	this.end = function(){
		turtle = true;
		draw_turtle();
	};
	//hide turtle
	this.hideturtle = function(){
		turtle = false;
	};
	//draw curves
	//curve to left
	this.goleft = function(units, offset){
		units = get_val(units);
		offset = get_val(offset);
		ctx.quadraticCurveTo(0,units,units,offset);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(units, offset);
		ctx.translate(units, offset);
		var angle1 = Math.atan2(units, 0);
		var angle2 = Math.atan2(offset-units, units);
		var angle = Math.abs(angle1-angle2);
		total_rot -= parseInt((angle*180/Math.PI));
		ctx.rotate(-angle);
		draw_turtle();
	};
	//curve to right
	this.goright = function(units, offset){
		units = get_val(units);
		offset = get_val(offset);
		ctx.quadraticCurveTo(0,units,-units,offset);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(-units, offset);
		ctx.translate(-units, offset);
		var angle1 = Math.atan2(units, 0);
		var angle2 = Math.atan2(offset-units, units);
		var angle = Math.abs(angle1-angle2);
		total_rot += parseInt(angle*180/Math.PI);
		ctx.rotate(angle);
		draw_turtle();
	};
	//print upright word from position of turtle
	//without moving the turtle
	this.print = function(){
		var arr = [];
		for(var i in arguments)
		{
			arr.push(arguments[i]);
		}
		if(arr.length == 1 && vars[arr[0]])
		{
			var text = vars[arr[0]];
		}
		else
		{
			var text = arr.join(" ");
		}
		var g = total_rot%360;
		this.point(180);
		ctx.fillText(text, 0, 0);
		this.point(g);
	};
	//print words as path to direction of turtle
	//and move turtle
	this.turtleprint = function(){
		var arr = [];
		for(var i in arguments)
		{
			arr.push(arguments[i]);
		}
		var text;
		if(arr.length == 1 && vars[arr[0]])
		{
			text = vars[arr[0]];
		}
		else
		{
			text = arr.join(" ");
		}
		var units = ctx.measureText(text).width;
		this.right(90);
		ctx.textBaseline = "middle";
		ctx.fillText(text, 0, 0);
		ctx.textBaseline = "alphabetic";
		this.left(90);
		this.move(units);
	};
	//change font and size
	this.font = function(){
		var arr = [];
		for(var i in arguments)
		{
			arr.push(arguments[i]);
		}
		var text = arr.join(" ");
		ctx.font = text;
	};
	//get input from user,
	//varname - variable name where to store value
	//id - id of input element, where to get value
	//if none, then will prompt form user
	this.get = function(varname, id){
		var val;
		if(typeof id == "string" && document.getElementById(id))
		{
			val = document.getElementById(id).value;
		}
		else
		{
			val = prompt("Enter value");
		}
		this.let(varname, val);
	};
	//preprocess value
	//change datatype if needed
	//or retrieve value from variable
	var get_val = function(val){
		if(isNumber(val))
		{
			return parseFloat(val);
		}
		else if(vars[val])
		{
			return vars[val];
		}
		else
		{
			var x = 0;
			try{
				//evaluate mathematical expressions
				eval("x = parseFloat(" + val + ");");
			}
			catch(e){
				//there might be variable names inside expresions
				var arr = val.split(/[\*\+\-\/%\(\)]+/);
				var l = arr.length;
				var new_val = "";
				for(var i = 0; i < l; i++)
				{
					if(arr[i].length > 0)
					{
						var temp = val.slice(0, val.indexOf(arr[i]) + arr[i].length);
						new_val += temp.replace(arr[i], "get_val('" + arr[i] + "')");
						val = val.slice(val.indexOf(arr[i]) + arr[i].length);
					}
				}
				try{
					//evaluate mathematical expressions
					eval("x = parseFloat(" + new_val + ");");
				}
				catch(e){
					x = 0;
				};
			};
			return x
		}
	};
	//check if value is numeric
	var isNumber = function(num){
		return !isNaN(parseFloat(num)) && isFinite(num);
	};
	//trim string
	var trim = function(str){
		return str.replace(/^\s+|\s+$/g,"");
	};
	//draw turtle
	var draw_turtle = function(){
		if(turtle)
		{
			var img = new Image();
			img.src = ob.conf.turtle;
			img.onload = function(){
				ctx.drawImage(img, -Math.round(img.width/2), -Math.round(img.height/2));
			}
		}
	};
	//call constructor
	this.construct();
};
