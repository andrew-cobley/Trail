function BackgroundManager()
{

	this.BACKGROUNDS = [];

	this.BG_CUR = new Image();
	this.BG_CUR_X, this.BG_CUR_Y;

	this.BG_NXT = new Image();

	this.BG_PIXELS_PER_KM = 0;
	this.BG_SPEED_PER_SEC = 0;

	this.init = function()
	
	{
		for(var i=0; i<backgrounds.length; i++)
		{
			var img = new Image();
			img.src = './assets/img/bg/' + backgrounds[i] + '.png';
			this.BACKGROUNDS[i] = img;
		}

		this.BG_CUR = this.BACKGROUNDS[parseInt(ROUTE[ROUTE_TICK][5])];
		this.BG_NXT = this.BACKGROUNDS[parseInt(ROUTE[ROUTE_TICK+1][5])];

		this.BG_CUR_X = 0;
		this.BG_CUR_Y = 0;

		this.BG_PIXELS_PER_KM = 19.2;
		this.BG_SPEED_PER_SEC = 0;
	}

	this.update = function(dt)
	{
		this.BG_CUR_X -= this.BG_SPEED_PER_SEC * dt;
		if(this.BG_CUR_X <= -480)
		{
			ROUTE_TICK++;
			//console.log("ROUTE>>" + ROUTE_TICK);
			
			if(ROUTE_TICK < ROUTE.length - 2)
			{
				this.BG_CUR = this.BG_NXT;
				this.BG_NXT = this.BACKGROUNDS[parseInt(ROUTE[ROUTE_TICK+1][5])];
				this.BG_CUR_X = 0;
			}
			else
			{
				END_STATE = 1;
				PAUSED = true;
			}
		}
	}

	this.forceUpdate = function()
	{
		if(ROUTE_TICK < ROUTE.length - 2)
		{
			this.BG_CUR = this.BACKGROUNDS[parseInt(ROUTE[ROUTE_TICK][5])];
			this.BG_NXT = this.BACKGROUNDS[parseInt(ROUTE[ROUTE_TICK+1][5])];
			//console.log("ROUTE UPDATE (" + ROUTE_TICK + ")");
		}
		else
		{
			END_STATE = 1;
			PAUSED = true;
		}
	}

	this.updateSpeed = function(spd)
	{
		this.BG_SPEED_PER_SEC = ((spd / 12) * this.BG_PIXELS_PER_KM);
	}


	this.render = function()
	{
		context.drawImage(this.BG_CUR, this.BG_CUR_X, this.BG_CUR_Y);
		context.drawImage(this.BG_NXT, this.BG_CUR_X+480, this.BG_CUR_Y);
	}

}