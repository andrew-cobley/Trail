function InterfaceManager()
{
	this.parent;

	this.panes;
	this.stats;

	this.buttons;
	this.button_image;

	this.BUTTON_MAP;

	this.button_pressed;

	this.messages;

	this.bar_energy, this.bar_hunger;

	this.labels;

	this.init = function(parent)
	{
		this.parent = parent;

		// COLOURS
		var BG_STATS = 'rgba(20,40,60,0.9)';
		var BG_BUTTONS = 'rgba(40,60,80,0.8)';

		this.button_image = new Image();
		this.button_image.src = './assets/img/BUTTONS.png';

		this.button_alt_image = new Image();
		this.button_alt_image.src = './assets/img/BUTTONS-ALT.png';

		this.button_map_image = new Image();
		this.button_map_image.src = './assets/img/BUTTONS-MAP.png';

		// INIT - PANE
		this.panes = new Array();

		// INIT - PANE[IDLE]
		this.pane_idle = new Pane();
		this.pane_idle.init(0,234,480,66,BG_BUTTONS);
		this.panes.push(this.pane_idle);

		var pane_idle_buttons = new Array('DRIVE','FIX','EXPLORE','WORK','SLEEP','EAT','BUY','PAUSE');

		for(var i=0; i<pane_idle_buttons.length; i++)
		{
			this.pane_idle.addButton(i+1,((i*59)+6), 6,54,54,BUTTON_STATE,1,pane_idle_buttons[i],i+1);
			
			this.pane_idle.buttons[i].addImage(this.button_image,0,i*54);
		}

		// PANE[IDLE] - Set to Visible
		this.pane_idle.visible = true;

		// SET UPDATE METHODS FOR CERTAIN STATES
		// --> IDLE-EAT
		this.panes[IDLE].buttons[EAT-1].select_command = function()
		{
			IFMANAGER.updateEatPane();
		}

		// --> IDLE-BUY
		this.panes[IDLE].buttons[BUY-1].select_command = function()
		{
			// CHECK IF NOT IN A TOWN
			if( !ROUTE[ROUTE_TICK][4] )
			{
				// IF NOT IN TOWN
				MESSAGE_FLAG = true;
				IFMANAGER.messages[0].visible = true;
				IFMANAGER.messages[0].close_button.visible = true;
				GAME_STATE = IDLE;
			}

		}

		// --> IDLE-OPTIONS
		this.panes[IDLE].buttons[OPTIONS-1].select_command = function()
		{
			//console.log("Game Paused");
			
			// Force Update Panes
			IFMANAGER.update();

			PAUSED = true;
		}
		

		// ***** SUB PANES *****

		for(var i=1; i<9; i++)
		{
			var pane = new Pane();
			pane.init(0,20,480,280,'rgba(0,0,0,0)');
			this.panes.push(pane);
		}

		// # PANE[DRIVE]
		var P1 = new Pane();
		P1.init(0,234,480,66,'rgba(51,153,204,0)');
		this.panes[1] = P1;

		var str = 'STOP DRIVING';
		var str_width = 120;
		P1.addButton(0,172,6,136,54,BUTTON_STATE,1,str,IDLE);
		P1.buttons[0].addImage(this.button_alt_image,0,0);


		// # PANE[FIX]
		var P2 = new Pane();
		P2.init(0,234,480,66,BG_BUTTONS);

		P2.addButton(0,6,6,54,54,BUTTON_STATE,1,'BACK',IDLE);
		P2.buttons[0].addImage(this.button_image,0,432);

		var FB1 = P2.addButton(1,65,6,54,54,BUTTON_COMMAND,0,'BACK WHEEL','');
		P2.buttons[1].addImage(this.button_image,0,540);
		FB1.select_command = function()
		{
			if(PRMANAGER.van.wheel_rear.broken === true)
			{
				//console.log('Change Rear Wheel!');
				if(!PRMANAGER.van.changeWheel(PRMANAGER.van.wheel_rear))
				{
					MESSAGE_FLAG = true;
					IFMANAGER.messages[2].visible = true;
					IFMANAGER.messages[2].close_button.visible = true;
					//console.log('No spare wheels!');
				}
			}
			else
			{
				//console.log("Rear wheel doesn't need changing");
			}
		}

		var FB2 = P2.addButton(2,124,6,54,54,BUTTON_COMMAND,0,'FRONT WHEEL','');
		P2.buttons[2].addImage(this.button_image,0,486);
		FB2.select_command = function()
		{
			if(PRMANAGER.van.wheel_front.broken === true)
			{
				//console.log('Change Front Wheel!');
				if(!PRMANAGER.van.changeWheel(PRMANAGER.van.wheel_front))
				{
					MESSAGE_FLAG = true;
					IFMANAGER.messages[2].visible = true;
					IFMANAGER.messages[2].close_button.visible = true;
					//console.log('No spare wheels!');
				}
			}
			else
			{
				//console.log("Front wheel doesn't need changing");
			}
		}


		this.panes[2] = P2;


		// # PANE[EXPLORE]
		var P3 = new Pane();
		P3.init(0,234,480,66,'rgba(51,153,204,0)');
		this.panes[3] = P3;

		var str = 'STOP EXPLORING';
		var str_width = 120;
		P3.addButton(0,172,6,136,54,BUTTON_STATE,1,str,IDLE);
		P3.buttons[0].addImage(this.button_alt_image,0,54);

		this.panes[3] = P3;


		// # PANE[WORK]
		var P4 = new Pane();
		P4.init(0,234,480,66,'rgba(51,153,204,0)');
		
		var str = 'STOP WORKING';
		var str_width = 120;
		P4.addButton(0,172,6,136,54,BUTTON_STATE,1,str,IDLE);
		P4.buttons[0].addImage(this.button_alt_image,0,108);

		this.panes[4] = P4;


		// PANE[SLEEP]
		var P5 = new Pane();
		P5.init(0,234,480,66,'rgba(51,153,204,0)');
		
		var str = 'STOP SLEEPING';
		var str_width = 120;
		P5.addButton(0,172,6,136,54,BUTTON_STATE,1,str,IDLE);
		P5.buttons[0].addImage(this.button_alt_image,0,162);

		this.panes[5] = P5;


		// PANE[EAT]
		var P6 = new Pane();
		P6.init(0,234,480,66,BG_BUTTONS);

		P6.addButton(0,6,6,54,54,BUTTON_STATE,1,'BACK',IDLE);
		P6.buttons[0].addImage(this.button_image,0,432);

		for(var i=0; i<ITMANAGER.foods.length; i++)
		{
			var button = P6.addButton(i+1,0,6,54,54,BUTTON_COMMAND,0,ITMANAGER.foods[i].name,'');
			button.addImage(this.button_image,0,594+(i*54));
			button.visible = false;
			button.select_command = function()
			{
				PRMANAGER.foods[this.id-1][1]--;

				var food = new Array();
				food.push(PRMANAGER.foods[this.id-1][0]);
				var timer = PRMANAGER.foods[this.id-1][0].ticks;
				food.push(timer);
				PRMANAGER.eating.push(food);

				IFMANAGER.updateEatPane();
			}
		}

		this.panes[EAT] = P6;


		// PANE[SHOP]
		var P7 = new Pane();
		P7.init(0,234,480,66,BG_BUTTONS);
		
		P7.addButton(0,6,6,54,54,BUTTON_STATE,1,'BACK',IDLE);
		P7.buttons[0].addImage(this.button_image,0,432);

		var i;
		for(i=0; i<ITMANAGER.foods.length; i++)
		{
			var button = P7.addButton(i+1,(65+(i*59)),6,54,54,BUTTON_COMMAND,0,ITMANAGER.foods[i].name,'');
			button.addImage(this.button_image,54,594+(i*54));
			button.select_command = function()
			{
				if(PRMANAGER.money >= PRMANAGER.foods[this.id-1][0].cost)
				{
					PRMANAGER.foods[this.id-1][1]++;
					PRMANAGER.money -= PRMANAGER.foods[this.id-1][0].cost;
				}	
				else
				{
					//console.log("Not enough money!");
					MESSAGE_FLAG = true;
					IFMANAGER.messages[1].visible = true;
					IFMANAGER.messages[1].close_button.visible = true;
				}
				// Update Pane
			}
		}

		var button = P7.addButton(i+1,(65+(i*59)),6,54,54,BUTTON_COMMAND,0,'WHEEL','');
		button.addImage(this.button_image,54,756);

		button.select_command = function()
		{
			if(PRMANAGER.money >= 100)
			{
				PRMANAGER.van.spare_wheels++;
				PRMANAGER.money -= 100;
			}	
			else
			{
				//console.log("Not enough money!");
				MESSAGE_FLAG = true;
				IFMANAGER.messages[1].visible = true;
				IFMANAGER.messages[1].close_button.visible = true;
			}
		}

		this.panes[BUY] = P7;


		// PANE[OPTIONS]
		this.pane_idle.buttons[OPTIONS-1].state = IDLE;


		// ++ PANE[MAP]
		this.pane_map = new Pane();
		this.pane_map.init(0,0,480,320,'rgba(0,0,0,0)');
		this.pane_map.addButton(0,438,26,36,36,BUTTON_TOGGLE,0,'MAP','');
		this.pane_map.buttons[0].addImage(this.button_map_image,0,0);
		this.panes[9] = this.pane_map;
		this.panes[9].visible = true;


		// ***** STATS *****

		// INIT - STATS
		this.stats = new Array();

		this.labels = new Image();
		this.labels.src = './assets/img/LABELS.png';

		// INIT - STATS[TOP]
		this.stats_top = new Pane();
		this.stats_top.init(0,0,480,20,BG_STATS );
		this.stats.push(this.stats_top);

		// INIT - STATS[BOTTOM]
		this.stats_bottom = new Pane();
		this.stats_bottom.init(0,300,480,20,BG_STATS );
		this.stats.push(this.stats_bottom);
		
		this.bar_energy = new Animation();
		this.bar_energy.initInImageY('./assets/img/BARS.png',0,0,84,294,84,14,0,0);

		this.bar_hunger = new Animation();
		this.bar_hunger.initInImageY('./assets/img/BARS.png',84,0,84,294,84,14,0,0);

 		
		// ***** MESSAGES *****

 		// INIT - MESSAGEs
		this.messages = new Array();
	
		var bg = 'rgba(51,153,204,0.96)';

 		var m1 = new Message();
		var m1t = 'You are not in a town. There are no shops.'
		var m1w = context.measureText(m1t).width;
		var m1x = 240 - (m1w/2) + 20;
		m1.init(this,0,m1x,120,m1w+20,80,bg,m1t);
		this.messages.push(m1);

 		var m2 = new Message();
		var m2t = "You don't have enough money!"
		var m2w = context.measureText(m2t).width;
		var m2x = 240 - (m2w/2) + 20;
		m2.init(this,0,m2x,120,m2w+20,80,bg,m2t);
		this.messages.push(m2);

 		var m3 = new Message();
		var m3t = "You don't have any spare wheels!"
		var m3w = context.measureText(m3t).width;
		var m3x = 240 - (m3w/2) + 20;
		m3.init(this,0,m3x,120,m3w+20,80,bg,m3t);
		this.messages.push(m3);

	}

	this.update = function()
	{
		//console.log("GS: " + GAME_STATE);
		if(!this.panes[GAME_STATE].visible)
		{
			for(var i=0; i<this.panes.length-1; i++)
			{
				this.panes[i].visible = false;
			}

			this.panes[GAME_STATE].visible = true;

		}

		// Update Stat Bars
		this.bar_energy.frame = Math.ceil(PRMANAGER.energy/20);
		this.bar_hunger.frame = Math.ceil(PRMANAGER.hunger/7.5);

	}

	this.updateEatPane = function()
	{
		var t = 0;
	
		for(var i=0; i<ITMANAGER.foods.length; i++)
		{
			if(PRMANAGER.foods[i][1] > 0)
			{
				this.panes[EAT].buttons[i+1].set(65+(t*59));
				t++;
			}
			else
			{
				this.panes[EAT].buttons[i+1].visible = false;
			}
		}
	}

	this.render = function()
	{
		// DISPLAY - CORRECT GAME PANE
		this.panes[GAME_STATE].render();

		// DISPLAY - MAP PANE
		this.pane_map.render();

		// DISPLAY - STATS
		for(var i=0; i<this.stats.length; i++)
		{
			this.stats[i].render();
		}

		// Display Top Stats
		context.fillStyle = "white";
		context.font = "bold 10px Arial";
		//context.fillText(days[gDate.getDate()] + " " + months[gDate.getMonth()] + " " + gDate.getFullYear() + " " + hours[gDate.getHours()] + ":" + minutes[gDate.getMinutes()/5], 8, 14);
		//context.fillText("Sunrise: " + hours[DLMANAGER.sunrise.getHours()] + ":" + DLMANAGER.sunrise.getMinutes() + " Sunset: " + hours[DLMANAGER.sunset.getHours()] + ":" + DLMANAGER.sunset.getMinutes() + " LL: " + DLMANAGER.curLightLevel + "(" + DLMANAGER.targetLightLevel + ")" + " Speed: " + PRMANAGER.van.speed + "kmph Dist: " + (Math.round(PRMANAGER.van.distance*10)/10) + "km", 120, 14);

		pix.text(hours[gDate.getHours()].toString() + ":" + minutes[gDate.getMinutes()/5].toString(),10,5);
		pix.text(months[gDate.getMonth()].toString(),50,5);
		pix.text(days[gDate.getDate()].toString(),80,5);

		if(ROUTE[ROUTE_TICK][4])
		{
			pix.text(ROUTE[ROUTE_TICK][4],110,5);
		}

		context.drawImage(this.labels,2,50,40,10,240,5,40,10);
		pix.text(Math.floor(PRMANAGER.van.speed).toString() + "KMPH",288, 5);

		context.drawImage(this.labels,2,38,58,10,358,5,58,10);
		pix.text(Math.floor(PRMANAGER.van.distance).toString() + "KM",425, 5);

		// Display Bottom Stats
		//context.fillText("Energy: " + (Math.round(PRMANAGER.energy*10)/10) + " Hunger: " + (Math.round(PRMANAGER.hunger*10)/10) + " Money: " + PRMANAGER.money, 8, 313);
		
		context.drawImage(this.labels,2,2,46,10,15,305,46,10);
		this.bar_energy.render(66,303);
		context.drawImage(this.labels,2,14,46,10,180,305,46,10);
		this.bar_hunger.render(232,303);
		context.drawImage(this.labels,2,26,42,10,346,305,42,10);
		pix.text(PRMANAGER.money.toString(),400,305);

		// Display Messages
		for(var i=0; i<this.messages.length;i++)
		{
			this.messages[i].render();
		}

	}

}





