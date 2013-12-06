function Status()
{
	this.text;
	
	this.tick, this.tickTo;


	this.init = function(min,max,txt)
	{
 		this.text = txt;
		
		this.tick = 0;

		var scope = (max/5) - (min/5) + 1;
		this.tickTo = Math.floor((Math.random()*scope)+(min/5));
		//console.log(this.text + " for " + this.tickTo*5 + " minutes");
	}

	this.update = function()
	{
		this.tick++;
	}

	this.render = function()
	{


	}

}




