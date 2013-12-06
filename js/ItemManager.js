function ItemManager()
{

	this.foods = [];


	this.init = function()
	{

		// [FOOD] INIT
		var apple = new Item();
		apple.init(this,'APPLE', 5, 5, 3, 0, 3);
		this.foods.push(apple);

		var bread = new Item();
		bread.init(this,'BREAD', 10, 10, 4, 0, 5);
		this.foods.push(bread);

		var beef = new Item();
		beef.init(this,'BEEF', 20, 10, 5, 30, 8);
		this.foods.push(beef);

	}

	this.update = function(dt)
	{


	}

	this.render = function()
	{


	}

}





