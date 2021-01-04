var spaceshipimg1, spaceshipimg2, spaceshipimg3, spaceship, playbutton, background1, backgroundimg;
var countdownimg1, countdownimg2, countdownimg3, countdownimg0, countdown, starimg;
var gamestate = "menu", mySound, countdwn = 4, stararr = [], score = 0;

function preload(){
  spaceshipimg1 = loadImage("sprites/menu.png");
  spaceshipimg2 = loadImage("sprites/countdown.png");
  spaceshipimg3 = loadImage("sprites/final.jpg");
  countdownimg0 = loadImage("sprites/0.png");
  countdownimg1 = loadImage("sprites/1.png");
  countdownimg2 = loadImage("sprites/2.png");
  countdownimg3 = loadImage("sprites/3.png");
  starimg = loadImage("sprites/star.png")
  soundFormats('mp3', 'ogg');
  mySound = loadSound('sounds/start.mp3');
}

function setup() {
  createCanvas(displayWidth, displayHeight-110);

  playbutton = createSprite(738,200,100,40);
  playbutton.shapeColor = "white";

  spaceship = createSprite(748,displayHeight + 20,10,10);
  spaceship.setCollider("rectangle",0, -15, 50, 50, 0);
  spaceship.addImage(spaceshipimg1);

  countdown = createSprite(displayWidth/2-30, displayHeight/2-150, 1000, 500);
  countdown.shapeColor = "black";
  countdown.visible = false;
}

function draw() {
  background(0);
  
  drawSprites();

  if(frameCount === 1){
    createStars(180);
  }
  
  if(gamestate === "menu"){
    textSize(20);
    textFont("Geiorgia");
    fill("black");
    text("Play",723,205);
    spaceship.addImage(spaceshipimg1);
    if(mousePressedOver(playbutton)){
    gamestate="moving";
   }
  }

   else if(gamestate === "moving"){
    playbutton.destroy();
    spaceship.addImage(spaceshipimg2);
    moveStars(180, 1);
    if(spaceship.y < 633){
      gamestate = "countdown";
      playSound(mySound);
    }
    else {
      spaceship.y -= 1;
    }    
  }

  else if(gamestate === "countdown"){
    countdown.visible = true;
    moveStars(180, 1);
    if(countdwn >= 3){
      countdown.addImage(countdownimg3);
    }
    if(countdwn === 2){
      countdown.addImage(countdownimg2);
    }
    if(countdwn === 1){
      countdown.addImage(countdownimg1);
      countdown.scale = 0.5;
    }
    if(countdwn === 0){
      countdown.addImage(countdownimg0);
      countdown.scale = 1;
    }
    if(World.frameCount % 25 === 0){
      countdwn -= 1;
    }
    if(countdwn === -1){
      gamestate = "final";
      countdown.destroy();
    }
  }

  else if(gamestate === "final"){
    spaceship.addImage(spaceshipimg3);
    moveStars(180, 2);
    countScore();
  }
}

function playSound(name){
  name.play();
}

function createStars(number){
  for(var i = 0; i < number; i++){
    var x = random(0, displayWidth);
    var y = random(-20, displayHeight);
    var star = createSprite(x, y, 1, 1);
    star.addImage(starimg);
    star.scale = random(0.01, 0.1);
    star.depth = spaceship.depth - 1;
    stararr.push(star);
  }
}

function moveStars(number, velocity){
  for(var i = 0; i < number; i++){
    stararr[i].velocityY = velocity;
    if(stararr[i].y > displayWidth/2){
      stararr[i].y = random(-40,-10);
      stararr[i].x = random(0, displayWidth);
      stararr[i].scale = random(0.01, 0.1);
    }
  }
}

function countScore(){
  fill("white");
  textSize(20);
  textFont('Hanalei Fill');
  text("Score: " + Math.round(score), displayWidth - 120, spaceship.y-displayHeight/1.5);
  if(frameCount % 7.5 === 0){
    score += 1;
  }
}
