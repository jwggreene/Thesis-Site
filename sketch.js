// Click canvas to start first oscillator shape
// Press space bar to start lower octave shape


// Circle Dot Objects

class Dot {
  constructor(x, y, size, xc, yc) {
    this.x = x;
    this.y = y;
    this.xoff1 = 0;
    this.yoff1 = 0;
    this.xc = xc;
    this.yc = yc;
    this.size = size;
    this.polySynth = new p5.PolySynth();
    this.volume = 0.5;
    this.attack = 0.1;
    this.release = 0.5;
    this.reverb = new p5.Reverb();
    this.reverb.process(this.polySynth, 10, 2);
    this.delay = new p5.Delay();
    this.delay.process(this.polySynth, 0.12, 0.2, 2300);
    
    this.notes = [
      ['C4', 'E4', 'G4'],
      ['E4', 'G4', 'B4'],
      ['F4', 'A4', 'C4'],
      ['D4', "F4", 'A4']
    ];

    this.notes2 = [
      ['C3', 'E3', 'G3'],
      ['E3', 'G3', 'B3'],
      ['F3', 'A3', 'C3'],
      ['D3', "F4", 'A3']
    ];


  }

  // Dot Shape
  show() {
    fill(0);
    ellipse(this.x, this.y, this.size);

  }

  // Dot movement, based on mapping position to noise and changing the offset with the xc and yc variable
  move() {
    this.x = map(noise(this.xoff1), 0, 1, 0, width);
    this.y = map(noise(this.yoff1), 0, 1, 0, height);
    this.xoff1 += this.xc;
    this.yoff1 += this.yc;
  }

  // Sound for the first drawn dot, randomly selections one of three notes in the an array depending on location of dot in quadrant
  sound() {

    let index = floor(random(this.notes[0].length));
    let note = this.notes[0][0];

    if (this.x < 300) {
      note = this.notes[1][index];
      if (this.y > 300) {
        note = this.notes[0][index];
      }
    } else {
      note = this.notes[3][index];
      if (this.y > 300) {
        note = this.notes[2][index];
      }
    }

    this.polySynth.play(note, this.volume, this.attack, this.release);
  }

  // Lower pitch notes for the dot drawn with spacebar
  sound2() {

    let index2 = floor(random(this.notes2[0].length));
    let note = this.notes2[0][0];

    if (this.x < 300) {
      note = this.notes2[0][index2];
      if (this.y > 300) {
        note = this.notes2[2][index2];
      }
    } else {
      note = this.notes2[1][index2];
      if (this.y > 300) {
        note = this.notes2[3][index2];
      }
    }

    this.polySynth.play(note, this.volume, this.attack, this.release);
  }
}

let ready = false;
let dot1;
let dot2;


function setup() {
  createCanvas(600, 600);
  background(220);
  frameRate(6);
  dot1 = new Dot(this.x, this.y, 10, 0.5, 0.4);
  dot2 = new Dot(this.x, this.y, 20, 0.05, 0.03);
}

function draw() {
  if (ready) {
    drawDot();
  }
  if (keyCode === 32) {
    drawDot2();
  }

  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
}


function drawDot() {
  dot1.show();
  dot1.move();
  dot1.sound();
}

function drawDot2() {
  dot2.show();
  dot2.move();
  dot2.sound2();
}

function mousePressed() {
  userStartAudio();
  if (!ready) {
    ready = true;
  }
}