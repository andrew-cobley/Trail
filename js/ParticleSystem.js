function ParticleSystem()

{

	this.parent;
	
	this.x0;

	this.x1;

	this.y0;

	this.y1;


	this.n = 0;


	this.particles = [];

	this.particle = 0;

	this.offsets = [0,0.5,1,0.5];

	this.image;

	this.gravity = 0;


	this.active = 0;
	



	this.init = function(parent,img,n,x0,y0,x1,y1)

	{

		this.parent = parent;

		this.n = n;

		this.x0 = x0;

		this.x1 = x1;

		this.y0 = y0;

		this.y1 = y1;

		this.active = n;


		this.image = img;

		
for(var i=0; i<n; i++)

		{
			this.particles[i] = new Particle();
			this.particles[i].init(this, this.image);
		}
	
}



	this.new = function(imgX,imgY,x,y)
	{
		this.particles[this.particle].new(imgX,imgY,x+(this.offsets[this.particle] * 12),y);
	}
	
	this.tick = function()

	{

		// ---> MOVE ON TO NEXT PARTICLE SLOT
		this.particle++;
		if(this.particle >= this.particles.length)
		{
			this.particle = 0;
		}
	}

	this.update = function(dt)

	{


		for(var i=0; i<this.particles.length; i++)

		{

			if(this.particles[i].dead === false)

			{

				if(this.particles[i].time < this.particles[i].life)

				{

					//console.log("Update Particle [" + i + "]");
					tmpY = this.particles[i].y - (dt * 10);
					this.particles[i].time += dt;

 		
			this.particles[i].y = tmpY;

				
					if(this.particles[i].time > (this.particles[i].life-2))
					{
						this.particles[i].opacity -= (dt/2);
						if(this.particles[i].opacity < 0)
						{
							this.particles[i].opacity = 0;
						}
						//console.log("Update Particle [" + i + "] Time: " + this.particles[i].time + " Opacity: " + this.particles[i].opacity);
					}
				}

				else

				{

					this.particles[i].dead = true;

					this.active--;
	
				}

			}

		}

	}


	this.render = function()

	{

		for(var i=0; i<this.particles.length; i++)

		{

			if(this.particles[i].dead === false)

			{

				this.particles[i].render();

			}

		}

	}


}