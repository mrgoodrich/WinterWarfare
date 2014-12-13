var drawingbuffer = 0;
var buffers = []; 
var pen;
var mousepos = [0,0];
var arrowpos1 = [40,550];
var arrowpoint1 = [arrowpos1[0],arrowpos1[1]-15];
var arrowpos2 = [1120,550];
var arrowpoint2 = [arrowpos2[0],arrowpos2[1]-15];
var penguin1 = [10,550];
var penguin2 = [1150,550];
var penboxsize = 50;
var penguimg1 = new Image();
var penguimg2 = new Image();
var arroimg = new Image();
var state = 0;
var mouseDown = 0;

var init = function(canvasID){
	canvas1 = document.getElementById("canvas");
  canvas2 = document.createElement("canvas");
  canvas2.width = 1200;
  canvas2.height = 600;
  buffers.push(canvas1);
  buffers.push(canvas2);
  penguimg1.src = 'PenguinBody.png';
  penguimg2.src = 'PenguinBody.png';
  arroimg.src = 'arrow.png';
}

var drawPenguins = function(){
  	pen.save();
  	pen.scale(-1,1);
  	pen.drawImage(penguimg2,-penguin2[0],penguin2[1],penboxsize,penboxsize);
  	pen.restore();
    pen.drawImage(penguimg1, penguin1[0], penguin1[1],penboxsize,penboxsize);
}

var drawArrow = function(arrowpos, mousepos){
  var length = Math.sqrt((arrowpos[1]-mousepos[1])*(arrowpos[1]-mousepos[1])+(arrowpos[0]-mousepos[0])*(arrowpos[0]-mousepos[0]));
  var angle = Math.atan((mousepos[1]-arrowpos[1])/(mousepos[0]-arrowpos[0]));
  if (mousepos[0] < arrowpos[0]){
    angle = -(Math.PI - angle);
  }
  pen.save(); 
  pen.translate(arrowpos[0], arrowpos[1]); 
  pen.rotate(angle);
  pen.drawImage(arroimg, 0, -15,10+length/5,30);
  pen.restore(); 
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
var b;
var run = function(){
  draw();
  if (state == 0){
    drawArrow(arrowpos1,mousepos);
    if (mouseDown > 0){
      state = 1
      velocity = [(mousepos[0]-arrowpoint1[0])/100, (arrowpoint1[1]-mousepos[1])/100];
      b = new Ball(0,[arrowpoint1[0],arrowpoint1[1]],15,penguin2,velocity);
    }
  }else if (state == 1){
    b.step();
    b.draw(pen);
    if (b.touching()){
      state = 2;
    }
  }else if (state == 2){
    drawArrow(arrowpos2,mousepos);
    if (mouseDown > 0){
      state = 3;
      velocity = [(mousepos[0]-arrowpoint2[0])/100, (arrowpoint2[1]-mousepos[1])/100];
      b = new Ball(0,[arrowpoint2[0],arrowpoint2[1]],15,penguin1,velocity);
    }
  }else if (state == 3){
    b.step();
    b.draw(pen);
    if (b.touching()){
      state = 0;
    }
  }else{
    console.out("this should not be reached");
  }
  drawPenguins();
  swap();
}
var draw = function(){
  pen= buffers[drawingbuffer].getContext('2d'); // 0
  pen.clearRect(0, 0, canvas1.width, canvas1.height);
  writeMessage(mousepos);
}
var swap = function(){
  pen.drawImage(buffers[drawingbuffer],0,0);
  drawingbuffer=1-drawingbuffer;
}

