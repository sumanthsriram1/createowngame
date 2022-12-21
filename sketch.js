var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,100,50,100)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5
  doorsGroup = new Group()
  climbersGroup = new Group()
  railingGroup = new Group()
}

function draw() {
  background(200);
  drawSprites()

  if(gameState = "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoor()
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY+0.5
    score = score+Math.round(frameCount/100)
    if(score%1000 == 0 && score > 0){
      tower.velocityY = tower.velocityY+1
    }
    fill("white")
    text("Score: " + score, 530,60)
    if(keyDown(RIGHT_ARROW)){
      ghost.x += 7
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x -= 7
    }
    if(railingGroup.isTouching(ghost) || doorsGroup.isTouching(ghost) || climbersGroup.isTouching(ghost) || ghost.y > 600){
      gameState = "end"
    } 
  }
  if(gameState == "end"){
    ghost.destroy()
    tower.destroy()
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    railingGroup.destroyEach()
    textSize(30)
    fill("blue")
    text("Game Over",230,250)
    const score = score
  }
}

function spawnDoor() {
  if(frameCount%190 == 0 && frameCount>1){
    door = createSprite(random(120,400),10)
    door.velocityY = 1
    door.addImage(doorImg)
    door.lifetime = 600
    doorsGroup.add(door)

    climber = createSprite(door.x,door.y+70)
    climber.velocityY = 1
    climber.addImage(climberImg)
    climber.lifetime = 600
    climbersGroup.add(climber)

    railing = createSprite(climber.x,climber.y+5,100,5)
    railing.velocityY = 1
    railingGroup.add(railing)

    ghost.depth = door.depth
    ghost.depth += 1
  }
}
