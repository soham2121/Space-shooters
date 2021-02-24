var spaceshipimg1, spaceshipimg2, spaceshipimg3, spaceship, playbutton, background1, backgroundimg, pausebutton;
var countdownimg1, countdownimg2, countdownimg3, countdownimg0, countdown, starimg, pauseimg, playimg;
var gamestate = "menu", mySound, countdwn = 4, stararr = [], score = 0, incspd = 0, canmove, pauseState = false, canClickPause = true;

function preload(){
  spaceshipimg1 = loadImage("sprites/menu.png");
  spaceshipimg2 = loadImage("sprites/countdown.png");
  spaceshipimg3 = loadImage("sprites/final.png");
  countdownimg0 = loadImage("sprites/0.png");
  countdownimg1 = loadImage("sprites/1.png");
  countdownimg2 = loadImage("sprites/2.png");
  countdownimg3 = loadImage("sprites/3.png");
  starimg = loadImage("sprites/star.png");
  pauseimg = loadImage("sprites/pause.png");
  playimg = loadImage("sprites/play.png");
  soundFormats('mp3', 'ogg');
  mySound = loadSound('sounds/start.mp3');
}

function setup() {
  createCanvas(displayWidth, displayHeight-110);

  playbutton = createSprite(displayWidth/2,200,100,40);
  playbutton.shapeColor = "white";

  spaceship = createSprite(displayWidth/2,displayHeight + 20,10,10);
  spaceship.setCollider("rectangle",0, -15, 50, 50, 0);
  spaceship.addImage(spaceshipimg1);

  countdown = createSprite(displayWidth/2, displayHeight/2-150, 1000, 500);
  countdown.shapeColor = "black";
  countdown.visible = false;

  pausebutton = createSprite(50, 50, 20, 20);
  pausebutton.addImage(pauseimg);
  pausebutton.visible = false;

  createStars(180);
}

function draw() {
  background(0);
  
  drawSprites();
  
  if(gamestate === "menu"){
    incspd = 0;
    textSize(20);
    textFont("Geiorgia");
    fill("black");
    text("Play",playbutton.x-(textWidth("Play")/2),playbutton.y+5);
    spaceship.addImage(spaceshipimg1);
    if(mousePressedOver(playbutton)){
      gamestate="moving";
      incspd = 0.5;
    }
  }

   else if(gamestate === "moving"){
    playbutton.destroy();
    spaceship.addImage(spaceshipimg2);
    moveStars(180);
    if(spaceship.y < displayHeight-displayHeight/3){
      gamestate = "countdown";
      playSound(mySound);
    }
    else {
      spaceship.y -= 1;
    }    
  }

  else if(gamestate === "countdown"){
    countdown.visible = true;
    moveStars(180);
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
      mouseX = spaceship.x;
      mouseY = spaceship.y;
    }
  }

  else if(gamestate === "final"){
    incspd = 2;
    spaceship.addImage(spaceshipimg3);
    moveStars(180);
    countScore();
    movePlayer();
    pauseAndPlay();
  }
}

function playSound(name){
  name.play();
}

function createStars(number){
  for(var i = 0; i < number; i++){
    var x = random(0, displayWidth);
    var y = random(-20, displayHeight);
    var star = createSprite(x, y, 10, 10);
    star.addImage(starimg);
    star.scale = random(0.01, 0.125);
    star.depth = spaceship.depth - 1;
    // var tintcolor = Math.round(random(1,3));
    //   switch(tintcolor){
    //     case 1:
    //       fill("rgba(0,0,255,255)");
    //       console.log("blue")  
    //       break;
    //     case 2:
    //       fill("rgba(200,0,0,255)");
    //       console.log("red")
    //       break;
    //     case 3:
    //       var red = Math.round(random(200,255));
    //       var green = Math.round(random(200,255));
    //       tint(red,green,0,255);
    //       break;
    //     default:
    //       star.tint = "rgba(255,255,255,255)";
    //       star.addImage(starimg);
    //   }
    stararr.push(star);
  }
}

function moveStars(number){
  if(pauseState === false){
    for(var i = 0; i < number; i++){
      stararr[i].velocityY = 1*incspd;
      if(stararr[i].y > displayWidth/2){
        stararr[i].y = random(-40,-10);
        stararr[i].x = random(0, displayWidth);
        stararr[i].scale = random(0.01, 0.1);
      }
    }
  }
  else{
    for(var i = 0; i < number; i++){
      stararr[i].velocityY = 0;
    }
  }
}

function countScore(){
  fill("white");
  textSize(20);
  textFont('Hanalei Fill');
  text("Score: " + Math.round(score), displayWidth - 120, 100);
  if(pauseState === false){
    if(frameCount % 30 === 0){
      score ++;
    }
  }
  else{
    score += 0;
  }
}

function movePlayer(){
  if(mouseY > displayHeight/2){
    spaceship.x = mouseX;
    if(spaceship.x > displayWidth - 50){
      spaceship.x = displayWidth - 50;
    }
    if(spaceship.x < 50){
      spaceship.x = 50;
    }
  }
}

function pauseAndPlay(){
  if(gamestate === "final"){
    pausebutton.visible = true;
  }
  else{
    pausebutton.visible = false;
  }
  if(pauseState === false){
    pausebutton.addImage(pauseimg);
  }
  else{
    pausebutton.addImage(playimg);
  }
  if(frameCount % 60 === 0 && canClickPause === false){
    canClickPause = true;
  }
  if(mousePressedOver(pausebutton) && canClickPause === true){
    if(pauseState === true){
      pauseState = false;
      canClickPause = false;
    }
    else if(pauseState === false){
      pauseState = true;
      canClickPause = false;
    }
  }
}

function shootFromShip(){

}