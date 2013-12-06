function DaylightManager()
{

	this.sunrise = new Date(2013,03,01,06,30,32.7);
	this.sunset = new Date(2013,03,01,19,00,54.5);

	this.daysLengthening = true;

	this.sunriseTriggered = true;
	this.sunriseActive = false;

	this.sunsetTriggered = false;
	this.sunsetActive = false;

	// Lighting Variables

	var LIGHT_LEVEL_MAX = 0;
	var LIGHT_LEVEL_MIN = 1;

	this.curLightLevel = LIGHT_LEVEL_MAX;
	this.targetLightLevel = this.curLightLevel;

	// Filter Images
	
	this.filterDay = new Image();
	this.filterDay.src = './assets/img/bg/FILTER-DAY.png';

	this.filterNight = new Image();
	this.filterNight.src = './assets/img/bg/FILTER-NIGHT.png';

	this.init = function()
	{

	}

	this.tick = function(dt)
	{
		this.check();

		if(this.sunriseActive)
		{
		//console.log("SunriseActive, Light Level: " + this.curLightLevel + "(" + this.targetLightLevel + ")");
			if(this.targetLightLevel < (this.curLightLevel-0.05))
			{
				this.curLightLevel -= 0.1;
			}
			else
			{
				this.curLightLevel = this.targetLightLevel;
				this.sunriseActive = false;
			}
		}
		else if(this.sunsetActive)
		{
		//console.log("SunsetActive, Light Level: " + this.curLightLevel + "(" + this.targetLightLevel + ")");
			if(this.targetLightLevel > (this.curLightLevel+0.05))
			{
				this.curLightLevel += 0.1;
			}
			else
			{
				this.curLightLevel = this.targetLightLevel;
				this.sunsetActive = false;
			}
		}		
		
	}

	this.render = function()
	{
		context.drawImage(this.filterDay, 0, 0);

		context.save();

		context.globalAlpha = this.curLightLevel;
		context.drawImage(this.filterNight, 0, 0);
		context.restore();
	}

	this.set = function()
	{
		if(this.daysLengthening)
		{
			var nDay = this.sunrise.getDate()+1;
		
			this.sunrise.setDate(nDay);
			this.sunrise.setSeconds(this.sunrise.getSeconds()-SUNRISE_DEC_SECS);

			this.sunset.setDate(nDay);
			this.sunset.setSeconds(this.sunset.getSeconds()+SUNSET_INC_SECS);
		
			if( SUNRISE_EARLIEST.getMonth() === this.sunrise.getMonth() )
			{
				this.sunrise.setTime(SUNRISE_EARLIEST.getTime());
				this.sunset.setTime(SUNSET_LATEST.getTime());
				this.daysLengthening = false;
			
				SUNRISE_EARLIEST.setFullYear(SUNRISE_EARLIEST.getFullYear+1);
				SUNSET_LATEST.setFullYear(SUNSET_LATEST.getFullYear+1);
			}

		}
		else
		{
			var nDay = this.sunrise.getDate()+1;
		
			this.sunrise.setDate(nDay);
			this.sunrise.setSeconds(this.sunrise.getSeconds()+SUNRISE_INC_SECS);

			this.sunset.setDate(nDay);
			this.sunset.setSeconds(this.sunset.getSeconds()-SUNSET_DEC_SECS);
		
			if( SUNRISE_LATEST.getMonth() === this.sunrise.getMonth() )
			{
				this.sunrise.setTime(SUNRISE_LATEST.getTime());
				this.sunset.setTime(SUNSET_EARLIEST.getTime());
				this.daysLengthening = true;

				SUNRISE_LATEST.setFullYear(SUNRISE_LATEST.getFullYear+1);
				SUNSET_EARLIEST.setFullYear(SUNSET_EARLIEST.getFullYear+1);
		
			}
		}

		this.sunriseTriggered = false;
		this.sunsetTriggered = false;

	}

	this.check = function()
	{
		if(!this.sunriseTriggered)
		{
			if( gDate.getTime() > this.sunrise.getTime() )
			{
				this.sunriseTriggered = true;
				//console.log("Sunrise");
				this.changeDaylightTo(LIGHT_LEVEL_MAX);
				this.sunriseActive = true;
			}
		}
		else if(!this.sunsetTriggered)
		{
			if( gDate.getTime() > this.sunset.getTime() )
			{
				this.sunsetTriggered = true;
				//console.log("Sunset");
				this.changeDaylightTo(LIGHT_LEVEL_MIN);
				this.sunsetActive = true;
			}
		}
	}

	this.changeDaylightTo = function(x)
	{
		this.targetLightLevel = x;
		this.tick();
	}

}