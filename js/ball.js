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
		if (this.currentpos[1]>(600-this.radius)){
			return 1;
		}

		var sides_inside = 0;
		var compensation = 10; 

		if (otherplayer[0] < 600){ // penguin on the left
			// left border (no compensation)
			if (currentpos[0]-radius >= otherplayer[0] || currentpos[0]+radius >= otherplayer[0]){
				sides_inside += 1;
			} 
			// right border (compensation)
			if (currentpos[0]-radius <= otherplayer[0]-compensation || currentpos[0]+radius <= otherplayer[0]-compensation){
				sides_inside += 1;
			}
		}else{ // penguin on the right
			// left border (compensation)
			if (currentpos[0]-radius >= otherplayer[0]-compensation || currentpos[0]+radius >= otherplayer[0]-compensation){
				sides_inside += 1;
			} //x
			// right border (no compensation)
			if (currentpos[0]-radius <= otherplayer[0] || currentpos[0]+radius <= otherplayer[0]){
				sides_inside += 1;
			}
		}
		
		// top border (no compensation)
		if (currentpos[1]+radius >= otherplayer[1]){
			sides_inside += 1;
		}

		// if we are touching more than 3 sides at once
		if (sides_inside == 3){
			return 2;
		}else{
			return 0;
		}
	}
	this.draw = function(p){
		p.beginPath();
		p.arc(currentpos[0],currentpos[1],radius,0,2*Math.PI);
		//p.arc(0,0,radius,0,2*Math.PI);
		p.stroke();
	}

}