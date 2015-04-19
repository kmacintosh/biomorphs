//########### CONTROLLER ############


var Biomorphs = Biomorphs || {};

Biomorphs.controls = {
	canvas0 : {onclick: undefined},
	newGameButton : {onclick: undefined},
	canvas1 : {onclick: undefined},
	canvas2 : {onclick: undefined},
	canvas3 : {onclick: undefined},
};

// Canvases as buttons
Biomorphs.controls.init = function() {
	this.newGameButton = document.getElementById('newgame-button');
	this.canvas0 = document.getElementById('parentCanvas');
	this.canvas1 = document.getElementById('childCanvas1');
	this.canvas2 = document.getElementById('childCanvas2');
	this.canvas3 = document.getElementById('childCanvas3');
};


//########### VIEW ############

Biomorphs.view = {
	//Canvases for display
	canvases : [
		document.querySelector("#parentCanvas").getContext("2d"),
		document.querySelector("#childCanvas1").getContext("2d"),
		document.querySelector("#childCanvas2").getContext("2d"),
		document.querySelector("#childCanvas3").getContext("2d")
		],
	clearCanvas : function() {
		for (var i = 0; i < this.canvases.length; i++) {
			this.canvases[i].clearRect (-10000 , -10000 , 20000, 20000);	
		}
	},
}


