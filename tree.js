var degrees = [];
var depth = 3;   
var breadth = 3; 
var angle = 0;
var len = 0;

var canvas = document.getElementById("mycanvas");
canvas.width = Math.floor(window.innerWidth * .99);
canvas.height = Math.floor(window.innerHeight * .99) - $(".change").height();

var ctx = canvas.getContext("2d");
if(canvas.width > canvas.height) {
	len = canvas.height/depth/1.2;
}
else {
	len = canvas.width/depth/1.2;
}
getAngles(depth);
ctx.strokeStyle = "#333";
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawTree(depth, canvas.width/2, canvas.height/2, len, 0);

function drawTree(depth, x, y, l, deg){
    if(depth > 0 ){
		for(var i = 0; i < degrees.length; i++){
		    var rad = (deg+degrees[i]) * (Math.PI/180);
		    var dx = Math.sin(rad)*l;
		    var dy = Math.cos(rad)*l;
		    ctx.beginPath();
		    ctx.moveTo(x, y);
		    ctx.lineTo(x+dx, y-dy);
		    ctx.stroke();
		    drawTree(depth-1, x+dx, y-dy, l*.85	, deg+degrees[i]);
		}
    }
}

function getAngles(breadth) {
	angle = 360 / breadth;
	degrees = [];
	for(var i = 0; i < breadth;++i) {
		degrees.push(i*angle);
	}
	return degrees;
}

function addToDepth(n) {
	var newDepth = depth + n;
	if(newDepth >=3 && newDepth <=7) {
		depth = newDepth;
		console.log("depth changed to: "+depth);
		if(canvas.width > canvas.height) {
			len = canvas.height/depth/1.5;
		}
		else {
			len = canvas.width/depth/1.5;
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTree(depth, canvas.width/2, canvas.height/2, len, 0);
}

function addToBreadth(n) {
	var newBreadth = breadth + n;
	if(newBreadth >=3 && newBreadth <15) {
		breadth = newBreadth;
		degrees = getAngles(breadth);
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTree(depth, canvas.width/2, canvas.height/2, len, 0);
}