let canvas = undefined;
const particles=[];
let p=undefined;
let birthrate=500, deathrate=2000;
let run=true;
let gmX,gmY;

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.parent("sketch");
  background(0);
  for (let x=25;x<=width-25;x+=50){
    for (let y=25;y<=height-25;y+=50){
      newP(x,y);
    }
  }
}

function draw() {
  gmX=mouseX;
  gmY=mouseY;
  if (gmX>width){gmX=width;} else if (gmX<0){gmX=0;}
  if (gmY>height){gmY=height;} else if (gmY<0){gmY=0;}
  background(0,map(gmX,0,height,50,10));
  //birthrate=mouseX;
  //deathrate=mouseY;
  if (run===true){
    for (const item of particles){
      item.update();
      item.display();
      //if(Math.round(random(1,deathrate))==1){particles.splice(particles.indexOf(item),1)}
    }
  }
}

function newP(x,y){
  particles.push(new Particle(x,y,random(5,30)));
}

function mousePressed(){
  newP(gmX,gmY);
  if(run===false){
    run=true;
  } else {
    run=false;
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

function Particle(_x,_y,_w){
  this.x=_x;
  this.y=_y;
  this.w=_w;
  this.col=color(random(255),random(255),random(255));

  this.display=function(){
    stroke(this.col);
    fill(255,map(gmY,0,height,0,200));
    circle(this.x,this.y,this.w);
  };

  this.update=function(){
    let mX=map(gmX,0,width,0,20);
    this.x+=random(-mX,mX);
    this.y+=random(-mX,mX);
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
    //if(Math.round(random(1,birthrate))==1){newP(this.x,this.y)}
  };

}