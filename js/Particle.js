function Particle()

{

	this.parent;

	this.image;
	this.imageX;
	this.imageY;
	this.imageW;
	this.imageH;

	this.opacity;

	this.x = 0;

	this.y = 0;

	this.vx = 0;

	this.vy = 0;

	this.ix = 0;

	this.iy = 0;


	this.time = 0;

	this.life = 0;

	this.dead = true;


	
this.init = function(parent,img)

	{
		this.parent = parent;

		this.image = img;

		this.imageX = 0;
		this.imageY = 0;
		this.imageW = 0;
		this.imageH = 0;

		this.opacity = 0;

		this.x = 0;

		this.y = 0;

		this.vx = 0;

		this.vy = 0;

		this.ix = 0;

		this.iy = 0;


		this.time = 0;

		this.dead = true;

		this.life = 0;
	}



	this.new = function(imgX,imgY,x,y)

	{
		this.imageX = imgX;
		this.imageY = imgY;
		this.imageW = 10;
		this.imageH = 10;

		this.x = x;
		this.y = y;

		this.opacity = 1;

		this.time = 0;

		this.dead = false;

		this.life = 3.5;

		//console.log("[NEW PARTICLE img:" + this.image.src + " x:" + this.x + " y:" + this.y + "]");
	}

	this.render = function()

	{

		context.save();

		context.globalAlpha = this.opacity;
		context.drawImage(this.image,this.imageX,this.imageY,this.imageW,this.imageH,this.x,this.y,this.imageW,this.imageH);
		context.restore();

	}

}