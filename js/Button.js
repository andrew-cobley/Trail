function Button()
{
	this.parent;

	this.id;
	
	this.x, this.y;
	this.x2, this.y2;

	this.width, this.height;
	this.cx, this.cy;
	this.tx, this.ty;

	this.image;
	this.ix, this.iy;

	this.bg_not_selected,this.bg_selected;

	this.type;
	this.link;
	this.text;
	this.state;

	this.visible;

	this.message;

	this.init = function(parent,id,x,y,w,h,type,lnk,txt,state)
	{
		this.parent = parent;

		this.id = id;

		this.x = this.parent.x + x;
		this.y = this.parent.y + y;
		this.width = w;
		this.height = h;

		this.x2 = this.x + this.width;
		this.y2 = this.y + this.height;
		this.cx = this.x + (this.width/2);
		this.cy = this.y + (this.height/2);

		this.type = type;
		this.link = lnk;

		this.bg_not_selected = 'rgba(14,44,72,1.0)';
		this.bg_selected = 'rgba(14,72,42,1.0)';

		this.bgColor = this.bg_not_selected;

		this.text = txt;
		this.state = state;

		this.tx = this.cx - (context.measureText(this.text).width/2);
		this.ty = this.cy + 4;

		this.selected = false;

		this.visible = true;	
	}

	this.addImage = function(img,ix,iy)
	{
		this.image = img;
		this.ix = ix;
		this.iy = iy;	
	}

	this.update = function(dt)
	{

		
	}

	this.set = function(x)
	{
		this.visible = true;

		this.x = x;

		this.x2 = this.x + this.width;
		this.cx = this.x + (this.width/2);

		this.tx = this.cx - (context.measureText(this.text).width/2);
	}
		
	this.select = function()
	{
		this.bgColor = this.bg_not_selected;

		if(this.type === BUTTON_STATE)
		{
			this.select_state();
		}
		else if(this.type === BUTTON_TOGGLE)
		{
			this.toggle();
		}
		else if(this.type === BUTTON_COMMAND)
		{
			this.select_command();
		}

	}

	this.select_state = function()
	{
		this.selected = true;
		if(this.state >= 0)
		{
			GAME_STATE = this.state;
		}
		this.select_command();
	}

	this.toggle = function()
	{
		if(this.selected)
		{
			this.selected = false;
			if(this.image)
			{
				this.ix = 0;
			}
			else
			{
				this.bgColor = this.bg_not_selected;
			}
		}
		else
		{
			this.selected = true;
			if(this.image)
			{
				this.ix = this.width;
			}
			else
			{
				this.bgColor = this.bg_selected;
			}
		}
	}

	this.select_command = function()
	{

	}

	this.unselect = function()
	{
		if(this.type === BUTTON_STATE)
		{
			this.bgColor = this.bg_not_selected;
			this.selected = false;
		}
		else if(this.type === BUTTON_TOGGLE)
		{
			
		}
		else if(this.type === BUTTON_COMMAND)
		{
			
		}

	}

	this.clickedIn = function(x,y)
	{
		if( x > this.x && x < this.x2 && y > this.y && y < this.y2)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


	this.render = function()
	{
		if(this.visible)
		{
			context.save();
			
			if(this.image)
			{
				context.drawImage(this.image, this.ix, this.iy, this.width, this.height, this.x, this.y, this.width, this.height);
			}
			else
			{
				context.beginPath();
				context.fillStyle = this.bgColor;
				context.rect(this.x,this.y,this.width,this.height);
				context.closePath();
     				context.fill();

				context.fillStyle = "white";
				context.fillText(this.text, this.tx, this.ty);
			}
	
			context.restore();

		}
	}

}