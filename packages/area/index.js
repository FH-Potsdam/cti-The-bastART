/**
 * X  @todo change size of area on mouseOver
 * X  @todo change rotation of area on mouseOver
 * X  @todo draw area from center not upper left corner
 * X  @todo do something on click for the area
 */
let x = 0;
let canvas = undefined;
const step = 20;
const areas = [];
let actEl=0;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("sketch");
  rectMode(CENTER);
  angleMode(DEGREES);
  for (let x = step/2; x < width+step/2; x += step) {
    for (let y = step/2; y < height+step/2; y += step) {
      areas.push(new Area(x, y, step, step));
    }
  }
  noStroke();
}

function draw() {
  for (const item of areas) {
    item.update(mouseX, mouseY);
    item.display();
    if(item.isOver===true){actEl=areas.indexOf(item);}
  }
}

function Area(x, y, w, h) {
  if (!(this instanceof Area)) {
    throw new TypeError(
      "Area can not be called as a function. Create an instance by calling new Area(x,y,w,h)",
    );
  }
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.w1 = w;
  this.h1 = h;
  this.rot = 0;
  this.isOver = false;
  this.col=0;

  this.update = function(mX, mY) {
    if(mX>this.x-this.w/2 && mX<this.x+this.w/2 && mY>this.y-this.h/2 && mY<this.y+this.h/2){
      this.isOver = true;
      this.rot+=1;
      if(this.h1<height){this.h1+=1;}
      if(this.w1<width){this.w1+=1;}
    } else {
      this.isOver = false;
      this.rot=0;
      this.h1=this.h;
      this.w1=this.w;
    }
  };

  this.display = function() {
    if (this.isOver === true) {
      if (this.col===1){
        fill(255,106,0,200);
      } else {
        fill(0,0,200,200);
      }
    } else {
      if (this.col===0){
        fill(255,106,0,20);
      } else {
        fill(0,0,200,20);
      }
    }
    push();
    translate(this.x,this.y);
    rotate(this.rot);
    rect(0, 0, this.w1, this.h1);
    pop();
  };

  this.changeCol=function(){
    if(this.col===1){this.col=0;}
    else if(this.col===0){this.col=1;}
  };
}

function mouseClicked(){
  for (const item of areas) {
    item.changeCol();
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}
