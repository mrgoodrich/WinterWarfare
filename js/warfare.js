var drawingbuffer = 0;
var buffers = []; 
var pen;
var mousepos = [0,0];
var arrowpos1 = [40,550];
var arrowpos2 = [1120,550];
var penguin1 = [10,550];
var penguin2 = [1150,550];
var penboxsize = 50;

var init = function(canvasID){
	canvas1 = document.getElementById("canvas");
  canvas2 = document.createElement("canvas");
  canvas2.width = 1200;
  canvas2.height = 600;
  buffers.push(canvas1);
  buffers.push(canvas2);
}

var drawPenguins = function(){
	var pen1 = new Image();
	var pen2 = new Image();
	pen1.src = 'PenguinBody.png';
	pen2.src = 'PenguinBody.png';
	pen1.onload = function(){
    	pen.save();
    	pen.scale(-1,1);
    	pen.drawImage(pen2,-penguin2[0],penguin2[1],penboxsize,penboxsize);
    	pen.restore();
  	}
	pen2.onload = function(){
    pen.drawImage(pen1, penguin1[0], penguin1[1],penboxsize,penboxsize);
	}
}

var drawArrow = function(arrowpos, mousepos){
  var length = Math.sqrt((arrowpos[1]-mousepos[1])*(arrowpos[1]-mousepos[1])+(arrowpos[0]-mousepos[0])*(arrowpos[0]-mousepos[0]));
  var angle = Math.atan((mousepos[1]-arrowpos[1])/(mousepos[0]-arrowpos[0]));
  if (mousepos[0] < arrowpos[0]){
    angle = -(Math.PI - angle);
  }
  base_image = new Image();
  base_image.src = 'arrow.png';
  base_image.onload = function(){
    pen.save(); 
    pen.translate(arrowpos[0], arrowpos[1]); 
    pen.rotate(angle);
    pen.drawImage(base_image, 0, -15,10+length/5,30);
    pen.restore(); 
  }
}

function writeMessage(message) {
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

var run = function(){
  pen= buffers[drawingbuffer].getContext('2d'); // 0
  pen.clearRect(0, 0, canvas1.width, canvas1.height);
  writeMessage(mousepos);
  drawArrow(arrowpos1,mousepos);
  drawArrow(arrowpos2,mousepos);
  drawPenguins();

  //buffers[drawingbuffer].style.visibility='visible';
  //buffers[1-drawingbuffer].style.visibility='hidden';
  pen.drawImage(buffers[drawingbuffer],0,0);
  console.log("were about to print " + drawingbuffer);
  //console.log(buffers[drawingbuffer].style.visibility);

  drawingbuffer=1-drawingbuffer;



}

