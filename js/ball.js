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
		
		if(this.currentpos[1]>600-this.radius){
			return true;
		}
		if(this.currentpos[0]>this.otherplayer[0]&&this.currentpos[0]<this.otherplayer[0]+50){
			if(this.currentpos[1]>this.otherplayer[1]-50){
				console.log('hit');
				return true;
			}
		}
		return false;
	}
	this.draw = function(p){
		p.beginPath();
		p.arc(currentpos[0],currentpos[1],radius,0,2*Math.PI);
		p.stroke();
	}

}