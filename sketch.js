let movers = [];
let webcam;
let scale = 18;

function setup() {
  createCanvas(400, 400);
  background(255);

  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scale, height / scale);
  webcam.hide();

  let numStars = int(width * height / 500);

  for (let i = 0; i < numStars; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 30);
    let npoints = int(random(5, 10));
    movers.push(new Mover(x, y, size, npoints));
  }
}

function draw() {
  webcam.loadPixels();

  for (let mover of movers) {
    mover.step();
    mover.show();
  }
}

class Mover {
  constructor(x, y, size, npoints) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.npoints = npoints;
  }

  step() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    let px = int(this.x / scale);
    let py = int(this.y / scale);

    let r = 255;
    let g = 255;
    let b = 255;
    
    if (px >= 0 && px < webcam.width && py >= 0 && py < webcam.height) {
      let pixelIndex = (py * webcam.width + px) * 4;
      r = webcam.pixels[pixelIndex];
      g = webcam.pixels[pixelIndex + 1];
      b = webcam.pixels[pixelIndex + 2];
    }


    fill(r, g, b, 100);
    noStroke();
    push();
    translate(this.x, this.y);
    drawStar(0, 0, this.size / 2, this.size, this.npoints);
    pop();
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);

    let sxInner = x + cos(a + halfAngle) * radius1;
    let syInner = y + sin(a + halfAngle) * radius1;
    vertex(sxInner, syInner);
  }
  endShape(CLOSE);
}
