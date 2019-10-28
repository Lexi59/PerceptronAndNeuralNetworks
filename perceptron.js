let p,pts;

function f(x){
	return -.6*x + .2;
}

class Perceptron{
	constructor(n){
		this.learningRate = 0.01;
		this.weights = new Array();
		for(var i = 0; i < n; i++){
			this.weights.push(random(-1,1));
		}
	}

	activation(n){
		if(n >= 0){return 1;}
		else{return -1;}
	}

	guess(inputs){
		var sum = 0;
		for(var i = 0; i < this.weights.length; i++){
			sum += inputs[i]*this.weights[i];
		}
		return this.activation(sum);
	}

	train(inputs, target){
		var error = target - this.guess(inputs);
		for(var i = 0; i < this.weights.length; i++){
			this.weights[i] += error * inputs[i] * this.learningRate;
		}
	}

}

class Point{
	constructor(){
		this.x = random(-1,1);
		this.y = random(-1,1);
		this.bias = 1;
		if(this.y > f(this.x)){
			this.target = 1;
			this.color = 'red';
		}
		else{
			this.target = -1;
			this.color = 'blue';
		}
	}
}

function setup(){
	createCanvas(500,500);
	frameRate(2);
	p = new Perceptron(3);
	pts = new Array();
	for(var i =0; i< 100; i++){
		pts.push(new Point());
	}
}

function draw(){
	clear();

	//draw real line in black
	stroke(0);
	line(0,map(f(-1),-1,1,height,0),width,map(f(1),-1,1,height,0));

	//see how accurate we are
	for(var i = 0; i < pts.length; i++){
		fill(pts[i].color);
		ellipse(map(pts[i].x,-1,1,0,width),map(pts[i].y,-1,1,height,0), 10, 10);
		if(p.guess([pts[i].x,pts[i].y, pts[i].bias]) == pts[i].target){
			fill(0,255,0);
		}else{ fill(255,0,0)}
		//ellipse(map(pts[i].x,-10,10,0,width),map(pts[i].y,-10,10,height,0), 10, 10);
	}

	//train
	for(var i = 0; i < pts.length; i++){
		p.train([pts[i].x, pts[i].y, pts[i].bias], pts[i].target);
	}

	//draw what we think is the line in blue
	stroke(0,0,255);
	var x1 = -1;
	var x2 = 1;
	var y1 = -(p.weights[2]/p.weights[1]) - (p.weights[0]/p.weights[1])*x1;
	var y2 = -(p.weights[2]/p.weights[1]) - (p.weights[0]/p.weights[1])*x2;
	line(0,map(y1,-1,1,height,0),width,map(y2,-1,1,height,0));
}
