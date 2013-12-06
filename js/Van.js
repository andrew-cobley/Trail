function Van()
{
	this.parent;

	this.x, this.y;
	this.width, this.height;

	this.img = new Image();

	this.speed, this.distance;

	this.active;
	this.broken;

	this.wheel_front, this.wheel_rear;

	this.spare_wheels;


	this.init = function(parent,x,y,w,h)
	{
		this.parent = parent;

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.img.src = './assets/img/VAN.png';

		this.speed = 0
		this.distance = 0;

		this.active = false;
		this.broken = false;

		this.wheel_rear = new Wheel();
		this.wheel_rear.init(this,56,this.y+38,28,28);

		this.wheel_front = new Wheel();
		this.wheel_front.init(this,162,this.y+38,28,28);

		this.spare_wheels = 2;
		
	}

	this.tick = function()
	{
		if(this.active)
		{
			this.speed = (Math.floor(Math.random()*9)+(SPEED_TERRAIN_MAX-9)) - Math.floor(Math.pow((3 - ((this.parent.energy / this.parent.energyMax) * 3)),2));

			this.wheel_front.tick();
			this.wheel_rear.tick();
		}
		else
		{
			this.speed = 0;
		}
	}

	this.update = function(dt)
	{

		if(GAME_STATE === DRIVE && !this.broken)
		{
			if(this.active)
			{
				this.distance += (this.speed / 12) * dt;
			}
			else
			{
				this.active = true;
				this.speed = (Math.floor(Math.random()*9)+(SPEED_TERRAIN_MAX-9)) - Math.floor(Math.pow((3 - ((this.parent.energy / this.parent.energyMax) * 3)),2));
			}
		}
		else
		{
			this.speed = 0;
			this.active = false;
		}

		this.wheel_front.update(dt);
		this.wheel_rear.update(dt);

	}

	this.broke = function()
	{
		this.broken = true;
		//console.log("R> " + this.wheel_rear.broken + " F> " + this.wheel_front.broken);
		//console.log("The van cannot move!");
		//console.log("Spare Wheels: " + this.spare_wheels);
		GAME_STATE = IDLE;
	}

	this.changeWheel = function(wheel)
	{
		if(this.spare_wheels > 0)
		{
			wheel.reset();
			this.spare_wheels--;
			this.broken = false;
			return true;
		}
		else
		{
			return false;
		}
	}

	this.render = function()
	{
		context.drawImage(this.img,this.x,this.y);
		this.wheel_front.render();
		this.wheel_rear.render();
	}


}