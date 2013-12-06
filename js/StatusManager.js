function StatusManager()
{

	this.status_log;

	this.status_current;
	
	this.status_rest = new Array(	[30,60,'Joe is snoozing'],
					[15,45,'Joe has his feet up'] );


	this.init = function()
	{
		this.status_log = new Array();

		this.status_current = new Status();

		var st = Math.floor(Math.random()*this.status_rest.length);
		this.status_current.init(this.status_rest[st][0],this.status_rest[st][1],this.status_rest[st][2]);
	}

	this.update = function()
	{
		this.status_current.update();

		if(this.status_current.tick >= this.status_current.tickTo)
		{
			var st = Math.floor(Math.random()*this.status_rest.length);
			this.status_current.init(this.status_rest[st][0],this.status_rest[st][1],this.status_rest[st][2]);
		}

		//console.log(this.status_current.text + " > " + this.status_current.tick*5 + "/" + this.status_current.tickTo*5);
	}

	this.render = function()
	{


	}

}




