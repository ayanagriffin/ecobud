/* global createCanvas background colorMode noStroke HSB color fill ellipse text ENTER
   stroke line mouseY mouseX strokeWeight rect mouseIsPressed random width height collideCircleCircle 
   keyCode UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW textSize collideRectCircle keyIsDown 
   windowHeight windowWidth HSL sqrt round frameRate noFill collideRectRect key rotate angleMode
   DEGREES rectMode CENTER push pop p5 _collideDebug translate cos sin CORNER textAlign textFont ellipseMode abs image floor
   loadImage createCheckbox createSlider createButton  keyIsPressed */

let time=0,canvas,allcubes=[],redIce,blueIce,x1=75,y1=75,totGone=0,thermometer,frontV,backV,leftV,rightV,gameOver=false, penguin,ocean;
let beforeGame = true,days=0, highscore=0,rand=0,splash,sad,stopTime=0;

function setup() {
  canvas = createCanvas(500, 500);
  blueIce = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fcrop%20ice%20block.png?v=1598025822940')
  redIce = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2FredIce.png?v=1598025566471');
  thermometer = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fthermometer.png?v=1598078768098');
  frontV = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fpenguin%20neutral.png?v=1598037769692');
  backV = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fpenguin%20back.png?v=1598037782818');
  leftV = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fpenguin%20left.png?v=1598037776508');
  rightV = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fpenguin%20right.png?v=1598037773363');
  ocean = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2FpBack.png?v=1598078765415');
  sad = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fsad.png?v=1598180239840');
  splash = loadImage('https://cdn.glitch.com/b7f307dd-f2d7-4ce3-a381-12464d9a0fe9%2Fwater.png?v=1598180190735');
  penguin = new Penguin();
  gridSetUp();
  noFill();
  noStroke();
  textFont('Tahoma');
}

function draw() {
  if(beforeGame == true) {
    beforeGameHandler();
  }
  else if(time>3000 || gameOver==true ||totGone>15) {
    gameOverHandler();
  }
  else {
    totGone=0;
    image(ocean,0,0,width,height);
    noStroke();
    gridDisplay();
    fill('red');
    ellipse(27,89,25,25);
    rect(24,80-time/51,5,time/51);
    image(thermometer,-22,13,100,100);
    fill(255);
    days = round(time/50);
    textSize(20);
    text(`Days Passed: ${days}`, 50, 40);
    text(`Longest Time: ${highscore}`,50,60);
    noFill();
    penguin.move();
    rand = floor(random(16));
    image(penguin.image,penguin.x,penguin.y,75,75);
    checkBorders();
    gridHandling(allcubes[rand]);
    time++
  }
  stopTime++;
}

function beforeGameHandler() {
    image(ocean,0,0,width,height);
    fill('#ff85b9');
    rect(130,105,250,300,20);
    fill('#ffabcf');
    rect(120,95,250,300,20);
    textSize(20);
    fill(255);
    text(`Days Passed: ${days}`, 50, 40);
    text(`Longest Time: ${highscore}`,50,60);
    textSize(15);
    text("Welcome to Stay on Ice! The objective of the game is to obtain as much food as possible while all avoiding pollution. Jellyfish and seaweed each worth 1 point. Your turtle will lose a life if you collect trash, like plastic bags. Control your turtle using your mouse. Good Luck!", 125, 145, 250,400)
    fill('#ff3089');
    rect(150,340,190,40,10);
    textSize(30);
    fill(255);
    text("Instructions",170,130);
    text("START!",200,370);
    noFill();
    if(mouseIsPressed && mouseX>150&&mouseY>340&&mouseX<360&&mouseY<380) {
      penguin=new Penguin();
      beforeGame=false;
    }
}

function gameOverHandler() {
  if(stopTime<time+150 &&time<3049) {
    gameOver = true;
    penguin.image = sad;
    image(splash, penguin.x+75/4,penguin.y+50,50,50);
  }
  else {
    gameOver = true;
  image(ocean,0,0,width,height);
    fill('#ff85b9');
    rect(130,105,250,300,20);
    fill('#ffabcf');
    rect(120,95,250,300,20);
    textSize(20);
    fill(255);
    text(`Days Passed: ${days}`, 50, 40);
    text(`Longest Time: ${highscore}`,50,60);
    textSize(13);
    text("In the past few decades alone, climate change has resulted in worse extreme weather events, longer wildfire seasons, and Antarctic icebergs breaking off; this will only get worse if we do not make extreme efforts to curb it. You can take action and reduce your carbon footprint by utilizing public transportation or bicycles instead of cars and being conscious of your water use.", 125, 170, 250,400)
    fill('#ff3089');
    rect(150,340,190,40,10);
    textSize(30);
    fill(255);
    text("Game Over",175,130);
    text("RESTART",185,370);
    if(days>=highscore) {
      fill(255);
      textSize(20);
      text("NEW HIGH SCORE!",160,160);
      highscore = days;
    }
    if(mouseIsPressed && mouseX>150&&mouseY>340&&mouseX<360&&mouseY<380) {
      beforeGame=true;
      gameOver=false;
      time=0;
      days=0;
      totGone=0;
      allcubes = [];
      gridSetUp();
      stopTime=0;
    }
    noFill();
  }
}

// for state: 0 is active, 1 is sinking, 2 is gone
class Cube {
  constructor() {
    this.size = .2*width;
    this.image = blueIce;
    this.state = 0;
    this.color = false;
    this.xPos = 0;
    this.yPos = 0;
  }
}

function gridSetUp() {
  for(var i = 0; i<16; i++) {
    allcubes.push(new Cube());
    allcubes[i].xPos = x1+(i%4)*(.2*width);
      allcubes[i].yPos = -1;
      if(i<4) {
        allcubes[i].yPos = y1+0*(.2*height);
      }
      else if(i<8) {
        allcubes[i].yPos = y1+1*(.2*height);
      }
      else if(i<12) {
        allcubes[i].yPos = y1+2*(.2*height);
      }
      else {
        allcubes[i].yPos = y1+3*(.2*height);
      }
    //allcubes[i].sprite = createSprite(this.xPos,this.yPos,.2*width,.2*height);
  }
}

function gridDisplay() {
  for(var i = 0; i < allcubes.length;i++) {
    if(allcubes[i].state == 0 || allcubes[i].state == 1) {
    
      if(allcubes[i].state == 1) {
        if(time%15==0) {
          allcubes[i].color = !(allcubes[i].color);
        }
        
        if(allcubes[i].color) {
          allcubes[i].image = redIce;
        }
        else {
          allcubes[i].image = blueIce;
        }
        
        if(time%100==0) {
          allcubes[i].state = 2;
        }
      }
      image(allcubes[i].image,allcubes[i].xPos,allcubes[i].yPos,.2*width,.2*height);
    }
    else if(allcubes[i].state==2) {
      totGone++;
      if(collideRectRect(allcubes[i].xPos+20,allcubes[i].yPos+20,.2*width-40,.2*height-40, penguin.x+75/3,penguin.y+4*(75/5),25,10)) {
        gameOverHandler();
      }
    }
  }
}

function checkBorders() {
  if(collideRectRect(penguin.x+75/3,penguin.y+4*(75/5),25,10, 0,0,60,500) || collideRectRect(penguin.x+75/3,penguin.y+4*(75/5),25,10, 0,0,500,60) || collideRectRect(penguin.x+75/3,penguin.y+4*(75/5),25,10, 0,480,500,20) || collideRectRect(penguin.x+75/3,penguin.y+4*(75/5),25,10, 480,0,20,500)) {
    gameOverHandler();
  }
}

function gridHandling(cube) {
  if(time%175==0) {
    while(allcubes[rand].state==2) {
      rand=floor(random(16))
    }
    cube = allcubes[rand];
    cube.state = 1;
  }
}

class Penguin {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.image = frontV;
    this.dir = "D";
  }
  
  move() {
    if(keyIsPressed==true && gameOver==false) {
      if((keyCode==87||keyCode==38)&&this.y>0) {
        this.dir = "U";
        this.image = backV;
        this.y-=2;
      }
      else if((keyCode==65||keyCode==37)&&this.x>0) {
        this.dir = "L";
        this.image = leftV;
        this.x-=2;
      }
      else if((keyCode==40||keyCode==83)&&this.y<height-50) {
        this.dir= "D";
        this.image = frontV;
        this.y+=2;
      }
      else if((keyCode==68||keyCode==39)&&this.x<width-50) {
        this.dir = "R";
        this.image = rightV;
        this.x+=2;
      }
    }
  }
}