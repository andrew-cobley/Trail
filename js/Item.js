function Item()
{
	this.parent;

	this.name;
	this.cost;
	this.energy;
	this.hunger;

	this.init = function(parent, name, cost, energy, hunger, prep, ticks)
	{
		this.parent = parent;
		
		this.name = name;
		this.cost = cost;
		this.energy = energy;
		this.hunger = hunger;

		this.prep = prep;
		this.ticks = ticks;
	}

	this.update = function(dt)
	{


	}

	this.render = function()
	{


	}

}





