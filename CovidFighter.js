function init(){  // define objects that we will have in the game
game_end = false; 
win = false;
canvas = document.getElementById("mycanvas");
cntx = canvas.getContext('2d');
W = canvas.width;
H = canvas.height;
toxic = 0;
e1 = {
	x : 250,
	y : 250,
w : 80,
	h : 80,
	speed : 20,
	status : false
}
e2 = {
	x : 500,
	y : 300,
	w : 80,
	h : 80,
	speed : 15,
	status : false
}
e3 = {
	x : 950,
	y : 300,
	w : 80,
	h : 80,
	speed : 18,
	status : false
}
e4 = {
	x : 700,
	y : 200,
	w : 80,
	h : 80,
	speed : 25,
	status : false
}
e5 = {
	x : 1200,
	y : 100,
	w : 80,
	h : 80,
	speed : 14,
	status : false
}

enemy = [e1,e2,e3,e4, e5];


ninja ={
	x: 0,
	y: 350,
	w: 150, h:200, speed:10, moving:"false", direction:"up"
}

vaccine = {
	x:W-105,
	y: H/2+130,
	w: 80,
	h: 80

}


function event(e){
if (e.key == "ArrowRight"){
	ninja.direction = "right";
}else if (e.key == "ArrowLeft"){
	ninja.direction = "left";
}
moving = true;
if (e.key == "ArrowUp"){
	console.log("he");
	ninja.direction = "up";
}
}
document.addEventListener("keydown", event);
}


function collision(r1, r2){
if (r1.x+20< r2.x+r2.w && (r1.x+20)+r1.w>r2.x 
	&& r1.y < r2.y + r2.h && r1.y + r1.h>r2.y){
	return true;
}
return false;
}

function draw(){
 cntx.clearRect(0,0,W,H);
 cntx.fillStyle = ("brown");

 if (toxic>=0 && toxic<=15)
 {cntx.drawImage(ninjaimg, ninja.x, ninja.y, ninja.w, ninja.h);}
 else if (toxic>15 && toxic<=30)
 {cntx.drawImage(n2img, ninja.x, ninja.y, ninja.w, ninja.h); ninja.speed= 8;}
 else if (toxic>30 && toxic<=45)
 {cntx.drawImage(n3img, ninja.x, ninja.y, ninja.w, ninja.h); ninja.speed= 6;}
 else if (toxic>45 && toxic<60)
 {cntx.drawImage(n4img, ninja.x, ninja.y, ninja.w, ninja.h);ninja.speed= 5;}
else{
cntx.drawImage(n5img, ninja.x, ninja.y, ninja.w, ninja.h)
}


 cntx.drawImage(vaccineimg, vaccine.x, vaccine.y, vaccine.w, vaccine.h);
 cntx.drawImage(trophyimg, 0,10, 100,80);
 for(let i=0;i<enemy.length;i++){
 	cntx.drawImage(virusimg,enemy[i].x,enemy[i].y,enemy[i].w, enemy[i].h);
 };

}


function get_images(){  // ninja, virus, vaccine, toxicity
ninjaimg = new Image();
ninjaimg.src = "ninja.png"
virusimg = new Image();
virusimg.src = "v1.png";
vaccineimg = new Image();
vaccineimg.src = "vaccine.png";
trophyimg = new Image();
trophyimg.src = "toxic.png";
n2img = new Image();
n2img.src = "v2.png";
n3img = new Image();
n3img.src = "v3.png";
n4img = new Image();
n4img.src = "v4.png";
n5img = new Image();
n5img.src = "v5.png";
}

function enemycollision(f,e){

if (((f.x+f.w < e.x+e.w) && (f.x+f.w>e.x))&& ((f.y+f.h> e.h) && (f.y+f.h< e.h+e.y))){
	return true;
}
return false;
}
function enemycollision(f,e){

if (((f.x < e.x+e.w) && (f.x+f.w>e.x+e.w))&& ((f.y< e.h+e.y) && (f.y+f.h> e.h+e.y))){
	return true;
}
return false;
}
function update(){
// move the box downwards
		if (toxic>=60){
			game_end = true;
			win = false;
		}

	if (collision(vaccine, ninja)){
		game_end = true;
		win = true;
	}
		cntx.fillStyle = "red"
	for(let i =1 ; i<= toxic/10;i++){
		cntx.fillRect(i*10, 95, 25,20);
	}
cntx.fillStyle = "black";
cntx.font = "30px Roboto";
	for (let i =0; i<enemy.length;i++){
		if (enemycollision(ninja,enemy[i])){
			toxic++;
			console.log(toxic);
		}
		
	}


	if (ninja.direction == "right"){
		ninja.x += ninja.speed;
	}else if (ninja.direction == "left"){
		ninja.x -= ninja.speed;
	}else{
		ninja.x +=0;
	}

for (let i =0 ; i<enemy.length;i++){
	enemy[i].y += enemy[i].speed;
	if (enemy[i].y>=H-enemy[i].w-150 || enemy[i].y<0 ){
	enemy[i].speed *=-1;
}
}

}

function gameloop(){
	if (game_end){
		clearInterval(f);
		if (win){
			alert("Congratulations! You won the game.")
		}else
		{alert("Game Over.");}
	}
draw();
update();

}

get_images();
init();
var f = setInterval(gameloop,100);