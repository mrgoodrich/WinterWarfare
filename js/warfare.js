var canvas;
var pen;
var image;
var mousepos = [0,500];
var init = function(canvasID){
	canvas = document.getElementById(canvasID);
	pen = canvas.getContext("2d");
	image = document.getElementById("scream");
}

var drawPenguins = function(){
	console.log("drawing");
	var pen1 = new Image();
	var pen2 = new Image();
	pen1.src = 'PenguinBody.png';
	pen2.src = 'PenguinBody.png';
	pen1.onload = function(){
    	pen.save();
    	pen.scale(-1,1);
    	pen.drawImage(pen2, 550, 600,50,50);
    	pen.restore();

  	}
  	pen2.onload = function(){
		pen.drawImage(pen1, 0, 600,50,50);

  	}
}

function drawRotatedImage(image, x, y, angle){ 
    pen.save(); 
    pen.translate(x, y); 
    pen.rotate(angle);
    pen.drawImage(image, 0, 0,70,30);
    pen.restore(); 
    //pen.drawImage(image,250,250,50,50);
}


var drawArrow = function(mousepos){
  base_image = new Image();
  base_image.src = 'arrow.png';
  base_image.onload = function(){
    drawRotatedImage(base_image, 0, 550, Math.atan((mousepos[1]-500)/mousepos[0]));
  }
}

function writeMessage(message) {
	pen.clearRect(0, 0, canvas.width, canvas.height);
	pen.font = '18pt Calibri';
	pen.fillStyle = 'black';
	pen.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};

}
