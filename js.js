
var score = 0, gscore = 0, ghost=false;
var player = {
	x:50,
	y:100,
	pacmouth:320,
	pacdir:0,
	psize:32,
	speed:5
}

var enemy = {
	x:150,
	y:200,
	speed:5,
	moving: 0,
	dirx:0,
	diry:0
}

var canvas = document.createElement("canvas");
var context =canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

mainImage =  new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pac.png";

var keyclick = {};
document.addEventListener("keydown", function(event){
	keyclick[event.keyCode]=true;
	move(keyclick);
	//console.log(keyclick);
}, false);
document.addEventListener("keyup", function(event){
	delete keyclick[event.keyCode];
}, false);

function move(keyclick) {
	if (37 in keyclick) {
		player.x -= player.speed;
		player.pacdir=64;
	}
	if (38 in keyclick) {
		player.y -= player.speed;
		player.pacdir=96;
	}
	if (39 in keyclick) {
		player.x += player.speed;
		player.pacdir=0;
	}
	if (40 in keyclick) {
		player.y += player.speed;
		player.pacdir=32;
	}
	//limits
	if(player.x >= (canvas.width-player.psize)){   
		player.x=0;
	}
	if(player.y >= (canvas.height-player.psize)){
		player.y=0;
	}
	if(player.x < (0)){   //limit
		player.x=canvas.width -player.psize;
	}
	if(player.y < (0)){
		player.y=canvas.height -player.psize;
	}
	// mouth move
	if(player.pacmouth == 320){
		player.pacmouth = 352;
	}else{
		player.pacmouth = 320;
	}
	render();
}
function checkReady() {
	this.ready = true;
	playgame();
}

function playgame() {
	render();
	requestAnimationFrame(playgame);
}

function myNum(n) {
	return Math.floor(Math.random()*n);
}

function render() {
	// background
	context.fillStyle = "black";
	context.fillRect(0,0,canvas.width,canvas.height);

	// create enemy render
	if(!ghost){
		enemy.ghostNum = myNum(5)*64;  // pick one of five ghost in .png
		enemy.x = myNum(450);			// random initial position
		enemy.y = myNum(250);
		ghost = true;
	}

	if(enemy.moving <0){
		enemy.moving = (myNum(30)*3)+10 +myNum(1);  // random number
		//console.log(enemy.moving);
		enemy.speed = myNum(5);
		enemy.dirx = 0;
		enemy.diry = 0;
		if(enemy.moving % 2){				// 50% chances 
			if (player.x < enemy.x) {
				enemy.dirx = -enemy.speed;
			}else{
				enemy.dirx =  enemy.speed;
			}
		}else{
			if (player.y < enemy.y) {
				enemy.diry = -enemy.speed;
			}else{
				enemy.diry =  enemy.speed;
			}
		}
	}
	enemy.moving--;
	enemy.x = enemy.x + enemy.dirx;
	enemy.y = enemy.y + enemy.diry;

	// text over screen
	context.font = "20px Verdana";
	context.fillStyle = "white";
	context.fillText("Pacman: "+score+" vs Ghost:"+gscore,2,18);

	// animations
	context.drawImage(mainImage,enemy.ghostNum,0,32,32,enemy.x,enemy.y,32,32);  
	context.drawImage(mainImage,player.pacmouth,player.pacdir,32,32,player.x,player.y,player.psize,player.psize); 


}



