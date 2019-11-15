/**
 * X  @todo How to constrain the particle to the screen?
 * X  @todo How to give a particle a live time?
 * @todo How to create a new particle after 50 frames?
 * @todo How to give the particle an on click action?
 */
let canvas = undefined;
let jim = undefined;
const agents = [];
let birthrate=100, deathrate=1000;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("sketch");
  colorMode(HSB,360,100,100);
  //jim = new Agent(random(width), random(height));
  // Agent().display(); will throw an error
}

function draw() {
  //jim.update();
  //jim.display();
  //birthrate=mouseX;
  //deathrate=mouseY;
  for (const item of agents) {
    item.update();
    item.display();
    if(Math.round(random(1,deathrate))==1){agents.pop(agents.indexOf(item))}
  }
  //population control
  if (agents.length>150){
    for(let i=0;i<=50;i++){
      agents.pop(i);
    }
    console.log("POPULATION CONTROL!");
  }
}

function mousePressed() {
  agents.push(new Agent(mouseX, mouseY,random(360)));
}
function mouseDragged() {
  agents.push(new Agent(mouseX, mouseY,random(360)));
}
function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}

function Agent(x, y, hue) {
  if (!(this instanceof Agent)) {
    throw new TypeError(
      "Agent can not be called as a function. Create an instance by calling 'new Agent(x,y)'",
    );
  }

  /**
   * If you want the fancy noise driven movement you need to add
   * these variables
   */
  // this.xoff = x;
  // this.yoff = y;
  // this.noiseRange = 2;

  this.x = x;
  this.y = y;
  this.hue = hue;
  if(this.hue>=360){this.hue-=360;}

  /**
   * If you want the fancy noise driven movement remove
   * this update function
   */
  this.update = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
    // constrain him to the canvas
    if (this.x<=0){
      this.x=0;
    } else if(this.x>=width){
      this.x=width;
    }
    if (this.y<=0){
      this.y=0;
    } else if(this.y>=height){
      this.y=height;
    }
    if(Math.round(random(1,birthrate))==1){newP(this.x,this.y, this.hue+5);}
  };

  /**
   * If you want the fancy noise driven movement you need to add
   * this update function
   */
  // this.update = function() {
  //   this.xoff += 0.01;
  //   let xn = noise(this.xoff) * this.noiseRange;
  //   this.yoff += 0.01;
  //   let yn = noise(this.yoff) * this.noiseRange;
  //   this.x = this.x + xn - this.noiseRange / 2; //random(-1, 1);
  //   this.y = this.y + yn - this.noiseRange / 2; // random(-1, 1);
  //   // constrain him to the canvas
  //   if (this.x <= 0) {
  //     this.x = 0;
  //   }
  //   if (this.x >= width) {
  //     this.x = width;
  //   }
  //   if (this.y <= 0) {
  //     this.y = 0;
  //   }
  //   if (this.y >= height) {
  //     this.y = height;
  //   }
  // };

  this.display = function() {
    strokeWeight(2);
    stroke(this.hue,80,80);
    fill(this.hue,80,80);
    ellipse(this.x, this.y, 1);
  };
}

function newP(x,y,hue){
  agents.push(new Agent(x,y,hue));
}