var Game = function (name) {
	this.canvas = document.getElementById(name);
	this.pen = canvas.getContext("2d");
	//this.image = new Image();
	this.image = document.getElementById("scream");
	this.draw = function(){
		
		console.log(this.image);

		this.pen.drawImage(this.image, 250,250,30,30);
		this.pen.moveTo(0,10);
		this.pen.lineTo(canvas.width,10);
		this.pen.stroke();
	}


}