function Message()
{
	this.parent;
	this.x, this.y;
	this.cx, this.cy;
	this.tx, this.ty;
	this.width, this.height;
	this.background;
	this.text;
	this.close_button;
	this.visible;

	this.init = function(parent,id,x,y,w,h,bg,txt)
	{
		this.parent = parent;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.cx = this.x + (this.width/2);
		this.cy = this.y + (this.height/2);

		this.background = bg;
		this.text = txt;

		this.tx = this.cx - (context.measureText(this.text).width/2);
		this.ty = this.y + 25;

		var str = 'close';
		str_tx = context.measureText(str).width;

		this.close_button = new Button();
		this.close_button.init(this,id,((this.width/2)-((str_tx/2)+20)),this.height-40,str_tx+40,30,BUTTON_COMMAND,0,'CLOSE','');
		this.close_button.select_command = function()
		{
			var self = IFMANAGER.messages[this.id];
			//console.log("Close Message");
			this.visible = false;
			this.parent.visible = false;
			MESSAGE_FLAG = false;
		}

		this.visible = false;
		
	}

	this.update = function(dt)
	{
		
	}

	this.render = function()
	{
		if(this.visible)
		{
			context.save();

			context.beginPath();
			context.fillStyle = this.background;
			context.rect(this.x,this.y,this.width,this.height);
			context.closePath();
     			context.fill();

			context.fillStyle = "white";
			context.fillText(this.text, this.tx, this.ty);
	
			context.restore();

			this.close_button.render();
		}

	}

}