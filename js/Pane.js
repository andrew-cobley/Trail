function Pane()
{

	this.x, this.y;
	this.width, this.height;

	this.background;

	this.buttons;

	this.visible;

	this.init = function(x,y,w,h,bg)
	{

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.background = bg;

		this.buttons = new Array();

		this.visible = false;
		
	}

	this.update = function(dt)
	{

		
	}

	this.addButton = function(id,x,y,w,h,type,lnk,txt,state)
	{
		var button = new Button();
		button.init(this,id,x,y,w,h,type,lnk,txt,state);
		this.buttons.push(button);
		return button;
	}

	this.render = function()
	{
		context.save();

		context.beginPath();
		context.fillStyle = this.background;
		context.rect(this.x,this.y,this.width,this.height);
		context.closePath();
     	context.fill();
	
		context.restore();

		for(var i=0; i<this.buttons.length; i++)
		{
			this.buttons[i].render();
		}
	}

}