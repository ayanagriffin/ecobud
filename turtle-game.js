/* global createCanvas background colorMode noStroke HSB color fill ellipse text ENTER
   stroke line mouseY mouseX strokeWeight rect mouseIsPressed random width height collideCircleCircle 
   keyCode UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW textSize collideRectCircle keyIsDown 
   windowHeight windowWidth HSL sqrt round frameRate noFill collideRectRect key rotate angleMode
   DEGREES rectMode CENTER push pop p5 _collideDebug translate cos sin CORNER textAlign textFont ellipseMode abs image floor
   loadImage createCheckbox createSlider createButton  keyIsPressed loadFont*/

let gameOver=false, lives = [],score=0,pol,things=[],beforeGame = true, font;
let fullHeart, emptyHeart, jelly, bag, seaweed, can, ocean, oceanflip,turtleP,turtle,bg1 = -500,bg2=0,highscore = 0;
var cnv;

function preload() {
  console.log("preload")
  fullHeart = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Ffull_heart.png?v=1598136424257');
  emptyHeart = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fempty_heart.png?v=1598136415851');
  jelly = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fjellyfish.png?v=1598136535615');
  bag = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fbag.png?v=1598136531655');
  seaweed  = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fseaweed.png?v=1598136524460');
  can = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fplastic.png?v=1598136526972');
  turtleP = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fswimming-turtle.png?v=1598136538709');
  ocean = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fturtle-bkg.png?v=1598136547587');
  oceanflip = loadImage('https://cdn.glitch.com/6615fc47-4588-40f6-ad78-c134085895df%2Fturt%20flip.PNG?v=1598143312260');  
}

function setup() {
  
  cnv =createCanvas(500, 500);
  turtle = new Turtle();
  for(var i = 0; i < 7;i++) {
    things[i] = new Thing();
  }
  noFill();
  noStroke();
  textFont('Tahoma');
}

function draw() {
  if(beforeGame==true) {
    beforeGameHandler();
  }
  else if(turtle.lives<=0) {
    gameOverHandler();
  }
  else {
    if(gameOver==false) {
      bgControl();
      fill(255);
      textSize(20);
      text(`Score: ${score}`,15,55);
      text(`High Score: ${highscore}`,15,75);
      noFill();
      turtle.move();
      turtle.livesDisplay();
      for(var i = 0; i<things.length; i++) {
        things[i].move();
        turtle.eventHandler(things[i]);
      }
      noStroke();
    }
    else {
      image(ocean,0,0,width,height);
      text(`Score: ${score}`,15,55);
      text(`High Score: ${highscore}`,15,75);
      noFill();
    }
  }
}

function beforeGameHandler() {
  image(ocean,0,0,width,height);
    fill('#ff85b9');
    rect(130,105,250,300,20);
    fill('#ffabcf');
    rect(120,95,250,300,20);
    textSize(20);
    fill(255);
    text(`Score: ${score}`,15,30);
    text(`High Score: ${highscore}`,15,50);
    textSize(15);
    text("Welcome to Save the Turtles! The objective of the game is to obtain as much food as possible while all avoiding pollution. Jellyfish and seaweed each worth 1 point. Your turtle will lose a life if you collect trash, like plastic bags. Control your turtle using your mouse. Good Luck!", 125, 145, 250,400)
    text("Trash: ", 140, 320);
    text("Food: ", 255, 320);
    image(bag, 175, 295, 40,40);
    image(can, 205, 295, 40,40);
    image(seaweed, 285, 295, 40,40);
    image(jelly, 315, 295, 40,40);
    fill('#ff3089');
    rect(150,340,190,40,10);
    textSize(30);
    fill(255);
    text("Instructions",170,130);
    text("START!",200,370);
    noFill();
    if(mouseIsPressed && mouseX>150&&mouseY>340&&mouseX<360&&mouseY<380) {
      turtle=new Turtle();
      beforeGame=false;
    }
}

function bgControl() {
  if(bg1>width) {
    bg1=-width+10;
  } 
  else {
    bg1+=2;
  }
  if(bg2>width) {
    bg2=-width+10;
  }
  else {
    bg2+=2;
  }
  image(ocean,bg1,0,width,height);
  image(ocean,bg2,0,width,height);
}

class Thing {
  constructor() {
    this.y = random(height-50);
    this.size = random(25,80);
    this.x = random(100);
    this.speed = random(1,7);
    let rand = random(6);
    if(rand<2) {
      this.image = bag;
    }
    else if(rand<4) {
      this.image = can;
    }
    else if(rand<5) {
      this.image = seaweed;
    }
    else {
      this.image = jelly;
    }
  }
  
  move() {
    if(this.x<width) {
      this.x=this.x+this.speed;
    }
    else {
      this.y = random(height-50);
      this.size = random(25,80);
      this.x = -50;
      this.speed = random(1,7);
      let rand = random(4);
      if(rand<=1) {
        this.image = bag;
      }
      else if(rand<=2) {
        this.image = can;
      }
      else if(rand<=3) {
        this.image = seaweed;
      }
      else {
        this.image = jelly;
      }
    }
    image(this.image, this.x, this.y, this.size, this.size);
  }
}

function gameOverHandler() {
  gameOver = true;
  image(ocean,0,0,width,height);
    fill('#ff85b9');
    rect(130,105,250,300,20);
    fill('#ffabcf');
    rect(120,95,250,300,20);
    textSize(20);
    fill(255);
    text(`Score: ${score}`,15,30);
    text(`High Score: ${highscore}`,15,50);
    textSize(12);
    text("Thousands of marine mammals, including sea turtles, are killed every year by the 4-12 million tons of plastic that enter oceans every year. The majority of these ocean pollutants come directly from human activities; but we have the power to reduce our role in these activities. Reducing the use of single-use plastics (plastic bags, plastic water bottles) and learning your local guidelines for recycling properly are a great place to start. ", 125, 170, 250,400)
    fill('#ff3089');
    rect(150,340,190,40,10);
    textSize(30);
    fill(255);
    text("Game Over",175,130);
    text("RESTART",185,370);
    if(score>=highscore) {
      fill(255);
      textSize(20);
      text("NEW HIGH SCORE!",160,160);
      highscore = score;
    }
    if(mouseIsPressed && mouseX>150&&mouseY>340&&mouseX<360&&mouseY<380) {
      beforeGame=true;
      gameOver=false;
      score=0;
    }
    noFill();
}

class Turtle {
  constructor() {
    this.lives = 5;
    this.x = 400;
    this.y = 250;
  }
  
  eventHandler(thing) {
    if(this.lives>0 && collideRectRect(thing.x+thing.size/4,thing.y+thing.size/8,thing.size/2,thing.size-thing.size/4, this.x+5,this.y+30,100,50)) {
      if((thing.image==seaweed||thing.image==jelly)) {
        thing.x = 0;
        score++;
      }
      else if(thing.image==can||thing.image==bag) {
        thing.x = 0;
        this.lives--;
      }
    }
    else if(this.lives<1){
      gameOverHandler();
    }
  }
  
  move() {
    if(mouseY<height-50) {
      this.y = mouseY;
    }
    image(turtleP, this.x,this.y,100,100);
  }
  
  livesDisplay() {
    fill(255);
    text("Lives: ",15,35);
    noFill();
    let startPos = 70;
    for(var i = 0; i < 5; i++) {
      if(i<this.lives) {
        image(fullHeart, startPos+25*i, 17, 20, 20);
      }
      else {
        image(emptyHeart, startPos+25*i, 17, 20, 20);
      }
    }
  }
}
