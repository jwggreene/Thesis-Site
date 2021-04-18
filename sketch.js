let dotDraw;
let ready = false;
let fft;
let mic;
let spectrum;

function setup() {
  createCanvas(400, 400);
  dotDraw = new Drawing(0, 0, this.size, 10);
  background(220);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  fft.setInput(mic);
}

function mousePressed() {
  userStartAudio();
  if (!ready) {
    ready = true;
  }
  mic.start();
}

function draw() {


  spectrum = fft.analyze();
  
  if (ready) {
    dotDraw.move();
    dotDraw.show();
    

  }
}

class Drawing {
  constructor(x, y, size, xs) {
    this.x = x;
    this.y = y;
    this.xSpeed = xs;
    this.size = size;
    this.xMargin = 20;
    this.yMargin = 20;



  }

  move() {
    this.x += this.xSpeed;
    if (this.x > width - this.xMargin) {
      this.x = 10;
      this.y += 5;
    } 
    if (this.y > height - this.yMargin) {
     this.xSpeed = 0;
      
    }
  }

  show() {
    for (let i = 0; i < spectrum.length; i++) {
      this.size = map(spectrum[i], 0, 255, 1, 10);
      strokeWeight(this.size);
      point(this.x, this.y + this.yMargin);
    }
  }

  

}