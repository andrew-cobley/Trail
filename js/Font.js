function Font()
{
	this.image;
	
	this.numbers = [];

	this.letters = [];

	this.init = function(img_path, num, let)
	{
		this.image = new Image();
		this.image.src = img_path;

		var x = 2;
		for(var n=0; n<num.length; n++)
		{
			var number = new Object();

			number.x = x;
			number.width = num[n];

			this.numbers[n] = number;

			x += number.width + 2;
		}

		for(var l=0; l<let.length; l++)
		{
			var letter = new Object();

			letter.x = x;
			letter.width = let[l];

			this.letters[l] = letter;

			x += letter.width + 2;
		}
			
	}

	this.update = function(dt)
	{

		
	}

	this.text = function(text,x,y)
	{
		for(var t=0; t<text.length;t++)
		{
			var char = text.charCodeAt(t);
			
			if(char >= 48 && char <= 57)
			{
				char -= 48;
				var number = this.numbers[char];
				context.drawImage(this.image,number.x,2,number.width,10,x,y,number.width,10);
				x += number.width + 2;
			}
			else if(char >= 65 && char <= 90)
			{
				char -= 65;
				var letter = this.letters[char];
				context.drawImage(this.image,letter.x,2,letter.width,10,x,y,letter.width,10);
				x += letter.width + 2;
			}
			else if(char >= 97 && char <= 122)
			{
				char -= 97;
				var letter = this.letters[char];
				context.drawImage(this.image,letter.x,2,letter.width,10,x,y,letter.width,10);
				x += letter.width + 2;
			}
			else if(char === 58)
			{
				context.drawImage(this.image,290,2,2,10,x,y,2,10);
				x += 2 + 2;
			}
			else if(char === 32)
			{
				x += 4;
			}
		}
	}

}