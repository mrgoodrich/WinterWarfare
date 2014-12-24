var Ball = function(wind, currentpos, radius, otherplayer, velocity){ // we know the enemy is 50x50
	this.wind = wind;
	this.otherplayer = otherplayer;
	this.radius = radius; 
	this.currentpos = currentpos;
	this.velocity = velocity; // vector

	this.step = function(){
		this.velocity[1] -= .05; // gravity;
		this.currentpos[0] += this.velocity[0];
		this.currentpos[1] -= this.velocity[1];
	}
	this.touching = function(){
		if (this.currentpos[1]>600-this.radius){
			return 1;
		}
		if (velocity > 1){  //See which way ball is moving for collision detection with respect to radius
			if (this.currentpos[0]+this.radius>this.otherplayer[0]&&this.currentpos[0]-this.radius<this.otherplayer[0]+30){  //redo with draw respect to center of obj
				if(this.currentpos[1]+this.radius>this.otherplayer[1]+20	){
					return 2;
				}
			}
		}
		else{
			if (this.currentpos[0]<this.otherplayer[0]+	50&&this.currentpos[0]>this.otherplayer[0]){
				if(this.currentpos[1]+this.radius>this.otherplayer[1]-50){
					return 2;
				}
			}
		}
		return 0;
	}
	this.draw = function(p){
		p.beginPath();
		p.arc(currentpos[0],currentpos[1],radius,0,2*Math.PI);
		p.stroke();
	}

}