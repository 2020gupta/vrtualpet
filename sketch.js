
var dog
var happyDog
var database
var foodS
var foodStock
var feedPet 
var addFood
var fedTime, lastFed
var foodObj
var database;
var dog
function preload()
{
dogImage=loadImage("images/Dog.png");
dogImage1=loadImage("images/happydog.png");
milkImage=loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
   dog=createSprite(250,250,20,20)
  dog.addImage(dogImage)
  dog.scale=0.2
  // obj=new Food(200,200,20,20)
  
feed=createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood1=createButton("add food")
addFood1.position(800,95);
addFood1.mousePressed(addFood)

 
  foodStock=database.ref('Food');
  foodStock.on("value",readstock);
}


function draw() {  
  background(46,139,87)

fedTime=database.ref('fedTime');
fedTime.on("value",function(data){
  lastFed=data.val()
})

if(lastFed=>12){
text("last feed :"+lastFed%12 + "PM",350,30);
}else if(lastFed==0){
text("last feed : 12 PM")
}
else{
  text("last feed :"+ lastFed +"AM",350,30)
}

if(keyWentDown(UP_ARROW)){
  
writestock(foodS)
dog.addImage(dogImage1)
}



showfood()
  drawSprites();
  text("note:press UP_ARROW key to feed the dog",100,100)
textSize(50)
fill("green")
stroke(10)
}
function readstock(data){
foodS=data.val();
}

function writestock(x){
  if(x<=0){
  x=0;
  }
  else{
    x=x-1;

  }
  database.ref('/').update({
    'Food':x
  })
}
function feedDog(){

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  food:foodObj.getFoodStock(),
  fedTime:hour()
})
}
function addFood(){
  console.log("adding food to database")
foodS++;
database.ref('/').update({
  'Food':foodS
})
}
function showfood(){
  var x=80,y=100;

  imageMode(CENTER)
  //image(milkImage,200,200,70,70)

  if( this.foodS!=0){
     for(var i=0;i<this.foodS;i++){
if(i%10==0){
x=80;
y=y+50
}
image(milkImage,x,y,50,50)
x=x+30
     }
  }
}