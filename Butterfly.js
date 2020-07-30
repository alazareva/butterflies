class Butterfly {
  constructor() {
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.update_rate = floor(random(25, 50));
    this.maxSpeed = 1;
    this.rest_time = floor(random(100, 300));
    this.resting = false;
    this.rest_start = null;
    this.rest_stop = 0;
    this.start_image = floor(random(8));
    this.size = floor(random(30, 70));
    this.position = createVector(random(this.size, width - this.size), random(this.size, height - this.size));
  }

  update(i) {
    // fly away from the mouse, stop resting if mouse is close while resting
    if (dist(this.position.x, this.position.y, mouseX, mouseY) < 20) {
      this.velocity.add(mouse_velocity())
      if (this.resting) {
        this.resting = false;
        this.rest_stop = i;
      }
    }
    //
    if (!this.resting) {
      // add a random rotation
      if (i % this.update_rate == 0) {
        this.velocity.rotate(random(-0.5, 0.5))
      }
      this.position.add(this.velocity);
      this.velocity.limit(this.maxSpeed);

      // if close to a wall, turn away
      if ((this.position.x + this.size / 2 > width) || (this.position.x - this.size / 2 < 0)) {
        this.velocity.x = this.velocity.x * -1;
      }
      if ((this.position.y + this.size / 2 > height) || (this.position.y - this.size / 2 < 0)) {
        this.velocity.y = this.velocity.y * -1;
      }

      // if over a resting spot, randomly take a rest
      if (this.over_surface()) {
        let should_rest = random(10000);
        if (should_rest > (10000 - (i - this.rest_stop))) {
          this.resting = true;
          this.rest_start = i;
        }
      }
    } else {
      // stop resting if has rested enough
      if (this.rest_start + this.rest_time <= i) {
        this.resting = false;
        this.rest_stop = i;
      }
    }
  }

  // checks to see if the off screen canvas has a black pixel around position (x, y)
  over_surface() {
    let top = off_screen_canvas.get(this.position.x, this.position.y - 2);
    let bottom = off_screen_canvas.get(this.position.x, this.position.y + 2);
    let left = off_screen_canvas.get(this.position.x - 2, this.position.y);
    let right = off_screen_canvas.get(this.position.x + 2, this.position.y);
    return is_black_pixel(top) && is_black_pixel(bottom) && is_black_pixel(left) && is_black_pixel(right);
  }

  show(i) {
    strokeWeight(10);
    stroke(360, 100, 100, 50);
    fill(360, 100, 100, 100);
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    let theta = this.velocity.heading() + radians(90);
    rotate(theta);
    // move on to the next imgage once every two iterations for moving, once every 6 for resting
    let f = this.resting ? floor(i / 6) : floor(i / 2);
    let img = images[(this.start_image + f) % 16]
    //img.drawingContext.fillStyle = '#475731'
    image(img, 0, 0, this.size, this.size);
    pop();
    //point(this.position.x, this.position.y);
  }
}