let mic, fft, loc, locw;
let amt, startColor, newColor;
var prevX = 0,
    prevY = 0;
var blobs = [];
let spectrum;
let colorCtr = 0;
var COLORS2 = ['#000', '#C70039', '#581845', '#FFC300', '#900C3F', '#DAF7A6', '#C70039'];
var COLORS = ['#333', '#444', '#AAA', '#333', '#BBB', '#333'];
var tag;
var clicked = false;
var cToStart;

function preload() {
    cToStart = loadImage("img/touch.png");
}

function setup() {
    if (windowWidth >= windowHeight) {
        createCanvas(windowHeight, windowHeight);
    } else {
        createCanvas(windowWidth, windowWidth);
    }
    background(255);
    textFont("Muli");
    //init mic input
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    spectrum = fft.analyze();
    //initialize blobs
    for (i = 0; i < 150; i += 10) {
        blob = new blobb(i * 0.8, 100, width / 30);
        blobs.push(blob);
    }
    stroke(120);
    strokeWeight(width / 100);
    fill(231, 222, 212);
    rect(0, 0, width, height);
    tag = random(123456789, 987654321);
}

function windowResized() {
    if (windowWidth >= windowHeight) {
        createCanvas(windowHeight, windowHeight);
    } else {
        createCanvas(windowWidth, windowWidth);
    }
    background(255);
    stroke(120);
    strokeWeight(width / 100);
    fill(231, 222, 212);
    rect(0, 0, width, height);
}
let ctr = 0;

function draw() {
    noStroke();
    fill(231, 222, 212);
    rect(width * 0.33, height * 0.8, width / 3, width / 10);
    fill(190, 48, 51);
    noStroke();
    textSize(width / 20);
    textStyle(BOLD);
    text("sonosium", width * 0.385, height * 0.85);
    fill(20);
    textSize(width / 100);
    textStyle(NORMAL);
    text(tag, width * 0.45, height * 0.88);
    translate(width / 2, height * 0.4);
    spectrum = fft.analyze();
    let waveform = fft.waveform();
    for (i = 0; i < 150; i += 10) {
        d = map(spectrum[i], 0, 255, 0, 1);
        blobs[ctr].move(d);
        blobs[ctr].display();
        ctr++;
    }
    ctr = 0;
    fill(231, 222, 212);
    ellipse(0, 0, width / 5, width / 5);
    if (!clicked) {
        fill(255);
        noStroke();
        rect(-width / 2, -height * 0.4, width, height);
        image(cToStart, 0, 0, 50, 80);
    }
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
        this.charcoal = new charcoal(this.x, this.y, this.diameter, width / 150, this.color);
    }

    move(dist) {
        if (dist > 0.5) {
            dist = dist;
        } else if (dist > 0.1 && dist <= 0.5) {
            dist = -dist;
        } else {
            dist = 0;
        }
        if (this.pDis >= dist) {
            this.inc += dist;
        } else {
            this.inc -= dist;
        }
        this.pDis = dist;
        this.inc += dist;
        this.x = sin(this.inc / 10) * 100 * this.spacing / 300 * (width / 120);
        this.y = cos(this.inc / 10) * 100 * this.spacing / 300 * (width / 120);
    }

    display() {
        let c = this.color;
        fill(color(c));
        this.charcoal.show(this.x, this.y, this.color);
    }
}

class charcoal {
    constructor(x, y, brushSize, particleSize, colour) {
        this.x = x;
        this.y = y;
        this.randx = [];
        this.randy = [];
        this.pt = [];
        for (var i = 0; i < 50; i++) {
            this.randx[i] = random(-brushSize, brushSize);
            this.randy[i] = random(-brushSize, brushSize);
            this.pt[i] = random(0, particleSize);
        }
        this.rad = brushSize;
        this.col = colour;
    }
    show(x, y, col) {
        noStroke();
        fill(col);
        for (var i = 0; i < 50; i++) {
            ellipse(x + this.randx[i], y + this.randy[i], this.pt[i] + 5, this.pt[i]);
        }
    }
}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        clicked = true;
        background(255);
        stroke(120);
        strokeWeight(width / 100);
        fill(231, 222, 212);
        rect(-width / 2, -height * 0.4, width, height);
    }
}

function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        clicked = true;
        background(255);
        stroke(120);
        strokeWeight(width / 100);
        fill(231, 222, 212);
        rect(-width / 2, -height * 0.4, width, height);
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
