let mic, fft, loc, locw;
let amt, startColor, newColor;
var prevX=0, prevY=0;
function setup() {
  createCanvas(document.body.clientWidth, document.body.clientHeight, WEBGL);
  noFill();

  background(255);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  startColor = color(255, 255, 255);
  newColor = color(random(100, 255), random(100, 255), random(100, 255));
  amt = 0;
}
function windowResized() {
  resizeCanvas(document.body.clientWidth, document.body.clientHeight, WEBGL);
}
let symmetry = 51;   
let count=0;
let angle = 360 / symmetry;
function draw() {
  background(255);
  let particleColor=lerpColor(startColor, newColor, amt);
 particleColor=color(200);

  ambientLight(100);
  pointLight(255, 255, 255, 10, 10, -100);
  let ran1=random(-10, 10);
  let ran2=random(0, 100);
  //fill(100, 100, 255);
  noStroke();
  let spectrum = fft.analyze();
  let waveform = fft.waveform();
   //for (let j = 0; j < symmetry; j++) {
   // rotate(angle);
  for (i = 0; i < spectrum.length; i+=150) {
    loc= map(spectrum[i], 0, 255, height, 0);
    locw= map(spectrum[i], 0, 255, width, 0);
    if (loc<700) {
      stroke(0, 10);
      strokeWeight(1);
      //line(250+i+ran1,loc,spectrum.length-i+(ran1), height-loc);
      //line(spectrum.length-i+(ran1),loc,250+i+ran1, height-loc);
      //line(250+i+ran1, loc, spectrum.length-i+(ran1), loc);
      //line(spectrum.length-i+(ran1), height-loc, 250+i+ran1, height-loc);
    }
    //fill(200);
    //noStroke();
    //push();
    //translate(i, loc-500, i*2-1000);
    //ambientMaterial(250);
    //sphere(25);
    //pop();
    //push();
    //translate(-i, loc-500, i*2-1000);
    //ambientMaterial(250);
    //sphere(25);
    //pop();
    fill(200);
    noStroke();
    push();
    translate(i-width/4, loc-600, -i);
    ambientMaterial(particleColor);
    sphere(25);
    pop();
    
    fill(200);
    noStroke();
    push();
        scale(1, -1);
    translate(i-width/4, loc-600, -i);
    ambientMaterial(particleColor);
    sphere(25);
    pop();
    //ellipse(250+i+ran1, loc, 15, ran2);
    //ellipse(spectrum.length-i+(ran1), loc, 15,ran2);
    //ellipse(250+i+ran1, height-loc, 15,ran2);
    //ellipse(spectrum.length-i+(ran1), height-loc, 15,ran2);

    //ellipse(locw,i+ran1-300,ran2, 15);
    //ellipse(locw,spectrum.length-i+ran1,ran2, 15);
    //ellipse(width-locw,i+ran1-300,ran2, 15);
    //ellipse(width-locw,spectrum.length-i+ran1,ran2, 15);
    rotate(1);
  }
   amt += 0.01;
  if (amt >= 1) {
    amt = 0.0;
    startColor = newColor;
    newColor = color(random(100, 255), random(100, 255), random(100, 255));
  //}
  }
    push();
    //rotate(count+=0.1);
    rotateX(45);
    rotateZ(45);
    //stroke(255);
    //ambientMaterial(100);
    specularMaterial(0);
    box(width/10);
    pop();
    
 
  //for (i = 0; i < spectrum.length; i++) {
  //  loc= map(spectrum[i], 0, 255, 0, 255);
  //  fill(100, 100, 255);
  //  noStroke();
  //  x=sin(loc);
  //  y=cos(loc);
  //  ellipse(x*400,loc+100, 20, 20);
  //}

  fill(255, 10);
  noStroke();
  //rect(0, 0, width, height);
  fill(255);
  noStroke();
  //rect(0, 750, width, height);
}
function mouseClicked() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
