var canvas;
var screenH;
var screenW;
var drawArea;
var tid;
var delay = 1000;
var baseColor = "rgb(71, 168, 153)";
var greyColor = "rgb(211, 211, 211)";
var rgb = baseColor;

let resizeReset = function() {
	w = canvas.width = window.innerWidth - 100;
	h = canvas.height = window.innerHeight - 100;
}

const title = {
	main: "Hey, I'm Olya",
	secondary: "Enthusiastic Software Engineer, traveler, positive human being :)", 
	fontPlaceholder: "px Indie Flower",
	fontSizeMain: 65,
	fontSizeSecondary: 30
};

const opts = { 
	particleColor: baseColor,
	lineColor: baseColor,
	particleAmount: 50,
	defaultSpeed: 0.1,
	variantSpeed: 0.05,
	defaultRadius: 3,
	variantRadius: 4,
	linkRadius: 185,
};

window.addEventListener("resize", function(){
	deBouncer();
});

let deBouncer = function() {
    clearTimeout(tid);
    tid = setTimeout(function() {
        resizeReset();
    }, delay);
};

let checkDistance = function(x1, y1, x2, y2){ 
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1, hubs){ 
	for (let i = 0; i < hubs.length; i++) {
		let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
		let opacity = 1 - distance / opts.linkRadius;
		if (opacity > 0) { 
			drawArea.lineWidth = 0.2;
			drawArea.strokeStyle = i % 2 == 0 ? baseColor : greyColor;
			drawArea.beginPath();
			drawArea.moveTo(point1.x, point1.y);
			drawArea.lineTo(hubs[i].x, hubs[i].y);
			drawArea.closePath();
			drawArea.stroke();
		}
	}
}

Particle = function(xPos, yPos){ 
	this.x = Math.random() * w; 
	this.y = Math.random() * h;
	this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
	this.directionAngle = Math.floor(Math.random() * 360); 
	this.color = opts.particleColor;
	this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
	this.vector = {
		x: Math.cos(this.directionAngle) * this.speed,
		y: Math.sin(this.directionAngle) * this.speed
	};
	this.update = function(){ 
		this.border(); 
		this.x += this.vector.x; 
		this.y += this.vector.y; 
	};
	this.border = function(){ 
		if (this.x >= w || this.x <= 0) { 
			this.vector.x *= -1;
		}
		if (this.y >= h || this.y <= 0) {
			this.vector.y *= -1;
		}
		if (this.x > w) this.x = w;
		if (this.y > h) this.y = h;
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;	
	};
	this.draw = function(){ 
		drawArea.beginPath();
		drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		drawArea.closePath();
		drawArea.fillStyle = this.color;
		drawArea.fill();
	};
};

function setup(){ 
	particles = [];
	resizeReset();
	for (let i = 0; i < opts.particleAmount; i++){
		particles.push( new Particle() );
	}
	window.requestAnimationFrame(loop);
}

function loop(){ 
	window.requestAnimationFrame(loop);
	drawArea.clearRect(0,0,w,h);
	for (let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].draw();
	}
	for (let i = 0; i < particles.length; i++){
		linkPoints(particles[i], particles);
	}
	
	renderTitle();
}

function renderTitle() {
	drawArea.save();
	
	drawArea.shadowColor = greyColor;
	drawArea.shadowOffsetX = 5; 
	drawArea.shadowOffsetY = 5; 
	drawArea.shadowBlur = 7;
	
	drawArea.font = title.fontSizeMain + title.fontPlaceholder;
	drawArea.fillStyle = baseColor;
	drawArea.fillText(title.main, screenW/2 - 150, screenH/2 - 50);

	drawArea.font = title.fontSizeSecondary + title.fontPlaceholder;
	drawArea.fillText(title.secondary, screenW/2 - 350, screenH/2 + 50);
	
	drawArea.restore();
}

var drawCanvas = function() {
	// Calculate the screen size
	screenH = $(window).height() - 100;
	screenW = $(window).width() - 100;

	// Get the canvas
	canvas = $('#space');

	// Fill out the canvas
	canvas.attr('height', screenH);
	canvas.attr('width', screenW);
	
	drawArea = canvas[0].getContext('2d');
	rgb = opts.lineColor.match(/\d+/g);
	resizeReset();
	setup();
}
