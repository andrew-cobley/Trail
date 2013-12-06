function PlayerManager()
{
	this.x, this.y;

	this.energy;
	this.energyMax = 400;

	this.hunger;
	this.hungerMax = 150;
	
	this.thirst;
	this.thirstMax = 100;

	this.money = 500;

	this.foods = new Array();
	this.eating = [];

	this.speed = 0;
	this.distance = 0;

	this.images = new Array();

	this.van;

	this.particle_system;

	this.init = function()
	{

		this.x = 0;
		this.y = 0;

		this.energy = this.energyMax;
		this.hunger = 0;

		var idle = new Image();
		idle.src = './assets/img/PLAYER-IDLE.png';

		var work = new Image();
		work.src = './assets/img/PLAYER-WORK.png';

		var sleep = new Image();
		sleep.src = './assets/img/PLAYER-SLEEP.png';

		var faint = new Image();
		faint.src = './assets/img/PLAYER-FAINT.png';

		this.van = new Van();
		this.van.init(this,40,150,162,54);

		this.images = [
			{img: idle, x: 127, y: 156},
			{img: idle, x: 127, y: 156},
			{img: idle, x: 127, y: 156},
			{img: idle, x: 230, y: 106},
			{img: work, x: 74, y: 152},
			{img: sleep, x: 58, y: 162},
			{img: idle, x: 127, y: 156},
			{img: idle, x: 127, y: 156},
			{img: idle, x: 127, y: 156},
			{img: faint, x: 127, y: 156}
		];

		// INIT INVENTORY
	
		for(var i=0; i<ITMANAGER.foods.length; i++)
		{
			var item = new Array();
			item.push(ITMANAGER.foods[i]);
			item.push(0);
			this.foods.push(item);
		}

		this.foods[0][1] = 1;
		this.foods[2][1] = 1;


		// Effects

		this.particle_image = new Image();
		this.particle_image.src = './assets/img/PARTICLE-SHEET.png';

		this.particle_system = new ParticleSystem();
		this.particle_system.init(this,this.particle_image,4,235,160,245,160);
	}

	this.tick = function()
	{

		// Check current state
		if(GAME_STATE === IDLE)
		{
			// [PARTICLES]
			var x = this.images[IDLE].x + 8;
			var y = this.images[IDLE].y - 10;
				

			var p = Math.floor(Math.random()*3);
			if(p > 0)
			{
				if(this.energyLow())
				{
					this.particle_system.new(0,0,x,y);
				}
			}

		}
		else if(GAME_STATE === DRIVE)
		{
			if(!this.van.broken)
			{
				// [PARTICLES]
				var x = this.images[DRIVE].x + 8;
				var y = this.images[DRIVE].y - 10;

				var p = Math.floor(Math.random()*3);
				if(p > 0)
				{
					if(this.energyLow())
					{
						this.particle_system.new(0,0,x,y);
					}
					else
					{
						var p = Math.floor(Math.random()*2);
						this.particle_system.new((p*10),10,x,y);
					}
				}
			}
		}		
		else if(GAME_STATE === EXPLORE)
		{
			// [PARTICLES]
			var x = this.images[EXPLORE].x - 2;
			var y = this.images[EXPLORE].y - 8;

			var p = Math.floor(Math.random()*24);
			if(p === 0)
			{
				var p = Math.floor(Math.random()*11);

				if(p <= 3)
				{
					this.particle_system.new(10,30,x,y);
					this.foods[0][1]++;
				}
				else if(p >= 4 && p <= 6)
				{
					this.particle_system.new(20,30,x,y);
					this.foods[1][1]++;
				}
				else if(p >= 7 && p <= 8)
				{
					this.particle_system.new(30,30,x,y);
					this.foods[2][1]++;
				}
				else if(p === 9)
				{
					this.particle_system.new(30,20,x,y);
					this.money += 20;
				}
				else if(p === 10)
				{
					this.particle_system.new(40,30,x,y);
					this.van.spare_wheel++;
				}
			}
			else
			{
				this.particle_system.new(0,30,x,y);
			}
		}
		else if(GAME_STATE === WORK)
		{
			// [MONEY ROLL]
			var mp = Math.floor(Math.random()*36);
			if(mp === 0)
			{
				this.money += Math.floor(Math.random()*20)+30;
			}


			// [PARTICLES]
			var x = this.images[WORK].x - 4;
			var y = this.images[WORK].y + 2;
			
			var p = Math.floor(Math.random()*3);
			if(p > 0)
			{
				if(this.energyLow())
				{
					this.particle_system.new(0,0,x,y);
				}
				else
				{
					var p = Math.floor(Math.random()*4);
					if(p === 3)
					{
						this.money++;
					}
					this.particle_system.new((p*10),20,x,y);
				}
			}
		}
		else if(GAME_STATE === SLEEP)
		{
			// [PARTICLES]
			var x = this.images[SLEEP].x + 35;
			var y = this.images[SLEEP].y - 10;
			
			var p = Math.floor(Math.random()*3);
			if(p > 0)
			{
				this.particle_system.new(0,0,x,y);
			}
		}
		else if(GAME_STATE === EAT)
		{
			if(this.eating.length > 0)
			{

			}
		}

		// PLAYER ENERGY UPDATE
		
		if(this.eating.length > 0)
		{
			this.hungerDown(this.eating[0][0].hunger);
			this.energyUp(this.eating[0][0].energy);

			this.eating[0][1]--;
			if(this.eating[0][1] <= 0)
			{
				this.eating.shift();
			}
		}

		this.van.tick();
		this.particle_system.tick();
	}

	this.update = function(dt)
	{
		if(this.energy > 0)
		{
			if(GAME_STATE === IDLE)
			{
				this.hungerUp(0.2*dt);
				this.energyUp(1*dt);
			}
			else if(GAME_STATE === DRIVE)
			{
				if(!this.van.broken)
				{
					this.hungerUp(0.4*dt);
					this.energyDown(8*dt);
				}
			}
			else if(GAME_STATE === FIX)
			{
				
			}
			else if(GAME_STATE === EXPLORE)
			{
				this.hungerUp(0.8*dt);
				this.energyDown(1*dt);
			}
			else if(GAME_STATE === WORK)
			{
				this.hungerUp(0.4*dt);
				this.energyDown(4*dt);
			}
			else if(GAME_STATE === SLEEP)
			{
				this.energyUp(5*dt);
			}
			else if(GAME_STATE === EAT)
			{
	
			}
			else if(GAME_STATE === BUY)
			{
	
			}
		}
		else
		{
			END_STATE = FAINT;
			GAME_STATE = FAINTED;
			PAUSED = true;
		}

		this.van.update(dt);
		this.particle_system.update(dt);
	}


	this.energyLow = function()
	{
		if(this.energy <= 200)
		{
			var d = Math.floor((this.energy*5)/200);
			var p = Math.floor(Math.random()*d);
			if(p === 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	this.energyUp = function(d)
	{
		this.energy += d;
		if( this.energy > (this.energyMax - this.hunger) )
		{
			this.energy = (this.energyMax - this.hunger);
		}
	}

	this.energyDown = function(d)
	{
		this.energy -= d;
		if(this.energy < 0)
		{
			this.energy = 0;
		}
	}

	this.hungerUp = function(d)
	{
		this.hunger += d;
		if(this.hunger > this.hungerMax)
		{
			this.hunger = this.hungerMax;
		}
	}

	this.hungerDown = function(d)
	{
		this.hunger -= d;
		if(this.hunger < 0)
		{
			this.hunger = 0;
		}
	}
	

	this.render = function()

	{
		context.drawImage(this.images[GAME_STATE].img,this.images[GAME_STATE].x,this.images[GAME_STATE].y);

		this.particle_system.render();
		this.van.render();
		
	}

}