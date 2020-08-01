// colors
const dark_pink = '#F2B7AE';
const dark_gray = '#777271';

const butterflies = [];
const images = [];
var off_screen_canvas;
const num_butterflies = 20;


// for debugging
function mousePressed() {
  console.log(off_screen_canvas.get(mouseX, mouseY))
}

function is_black_pixel(arr) {
  return arr[0] == 0 && arr[1] == 0 && arr[2] == 0;
}

function mouse_velocity() {
  return createVector(winMouseX - pwinMouseX, winMouseY - pwinMouseY);
}
function draw_off_screen(off_screen_canvas){
  with (off_screen_canvas) {
    background(360);
    // draw the text
    fill(0);
    noStroke();
    textSize(200);
    textAlign(CENTER);
    text('Hello World', windowWidth / 2, 400);
  }
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  var canvas = createCanvas(windowWidth, 600);
  canvas.parent("canvas");
  off_screen_canvas = createGraphics(windowWidth, 600);
  draw_off_screen(off_screen_canvas);
  for (let i = 0; i < num_butterflies; i++) {
    butterflies.push(new Butterfly());
  }
  for (let i = 1; i < 9; i++) {
    images.push(loadImage('./svg/b' + i + '.svg'));
  }
  for (let i = 8; i > 0; i--) {
    images.push(loadImage('./svg/b' + i + '.svg'));

  }
}

function draw() {
  background(360);
  fill(dark_pink);
  noStroke();
  textSize(200);
  textAlign(CENTER);
  text('Hello World', windowWidth / 2, 400);
  for (let butterfly of butterflies) {
    butterfly.show(frameCount);
    butterfly.update(frameCount);
  }
}