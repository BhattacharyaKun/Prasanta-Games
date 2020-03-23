function createCanvas()
{
	createCanvas(displayWidth*pixelDensity, displayHeight*pixelDensity);
}

function draw()
{
	background(0);
	fill(255);
	circle(width/2, height/2, 50, 50);
}
