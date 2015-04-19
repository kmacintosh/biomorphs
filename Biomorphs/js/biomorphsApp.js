var Biomorphs = Biomorphs || {};

Biomorphs.startApp = function() {
	console.log("Start App");
	Biomorphs.controls.init();
	Biomorphs.controls.newGameButton.onclick = newGame;
	Biomorphs.controls.canvas1.onclick = selectChild;
	Biomorphs.controls.canvas2.onclick = selectChild;
	Biomorphs.controls.canvas3.onclick = selectChild;
};


//########### MODEL ############

//Empty array to hold Biomorph Objects
var biomorphList = [];

//Hard limits for inheritance
var rMin = 5;
var rMax = 35;
var sMin = 3;
var sMax = 8;
var lMin = 1;
var lMax = 35;
var bMin = 8;
var bMax = 50;

//Biomorph Constructor
Biomorph = function(s, r, l, b) {
	this.sides = s;
	this.radius = r;
	this.armLength = l;
	this.minBranch = b; // Number of branch levels
	this.initialize = function () {	
		this.sides = randomInteger(sMin, sMax);
		this.radius = randomInteger(rMin, rMax);		
		this.armLength = randomInteger(lMin, lMax);
		this.minBranch = this.armLength / 2;
	};
	//Inheritance method
	this.offspring = function () {
		var cSides = this.sides;
		var cRadius = randomInteger(this.radius - 5, this.radius + 5);	
		if (cRadius > rMax) {
			cRadius = rMax;
		}
		if (cRadius < rMin) {
			cRadius = rMin;
		}
		var cArmLength = randomInteger(this.armLength - 5, this.armLength + 5);
		if (cArmLength > lMax) {
			cArmLength = lMax;
		}
		if (cArmLength < lMin) {
			cArmLength = lMin;
		}
		var cBranching = randomInteger(this.minBranch - 5, this.minBranch + 5);
		if (cBranching > bMax) {
			cBranching = bMax;
		}
		if (cBranching < bMin) {
			cBranching = bMin;
		}
		//var cColour = getRandomColor();

		return new Biomorph(cSides, cRadius, cArmLength, cBranching)
	};
}

var randomInteger = function(min, max) {
	return Math.floor((Math.random() * (max - min + 1)) + min);
} // Taken from http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range


// Generate a fresh game board
function newGame(){
	// Loop over canvases, clear each and draw random biomorph
	Biomorphs.view.clearCanvas();
	biomorphList = [null];
	for (var i = 1; i < 4; i++) {
		biomorphList.push(new Biomorph());
		biomorphList[i].initialize();

	}
	drawBiomorphs(biomorphList);
};

// Event handler for clicking Child canvases and moving 
// selected Biomorph object to Parent Canvas
function selectChild(event) {
    var canvasId = event.target.id;
    var selectedChild;
    if (canvasId === "childCanvas1") {
    	selectedChild = biomorphList[1];
    } else if (canvasId === "childCanvas2") {
    	selectedChild = biomorphList[2];
    } else if (canvasId === "childCanvas3") {
    	selectedChild = biomorphList[3];
    }
    biomorphList = []; // Empties Biomorph Array
    biomorphList.push(selectedChild); // Pushes selected Child into Parent canvas
    biomorphList.push(selectedChild.offspring()); // Generates random offspring and pushes into Biomorph Array
    biomorphList.push(selectedChild.offspring());
    biomorphList.push(selectedChild.offspring());
    drawBiomorphs(biomorphList);
}


function drawBiomorphs(biomorphs) {
		Biomorphs.view.clearCanvas();
		for (var i = 0; i < Biomorphs.view.canvases.length; i++) {
			if (biomorphs[i] !== null) {
				drawShape(biomorphs[i], Biomorphs.view.canvases[i]);
				drawArm(biomorphs[i], Biomorphs.view.canvases[i])
			}
		}
	}


function drawShape(b, c) {
	var x, y;
	var r = b.radius;
	var s = b.sides;
	var a = 2 * Math.PI / s;

	c.translate(75, 75); 
	c.beginPath();
	for (var i = 0; i <= s; i++) {
		x = r * Math.cos(i * a);
		y = r * Math.sin(i * a);	
		if (i === 0) {
			c.moveTo(x, y);		
		}
		else {									
			c.lineTo(x, y);					
		}
	}
	c.stroke();
	c.translate(-75, -75); 
}


function drawArm(b, c) {
	var x, y;
	var r = b.radius;
	var s = b.sides;
	var l = b.armLength;
	var minBr = b.minBranch;
	var a = 2 * Math.PI / s;
	
	c.translate(75, 75); 
	for (var i = 0; i <= s; i++) {
		x = r * Math.cos(i * a);
		y = r * Math.sin(i * a);

		drawBranches(x, y, i * a, l / 2, minBr, c);
	}
	c.translate(-75, -75);
}

function drawBranches(x, y, a, l, br, c) {
	var x2, y2;
	x2 = x + l * Math.cos(a);
	y2 = y + l * Math.sin(a);
	drawLine(x, y, x2, y2, c)
	if (l > br) {
		drawBranches(x2, y2, a + Math.PI / 7, l / 1.2, br, c);
		drawBranches(x2, y2, a - Math.PI / 7, l / 1.2, br, c);
	} //Adapted from Code maven, with a whole lot of help from Matthew Strimas-Mackey
}

function drawLine(x1, y1, x2, y2, c) {
	c.beginPath();
	c.moveTo(x1, y1);
	c.lineTo(x2, y2);
	c.stroke();
} // Taken from Code Maven, Lesson 212

// Credits to Joseph Fall for big concept ideas, and to Matthew Strimas-Mackey for 
// help with inheritance logic, and LOTS of help with branching algorithm (basically with anything Math-related)

window.onload = Biomorphs.startApp();



