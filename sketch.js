var database;
var dog,dogI,dogHappyI;
var bg;
var foodS,foodStock;

function preload(){

  dogI = loadImage("images/dogImg.png")
  dogHappyI = loadImage("images/dogImg1.png")
  bg = loadImage("images/day.png")
}

function setup() {
  createCanvas(800, 700);
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  dog = createSprite(400,580)
  dog.addImage(dogI)
  dog.scale = 0.2;
  
}


function draw() {  
  background(bg)

  drawSprites();
  
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogHappyI)
  }
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogI)
  }

  if(foodS === 0){
    fill(255)
    strokeWeight(3)
    stroke("red")
    textSize(30)
    text("Press R to play again",240,150)

    if(keyDown(82)){
      foodS = 2000;
    }

  }

  fill(255)
  strokeWeight(3)
  stroke("red")
  textSize(30)
  text("Press UP ARROW to feed the dog some milk.",110,50)

  fill("red")
  strokeWeight(3)
  stroke(255)
  textSize(30)
  text("ml of milk remaining : "+foodS,230,100)

  fill("pink");
  strokeWeight(3)
  stroke(4, 73, 184)
  textSize(20)
  text("*NOTE* -> if ' milk remaining = undefined ' , then please wait untill it gets some value...",1,670)
  text("-> Press UP ARROW after 'milk remaining' gets some value",78,690)

 

}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x-5
  }

  database.ref('/').update({
    Food : x
  })

}

function readStock(data){
  foodS = data.val();

}
