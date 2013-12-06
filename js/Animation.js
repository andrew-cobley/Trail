function Animation()
{
	this.img;

	this.frames = [];

	this.frame;

	this.frame_width, this.frame_height;
	this.mx, this.my;

	this.active;
	this.ticker;

	this.init = function(img,iw,ih,fw,fh,mx,my)
	{
 		this.img = new Image();
 		this.img.src = img;

		this.frame_width = fw;
		this.frame_height = fh;

		this.mx = mx;
		this.my = my;

		var di = Math.floor(iw / (fw + mx));
		for(var i=0; i < di; i++)
		{
			var x = mx + ((fw + mx) * i);
			var y = my;

			var frame = {x: x, y: y, w: fw, h: fh, duration: 0.1};
			
			this.frames.push(frame);
		}

		this.frame = 0;
		this.ticker = 0;

	}

	this.initInImageY = function(img,ix,iy,iw,ih,fw,fh,mx,my)
	{
		this.img = new Image();
 		this.img.src = img;

		this.frame_width = fw;
		this.frame_height = fh;

		this.mx = mx;
		this.my = my;

		var di = Math.floor(ih / (fh + my));
		for(var i=0; i < di; i++)
		{
			var x = ix + mx;
			var y = iy + my + ((fh + my) * i);

			var frame = {x: x, y: y, w: fw, h: fh, duration: 0.1};
			
			this.frames.push(frame);
		}

		this.frame = 0;
		this.ticker = 0;
	}

	this.update = function()
	{
		if(GAME_STATE === DRIVE)
		{
			this.active = true;
		}
		else
		{
			this.active = false;
		}
	}

	this.updateDT = function(dt)
	{
		if(this.active)
		{
			this.ticker += dt;
			if(this.ticker > this.frames[this.frame].duration)
			{
				this.ticker -= this.frames[this.frame].duration;
				this.frame++
				if(this.frame >= this.frames.length)
				{
					this.frame = 0;
				}

			}

		}

	}

	this.render = function(x,y)
	{
		context.drawImage(this.img, 
					   this.frames[this.frame].x, this.frames[this.frame].y,
					   this.frames[this.frame].w, this.frames[this.frame].h,
					   x,y,
					   this.frames[this.frame].w, this.frames[this.frame].h
					  );
	}

}





