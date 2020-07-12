let mic, fft, loc, locw;
let amt, startColor, newColor;
var prevX=0, prevY=0;
var blobs=[];
let spectrum;
var COLORS = [ '#581845', '#900C3F', '#C70039', '#C70039', '#FFC300', '#DAF7A6' ];
function setup() {
  createCanvas(1400, 800, WEBGL);
  noFill();
  background(255);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  spectrum = fft.analyze();
  for (i = 200; i < 1024; i+=100) {
    blob=new blobb(i, 400, 20);
    blobs.push(blob);
  }
}
let ctr=0;
function draw() {
  //background(255);
  lights();
  //translate(-width/2,0);
  spectrum = fft.analyze();
  let waveform = fft.waveform();
  for (i = 200; i < spectrum.length; i+=100) {
    d= map(spectrum[i], 0, 255, 0, 1);
    blobs[ctr].move(d);
    blobs[ctr].display();
    ctr++;
  }
  ctr=0;
}
function mouseClicked() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

class blobb {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.diameter = dia;
    this.speed = 1;
    this.inc=0;
    this.vel=0;
    this.spacing=x;
    this.color=random(COLORS);
    this.pDis=0;
  }

  move(dist) {
    if (this.pDis>=dist) {
      this.inc+=dist;
    } else {
      this.inc-=dist;
    }
    this.pDis=dist;
    this.x = sin(this.inc/10)*100*this.spacing/300;
    this.y = cos(this.inc/10)*100*this.spacing/300;
  }

  display() {
    let c=this.color;
    fill(color(c));
    noStroke();
    push();
    translate(this.x, this.y, 0);
    ambientMaterial(color(c));
    sphere(30);
    pop();
  }
}
