var gameState=1;
var PLAY=1;
var END=0;
var monkey , monkey_running,monkeyStop;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var invisibleGround;
var score,time;
var restart,restartI,gameOver;
var back,backI;
var die,over,check;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyStop=loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png")
  restartI=loadImage("restart.png")
  backI=loadImage("back.png");
  check=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3")
 
}



function setup() {
  createCanvas(400,400);
  back=createSprite(200,150,1500,10);
  back.velocityX=-4;
  back.scale=2;
  back.addImage(backI)
  back.depth=0;
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkeyStop)
  monkey.scale=0.1;
  invisibleGround=createSprite(300,360,600,10)
  invisibleGround.visible=false;
  obstaclesGroup=new Group();
 foodGroup=new Group();
  score=0;
  time=0;
  restart=createSprite(200,200,20,20);
  restart.addImage(restartI);
  restart.scale=0.5;
  
}


function draw() {
  background(220)
  
 
  
  
  
  if(gameState===PLAY){
    
   time = time+Math.round(getFrameRate()/60)
    monkey.changeAnimation("running",monkey_running)
  
    if(back.x<0){
  back.x=back.width/2;
  }
    restart.visible=false;
    
   
   if(keyDown("space")&&monkey.collide(invisibleGround)){
    monkey.velocityY=-15;
     jump.play();
  }
    monkey.velocityY=monkey.velocityY+0.8;
     monkey.collide(invisibleGround);
    if(time%100===0&& time>0){
      check.play();
    }
    
    if(monkey.isTouching(obstaclesGroup)){
    gameState=END;
      die.play();
      
      
  }
    
    
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score++;
  }

  spawnobstacles();
  spawnbananas();
  }
  else if(gameState===END){
    monkey.changeAnimation("stop",monkeyStop)
    back.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    restart.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  
  
 
  
  drawSprites();
   
  stroke("white");
  fill("white");
  text("SURVIVAL TIME : "+time,270,20);
  stroke("black");
  fill("black");
  text("SCORE : "+score,170,20);
  
}
function spawnobstacles(){
  
  if(frameCount%300===0){
    obstacle=createSprite(400,330,20,20)
    obstacle.velocityX=-(4+time/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifetime=100;
    obstaclesGroup.add(obstacle);
  }
}
function spawnbananas(){
  
  if(frameCount%80===0){
    banana=createSprite(600,random(120,200),20,20)
    banana.velocityX=-(4+time/100);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=200;
    foodGroup.add(banana);
  }
}
function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  score=0;
  time=0;
  back.velocityX=-4;
 
  
  
}







