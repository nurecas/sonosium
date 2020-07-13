let mic, fft, loc, locw;
let amt, startColor, newColor;
var prevX = 0,
    prevY = 0;
var blobs = [];
let spectrum;
let colorCtr = 0;
var COLORS = ['#C70039', '#581845', '#FFC300', '#900C3F', '#DAF7A6', '#C70039'];

function setup() {
    if (windowWidth >= windowHeight) {
        createCanvas(windowHeight, windowHeight, WEBGL);
    } else {
        createCanvas(windowWidth, windowWidth, WEBGL);
    }
    background(255);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    spectrum = fft.analyze();
    for (i = 0; i < 1024; i += 100) {
        blob = new blobb(i, 100, width / 30);
        blobs.push(blob);
    }
}

function windowResized() {
    if (windowWidth >= windowHeight) {
        createCanvas(windowHeight, windowHeight, WEBGL);
    } else {
        createCanvas(windowWidth, windowWidth, WEBGL);
    }
    background(255);
}
let ctr = 0;

function draw() {
    lights();
    //translate(-width/2,0);
    spectrum = fft.analyze();
    let waveform = fft.waveform();
    for (i = 0; i < spectrum.length; i += 100) {
        d = map(spectrum[i], 0, 255, 0, 1);
        blobs[ctr].move(d);
        blobs[ctr].display();
        ctr++;
    }
    ctr = 0;
}
class blobb {
    constructor(x, y, dia) {
        this.x = x;
        this.y = y;
        this.diameter = dia;
        this.speed = 1;
        this.inc = 0;
        this.vel = 0;
        this.spacing = x;
        if (colorCtr <= 5) {
            this.color = COLORS[colorCtr];
            colorCtr++;
        } else {
            colorCtr = 1;
            this.color = COLORS[colorCtr];
            colorCtr++;
        }
        this.pDis = 0;
    }

    move(dist) {
        if (dist > 0.3) {
            dist = 0.2;
        } else if (dist > 0 && dist <= 0.3) {
            dist = -0.2;
        } else {
            dist = 0;
        }
        if (this.pDis >= dist) {
            this.inc += dist;
        } else {
            this.inc -= dist;
        }
        this.pDis = dist;
        this.x = sin(this.inc / 10) * 100 * this.spacing / 300 * (width / 800);
        this.y = cos(this.inc / 10) * 100 * this.spacing / 300 * (width / 800);
    }

    display() {
        let c = this.color;
        fill(color(c));
        noStroke();
        push();
        translate(this.x, this.y, 0);
        ambientMaterial(color(c));
        sphere(this.diameter);
        pop();
    }
}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

function saveFile() {
    save('Sonosium.jpg');
}

function keyPressed() {
    if (keyCode === ENTER) {
        saveFile();
    }
}
