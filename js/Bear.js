function Bear()
{
	this.x, this.y;

	this.image;

	this.frames = [];
	this.frame;
	this.opacity;

	this.probability;
	this.life;
	this.active;

	this.boost;

	this.dead;

	this.init = function()
	{

		this.x = 0;
		this.y = 0;

		this.image = new Image();
		this.image.src = './assets/img/BEAR.png';

		this.frames[0] = [0,0,56,44];
		this.frames[1] = [0,44,56,44];
		this.frames[2] = [0,88,56,44];
		this.frames[3] = [0,132,22,20];

		this.opacity = 1;

		this.probability = 10;
		this.life = 0;
		this.active = false;

		this.boost = 0;

		this.dead = false;

		// Effects

		this.particle_image = new Image();
		this.particle_image.src = './assets/img/PARTICLE-SHEET.png';

		this.particle_system = new ParticleSystem();
		this.particle_system.init(this,this.particle_image,4,235,160,245,160);
	}

	this.tick = function()
	{
		if(!this.dead)
		{
			if(GAME_STATE === IDLE)
			{
				if(!this.active)
				{

				}
				
			}
			else if(GAME_STATE === DRIVE)
			{
				if(!this.active)
				{
					var p = Math.floor(Math.random()*this.probability);
					if(p === 0)
					{
						this.active = true;
						this.x = 485;
						this.y = 170;
						this.opacity = 1;
						this.frame = 0;

						this.boost = 300 - ((PRMANAGER.energy / PRMANAGER.energyMax) * 300);
					}
				}
				else
				{
					//this.particle_system.new(0,0,this.x,this.y);
				}
			}
			else if(GAME_STATE === FIX)
			{
				if(!this.active)
				{

				}
			}
			else if(GAME_STATE === EXPLORE)
			{
				if(!this.active)
				{
					var p = Math.floor(Math.random()*(this.probability));
					if(p === 0)
					{
						this.active = true;
						this.x = 124;
						this.y = 155;
						this.opacity = 1;
						this.frame = 3;
						this.life = 0;

						//this.boost = 300 - ((PRMANAGER.energy / PRMANAGER.energyMax) * 300);
					}
				}
			}
			else if(GAME_STATE === WORK)
			{
				if(!this.active)
				{
					var p = Math.floor(Math.random()*(this.probability));
					if(p === 0)
					{
						this.active = true;
						this.x = -10;
						this.y = 170;
						this.opacity = 1;
						this.frame = 2;

						//this.boost = 300 - ((PRMANAGER.energy / PRMANAGER.energyMax) * 300);
					}
				}
				else
				{
					// [PARTICLES]
					var x = this.x + 32;
					var y = this.y - 10;
		
					var p = Math.floor(Math.random()*6);
					if(p === 0)
					{
						var p = Math.floor(Math.random()*9);
		
						if(p <= 1)
						{
							if(PRMANAGER.foods[0][1] > 1)
							{
								this.particle_system.new(10,30,x,y);
								PRMANAGER.foods[0][1]--;
							}
						}
						else if(p >= 2 && p <= 3)
						{
							if(PRMANAGER.foods[1][1] > 0)
							{
								this.particle_system.new(20,30,x,y);
								PRMANAGER.foods[1][1]--;
							}
						}
						else if(p >= 4 && p <= 5)
						{
							if(PRMANAGER.foods[2][1] > 0)
							{
								this.particle_system.new(30,30,x,y);
								PRMANAGER.foods[2][1]--;
							}
						}
						else if(p >= 6 && p <= 7)
						{
							if(PRMANAGER.money > 20)
							{
								this.particle_system.new(30,20,x,y);
								PRMANAGER.money -= 20;
							}
						}
						else if(p === 8)
						{
							if(PRMANAGER.van.spare_wheel > 1)
							{
								this.particle_system.new(40,30,x,y);
								PRMANAGER.van.spare_wheel--;
							}
						}
					}
					else
					{
						this.particle_system.new(0,30,x,y);
					}
				}
			}
			else if(GAME_STATE === SLEEP)
			{
				if(!this.active)
				{

				}
			}
			else if(GAME_STATE === EAT)
			{
				if(!this.active)
				{

				}	
			}
			else if(GAME_STATE === BUY)
			{
				if(!this.active)
				{
			
				}
			}

			this.particle_system.tick();

		}
		
	}

	this.update = function(dt)
	{
		if(!this.dead)
		{
			if(GAME_STATE === IDLE)
			{
				// Fade Away
				if(this.active)
				{
					this.opacity -= 0.01;
					if(this.opacity <= 0.5)
					{
						this.opacity = 0;
						this.active = false;
						this.life = 0;
					}
				}
				
			}
			else if(GAME_STATE === DRIVE)
			{
				// Update X with Vehicle Speed

				if(this.active)
				{
					this.x -= (BGMANAGER.BG_SPEED_PER_SEC + this.boost) * dt;
				
					// Check for collision
					if(this.x < 190)
					{
						//console.log("You hit a bear and got thrown out of Canada!");
						this.dead = true;
						this.frame = 1;
						END_STATE = CRASH;
						PAUSED = true;
					}
				}

			}
			else if(GAME_STATE === FIX)
			{
				if(this.active)
				{
					//Something?
				}
			}
			else if(GAME_STATE === EXPLORE)
			{
				if(this.active)
				{
					this.life += dt;
					if(this.life >= 3)
					{
						//console.log("A bear stole your car!");
						END_STATE = ABANDONNED;
						PAUSED = true;
					} 
				}
			}
			else if(GAME_STATE === WORK)
			{
				if(this.active)
				{
					//Sit on roof
				}
			}
			else if(GAME_STATE === SLEEP)
			{
				if(this.active)
				{
					//Sleep too
				}
			}
			else if(GAME_STATE === EAT)
			{
				if(this.active)
				{
					//Steal food
				}	
			}
			else if(GAME_STATE === BUY)
			{
				if(this.active)
				{
					//Steal food
				}
			}

			this.particle_system.update(dt);

		}
	}

	

	this.render = function()
	{
		if(this.active)
		{
			context.save();

			context.globalAlpha = this.opacity;
			context.drawImage(this.image,
								this.frames[this.frame][0],this.frames[this.frame][1],
								this.frames[this.frame][2],this.frames[this.frame][3],
								this.x,this.y,
								this.frames[this.frame][2],this.frames[this.frame][3]
							 );
			context.restore();

			this.particle_system.render();
		}
		
	}

}