var drops = [], inc = 0.1, scl = 10, cols, rows, zoff = 0, fr, particles = [], flowfield;

function setup()
{
	sun = new Planet(50, 0, 0, random(TWO_PI));
  	sun.spawnMoons(5, 1);
	  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 10; i++) {
    particles[i] = new Particle();
  }
	for (var i = 0; i < 500; i++) 
	{
    	drops[i] = new Drop();
  	}
}

function draw()
{
	createCanvas(windowWidth-25, windowHeight-30);
  	background(0);
  	for (var i = 0; i < drops.length; i++) {
    	drops[i].fall();
		drops[i].show();
	}
	push();
	translate(windowWidth/2, windowHeight/2);
	sun.show();
	sun.orbit();
	pop();
	  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}