function Wheel()
{
	this.parent;

	this.x, this.y;

	this.width, this.height;

	this.animations = new Array();
	this.smoke, this.fire;

	this.ticker;
	this.life;
	this.active;
	this.state;

	this.broken;

	WHEEL_STATE_FINE = 0;
	WHEEL_STATE_DYING = 1;
	WHEEL_STATE_SMOKE = 2;
	WHEEL_STATE_FIRE = 3;
	WHEEL_STATE_DEAD = 4;

	this.init = function(parent,x,y,w,h)
	{
		this.parent = parent;

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		var a = new Array('./assets/img/WHEEL-FINE.png','./assets/img/WHEEL-DYING.png','./assets/img/WHEEL-DYING.png','./assets/img/WHEEL-DYING.png','./assets/img/WHEEL-DEAD.png');
		
		for(var i=0; i<a.length; i++)
		{
			var ai = new Animation();
			ai.init(a[i],122,32,this.width,this.height,2,2);
			this.animations.push(ai);
		}

		this.smoke = new Animation;
		this.smoke.init('./assets/img/WHEEL-EFFECT-SMOKE.png',28,28,28,28,0,0);
		
		this.fire = new Animation();
		this.fire.init('./assets/img/WHEEL-EFFECT-FIRE.png',28,28,28,28,0,0);

		this.reset();
		
	}

	this.reset = function()
	{

		this.ticker = 0;
		this.life = Math.floor(Math.random()*40)+40;

		this.active = false;
		this.state = WHEEL_STATE_FINE;

		this.broken = false;
	}

	this.tick = function()
	{

		//console.log(this.ticker + "/" + this.life);

		if(this.active)
		{
			if(this.state === WHEEL_STATE_FINE)
			{
				this.ticker++;
				if(this.ticker >= this.life)
				{
					this.state = WHEEL_STATE_DYING;
				}
			}
			else if(this.state === WHEEL_STATE_DYING)
			{
				var p = Math.floor(Math.random()*4);
				
				if(p === 0)
				{
					this.state = WHEEL_STATE_SMOKE;
				}
				
			}
			else if(this.state === WHEEL_STATE_SMOKE)
			{
				var p = Math.floor(Math.random()*6);
				
				if(p === 0)
				{
					this.state = WHEEL_STATE_FIRE;
				}
			}
			else if(this.state === WHEEL_STATE_FIRE)
			{
				var p = Math.floor(Math.random()*4);
				
				if(p === 0)
				{
					this.state = WHEEL_STATE_DEAD;
					this.active = false;
					this.broken = true;
					//console.log("The van has a puncture!");
					this.parent.broke();
				}
			}
			else if(this.state === WHEEL_STATE_DEAD)
			{
		
			}
		}

		this.animations[this.state].update();

	}

	this.update = function(dt)
	{
		if(GAME_STATE === DRIVE && !this.broken)
		{
			if(this.active)
			{
				this.animations[this.state].updateDT(dt);
			}
			else
			{
				this.active = true;
				this.animations[this.state].update();
			}

		}
		else
		{
			this.active = false;
		}
	}

	this.render = function()
	{

		this.animations[this.state].render(this.x,this.y);
	
		if(this.state === WHEEL_STATE_SMOKE)
		{
			this.smoke.render(this.x, this.y-20);
		}
		else if(this.state === WHEEL_STATE_FIRE)
		{
			this.fire.render(this.x, this.y-20);
		}
	}


}