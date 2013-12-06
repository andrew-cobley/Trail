/*!
 * TUMBLE-PROTOTYPE JS Methods
 * Copyright 2012, Andrew Cobley
 */

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>> GLOBAL CONSTANTS AND VARIABLES >>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// >>> CANVAS / TIMER VARS

var cnvs = document.getElementById('canvas');
var context;
var lastFrame;
var TICK_SPEED = 1;
var tickDT;
var tick;


// >>> GAME STATES

var GAME_STATE;
var IDLE = 0;
var DRIVE = 1;
var FIX = 2;
var EXPLORE = 3;
var WORK = 4;
var SLEEP = 5;
var EAT = 6;
var BUY = 7;
var OPTIONS = 8;
var FAINTED = 9;

var END_STATE;
var NO_END_STATE = 0;
var COMPLETE = 1;
var FAINT = 2;
var CRASH = 3;
var ABANDONNED = 4;

var GAME_STARTED = false;
var PAUSED = false;


// >>> BUTTON STATES

var BUTTON_STATE = 1;
var BUTTON_TOGGLE = 2;
var BUTTON_COMMAND = 3;


// >>> DATE CONSTANTS / VARS

var minutes = new Array('00','05','10','15','20','25','30','35','40','45','50','55');
var hours = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23');
var days = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
var months = new Array('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC');

var gDate;
var gDay;


// >>> DAYLIGHT CONSTANTS

var SUNRISE_EARLIEST = new Date(2013,06,01,05,00,00);
var SUNRISE_LATEST = new Date(2013,00,01,08,00,00);
var SUNRISE_INC_SECS = 58.7;
var SUNRISE_DEC_SECS = 59.7;

var SUNSET_EARLIEST = new Date(2013,00,01,16,30,00);
var SUNSET_LATEST = new Date(2013,06,01,21,30,00);
var SUNSET_INC_SECS = 99.5;
var SUNSET_DEC_SECS = 97.9;


// >>> ROUTE VARIABLES

var ROUTE_TICK = 0;
var ROUTE = [];
var MAP;
var MAP_POINTER;
var MAP_POINTER_X = 0;
var MAP_POINTER_Y = 0;

var backgrounds = [];
backgrounds[0] = 'BG-PLAIN-1';
backgrounds[1] = 'BG-PLAIN-2';
backgrounds[2] = 'BG-PLAIN-3';
backgrounds[3] = 'BG-FIELD-L';
backgrounds[4] = 'BG-FIELD-C';
backgrounds[5] = 'BG-FIELD-R';
backgrounds[6] = 'BG-TOWN-C';
backgrounds[7] = 'BG-TOWN-BEACH';
backgrounds[8] = 'BG-LAKE';
backgrounds[9] = 'BG-CITY-LAKE-L';
backgrounds[10] = 'BG-CITY-LAKE-C';
backgrounds[11] = 'BG-CITY-LAKE-R';
backgrounds[12] = 'BG-PLAIN-L';
backgrounds[13] = 'BG-PLAIN-R';


// >>> SCREEN OVERLAYS

var START_SCREEN = new Image();
START_SCREEN.src = './assets/img/SCREEN-START.png';

var PAUSE_SCREEN = new Image();
PAUSE_SCREEN.src = './assets/img/SCREEN-PAUSED.png';

var GAME_COMPLETE_SCREEN = new Image();
GAME_COMPLETE_SCREEN.src = './assets/img/SCREEN-GAME-COMPLETE.png';

var GAME_OVER_LOSE_FAINT_SCREEN = new Image();
GAME_OVER_LOSE_FAINT_SCREEN.src = './assets/img/SCREEN-GAME-OVER-LOSE-3.png';

var GAME_OVER_LOSE_CRASH_SCREEN = new Image();
GAME_OVER_LOSE_CRASH_SCREEN.src = './assets/img/SCREEN-GAME-OVER-LOSE-1.png';

var GAME_OVER_LOSE_STOLEN_SCREEN = new Image();
GAME_OVER_LOSE_STOLEN_SCREEN.src = './assets/img/SCREEN-GAME-OVER-LOSE-2.png';


// >>> FONT SETUP

var pix_num = [6,2,6,6,6,6,6,6,6,6];
var pix_let = [6,6,6,6,6,6,6,6,2,6,6,6,10,6,6,6,6,6,6,6,6,6,10,6,6,6];
var pix = new Font();
pix.init('./assets/fonts/pix.png',pix_num,pix_let);


// >>> GAME MANAGERS

var PRMANAGER;
var IFMANAGER;
var BGMANAGER;
var DLMANAGER;



// <<<<<<<<<<<<<<<<<<<<
// <<< TEST & DEBUG <<<
// <<<<<<<<<<<<<<<<<<<<

var MESSAGE_FLAG;

var SPEED_DIRT_MAX = 50;
var SPEED_GRAVEL_MAX = 60;
var SPEED_TARMAC_MAX = 80;

var SPEED_TERRAIN_MAX = SPEED_TARMAC_MAX;

var CRASH = 0.01;



// >>>>>>>>>>>>>>>>>>>>>>>>>>
// >>> GAME SETUP / RESET >>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>

setup();

function setup()
{
	// Check the element is in the DOM and the browser supports canvas
	if(cnvs.getContext)
	{
   		// Initaliase a 2-dimensional drawing context
    	context = cnvs.getContext('2d');
    	// Text Test
    	context.fillStyle = "black";
    	context.font = "bold 10px Arial";
    	// Init Route
    	var file = './js/Route.csv';
    	var csv = $.get(file, function(data)
    	{
			var rows = data.split(/\r\n/);

			var columns = 8;	
	
			for(var r=0; r<rows.length; r++)
			{
				var row = rows[r].split(',');
							
				ROUTE.push(row);
			}

			// Init Global Variables
			lastFrame = new Date().getTime();
			tickDT = 0;
			tick = 0;
			gDate = new Date(2013,03,01,09,00,00);
			gDay = gDate.getDate();
			ROUTE_TICK = 0;

    		// Init Item Manager
    		ITMANAGER = new ItemManager();
    		ITMANAGER.init();
    		// Init Player Manager
    		PRMANAGER = new PlayerManager();
    		PRMANAGER.init();

			// Init Bear
			BEAR = new Bear();
			BEAR.init();

    		// Init Interface Manager
    		IFMANAGER = new InterfaceManager(this);
    		IFMANAGER.init();
    		// Init Background Manager
    		BGMANAGER = new BackgroundManager();
    		BGMANAGER.init();
    		// Init Daylight Manager
    		DLMANAGER = new DaylightManager();
    		DLMANAGER.init();
    		// Init Status Manager
    		STMANAGER = new StatusManager();
    		//STMANAGER.init();

			// Init Map
			MAP = new Image();
			MAP.src = './assets/img/MAP.png';
			MAP_POINTER = new Image();
			MAP_POINTER.src = './assets/img/MAP-POINTER.png';

    		// Init Game State
    		GAME_STATE = IDLE;
			END_STATE = NO_END_STATE;
			GAME_STARTED = false;
    		PAUSED = true;
    		MESSAGE_FLAG = false;

    		// Setup Input
    		input(); 

    		// Start Game Loop
    		var FPS = 60;
			setInterval(function() {
  					update();
  					draw();
				}, 1000/FPS);
    	});
	}
}

function update()
{
	// Calculate the time since the last frame.
	var thisFrame = new Date().getTime();
	var dt = (thisFrame - lastFrame)/1000;
	lastFrame = thisFrame;

	if(!PAUSED)
	{
		// [TICK] UPDATE

		tickDT += dt;
		if(tickDT >= TICK_SPEED)
		{
			// Tick & Reset Tick Timer
			tick++;
			tickDT = 0;

			// Advance date by 5 minutes.
			gDate.setMinutes(gDate.getMinutes()+5);


			// # MANAGER [TICK] UPDATE

			PRMANAGER.tick();
			BEAR.tick();
			//STMANAGER.update();


			// MAP_POINTER [UPDATE]
			MAP_POINTER_X = parseInt(ROUTE[ROUTE_TICK][6]) -5;
			MAP_POINTER_Y = parseInt(ROUTE[ROUTE_TICK][7]) -5;


			// @@@@@ DAYLIGHT [TICK] UPDATE
			if(gDay !== gDate.getDate())	
			{
				gDay = gDate.getDate();
				DLMANAGER.set();

			}

			DLMANAGER.tick();
	
		}

		// # [GENERAL] UPDATE

		BGMANAGER.updateSpeed(PRMANAGER.van.speed);

		IFMANAGER.update();
		BGMANAGER.update(dt);
		PRMANAGER.update(dt);
		BEAR.update(dt);

	}

}

function draw()
{
	// Clear Canvas
	context.clearRect(0, 0, cnvs.width, cnvs.height);

	// Draw Main View

	if(!IFMANAGER.pane_map.buttons[0].selected || END_STATE > 0)
	{

		// [DISPLAY] BACKGROUND
		BGMANAGER.render();

		// [DISPLAY] BEAR
		BEAR.render();

		// [DISPLAY] PLAYER
		PRMANAGER.render();

		// [DISPLAY] DAYLIGHT FILTER
		DLMANAGER.render();


		// ---> TEST [DISPLAY VEHICLE LIGHTS]
		if(DLMANAGER.curLightLevel > 0.5)
		{

			context.save();
		
			// If time between sunset and sunrise and sunriseActive = false

			var rx = 196;
			var ry = 190;

			var rg = context.createRadialGradient(rx, ry, 10, rx, ry, 150);
			rg.addColorStop(0.0,'rgba(200,200,40,0.1)');
			rg.addColorStop(1.0,'rgba(200,200,40,0.01)');
			context.fillStyle = rg;
			context.beginPath();
			context.arc(rx,ry,150,(1.9*Math.PI),(0.1*Math.PI),false);
			context.lineTo(rx,ry);
			context.fill();

			var rg2 = context.createRadialGradient(rx, ry, 10, rx, ry, 150);
			rg2.addColorStop(0.0,'rgba(200,200,40,0.07)');
			rg2.addColorStop(1.0,'rgba(200,200,40,0.01)');
			context.fillStyle = rg2;
			context.beginPath();
			context.arc(rx,ry,150,(1.85*Math.PI),(0.15*Math.PI),false);
			context.lineTo(rx,ry);
			context.fill();

			var rg3 = context.createRadialGradient(rx, ry, 10, rx, ry, 150);
			rg3.addColorStop(0.0,'rgba(200,200,40,0.05)');
			rg3.addColorStop(1.0,'rgba(200,200,40,0.01)');
			context.fillStyle = rg3;
			context.beginPath();
			context.arc(rx,ry,150,0,(2*Math.PI),false);
			context.lineTo(rx,ry);
			context.fill();

			context.restore();

		}

	}
	else
	{
		// [DISPLAY] MAP
		context.drawImage(MAP,0,0);

		// [DISPLAY] POSITION INDICATOR
		context.save();
		context.drawImage(MAP_POINTER,MAP_POINTER_X,MAP_POINTER_Y);
		context.restore();



	}

	// Main View End
	

	if(!GAME_STARTED)
	{
		context.drawImage(START_SCREEN,0,0);
	}
	else if(END_STATE > 0)
	{
		DLMANAGER.curLightLevel = 0;
		// > GAME COMPLETE
		if(END_STATE === COMPLETE)
		{
			context.drawImage(GAME_COMPLETE_SCREEN,0,0);
		}
		// > GAME OVER > FAINT
		else if(END_STATE === FAINT)
		{
			context.drawImage(GAME_OVER_LOSE_FAINT_SCREEN,0,0);
		}
		// > GAME OVER > CRASH
		else if(END_STATE === CRASH)
		{
			context.drawImage(GAME_OVER_LOSE_CRASH_SCREEN,0,0);
		}
		// > GAME OVER > STOLEN VAN
		else if(END_STATE === ABANDONNED)
		{
			context.drawImage(GAME_OVER_LOSE_STOLEN_SCREEN,0,0);
		}
		else
		{
			context.drawImage(GAME_OVER_LOSE_CRASH_SCREEN,0,0);
		}
	}
	else if(PAUSED && END_STATE === 0)
	{
		context.drawImage(PAUSE_SCREEN,0,0);
	}
	else
	{
		// Display Interface
		IFMANAGER.render();
	}


}

function input()
{
    // Check for key press
    window.onkeydown = function(e)
    {

	// PAUSE ON SPACEBAR PRESS
	if(e.keyCode === 32)
	{
		if(!PAUSED)
		{
			PAUSED = true;
			//console.log("Game Paused!");
		}
		else
		{
			GAME_STARTED = true;
			PAUSED = false;
			//console.log("Game Unpaused!");
		}
	}

	// >>> R SHORTCUT > RESTART

	else if(e.keyCode === 82)
	{
		// Restart Game
		//console.log('Restart Game!');
		setup();
	}

	// >>> #1 SHORTCUT > ENERGY MAX

	else if(e.keyCode === 49)
	{
		PRMANAGER.energy = PRMANAGER.energyMax;
		//console.log("ENERGY UPDATE (MAX)");
	}

	// >>> #2 SHORTCUT > HUNGER MIN

	else if(e.keyCode === 50)
	{
		PRMANAGER.hunger = 0;
		//console.log("HUNGER UPDATE (0)");
	}

	// >>> #3 SHORTCUT > MONEY + 500

	else if(e.keyCode === 51)
	{
		PRMANAGER.money += 500;
		//console.log("MONEY UPDATE(+500)");
	}

	// >>> #4 SHORTCUT > ROUTE--

	else if(e.keyCode === 52)
	{
		if(ROUTE_TICK > 0)
		{
			ROUTE_TICK --;
			BGMANAGER.forceUpdate();
			PRMANAGER.van.distance -= 25;
		}

	}

	// >>> #5 SHORTCUT > ROUTE++

	else if(e.keyCode === 53)
	{
		// Route ++
		if(ROUTE_TICK < ROUTE.length)
		{
			ROUTE_TICK ++;
			BGMANAGER.forceUpdate();
			PRMANAGER.van.distance += 25;
		}
	}

	// >>> #6 SHORTCUT > ROUTE NEXT CITY

	else if(e.keyCode === 54)
	{
		//console.log("Next City! Current: " + ROUTE_TICK);
		for(var c = ROUTE_TICK+1; c < ROUTE.length; c++)
		{
			if(ROUTE[c][4])
			{
				//console.log("City Found! " + c);
				ROUTE_TICK = c;
				c = ROUTE.length;
			}
		}
		BGMANAGER.forceUpdate();
		PRMANAGER.van.distance = (PRMANAGER.van.distance % 25) + parseInt(ROUTE[ROUTE_TICK][1]);
		//console.log("R>City Found! " + ROUTE_TICK + " Distance: " + PRMANAGER.van.distance);
	}

	// >>> #7 SHORTCUT > ROUTE FINAL SCREEN
	else if(e.keyCode === 55)
	{
		ROUTE_TICK = ROUTE.length - 3;
		//console.log(ROUTE.length);
		BGMANAGER.forceUpdate();
		PRMANAGER.van.distance = (PRMANAGER.van.distance % 25) + parseInt(ROUTE[ROUTE_TICK][1]);
	}

	e.preventDefault();
    }

    // Check for mouse press
    cnvs.onmousedown = function(e)
    {
	e.preventDefault();
	if(!GAME_STARTED || PAUSED || END_STATE > 0)
	{

	}
	else
	{
		buttonPressDown(e);
	}

    }


    // Check for mouse release
    cnvs.onmouseup = function(e)
    {
	e.preventDefault();
	if(!GAME_STARTED)
	{
		GAME_STARTED = true;
		PAUSED = false;
	}
	else if(PAUSED && GAME_STARTED && END_STATE === 0)
	{
		PAUSED = false;
	}
	else if(END_STATE > 0)
	{
		setup();
	}
	else if(GAME_STARTED && !PAUSED && END_STATE === 0)
	{
		buttonPressUp(e);
	}
    }

    cnvs.addEventListener('touchstart', function(e)
    {

	e.preventDefault();
	if(!GAME_STARTED || PAUSED || END_STATE > 0)
	{

	}
	else
	{
		var touch = e.changedTouches[0];
		buttonPressDown(touch);
	}


    }, false);

    cnvs.addEventListener('touchend', function(e)
    {
	e.preventDefault();
	if(!GAME_STARTED)
	{
		GAME_STARTED = true;
		PAUSED = false;
	}
	else if(PAUSED && GAME_STARTED && END_STATE === 0)
	{
		PAUSED = false;
	}
	else if(END_STATE > 0)
	{
		setup();
	}
	else if(GAME_STARTED && !PAUSED && END_STATE === 0)
	{
		//console.log("Touch end!");
		var touch = e.changedTouches[0];
		buttonPressUp(touch);
	}

    }, false);

}

buttonPressDown = function(e)
{
	if(GAME_STARTED)
	{
		IFMANAGER.button_pressed = buttonMatch(e);
		if(IFMANAGER.button_pressed)
		{
			IFMANAGER.button_pressed.bgColor = IFMANAGER.button_pressed.bg_selected;
		}
	}
}

buttonPressUp = function(e)
{
	if(IFMANAGER.button_pressed)
	{
		var button_released = buttonMatch(e);
			
		if(button_released === IFMANAGER.button_pressed)
		{
			if(button_released.lnk === 0)
			{
				button_released.select();
			}
			else
			{
				for(var i=0; i<IFMANAGER.panes.length; i++)
				{
					var pane = IFMANAGER.panes[i];
					for(var j=0; j<pane.buttons.length; j++)
					{
						if(pane.buttons[j].link === button_released.link)
						{
							pane.buttons[j].unselect();
						}
					}
				}
	
				button_released.select();
			}
		}
    	} 

}

buttonMatch = function(e)
{
	var x = e.pageX - cnvs.offsetLeft;
	var y = e.pageY - cnvs.offsetTop;

	//console.log("MSG FLAG: " + MESSAGE_FLAG);

	if(!MESSAGE_FLAG)
	{

		for(var i=0; i<IFMANAGER.panes.length; i++)
		{
			var pane = IFMANAGER.panes[i];

			//console.log("Pane[" + i + "] Visible: " + pane.visible);
	
			if(pane.visible)
			{
				for(var j=0; j<pane.buttons.length; j++)
				{
					if(pane.buttons[j].visible && pane.buttons[j].clickedIn(x,y))
					{
						return pane.buttons[j];
						j = pane.buttons.length;
						i = IFMANAGER.panes.length;
					}
				}
			}
		}
	}
	else
	{

		for(var i=0; i<IFMANAGER.messages.length; i++)
		{
			if(IFMANAGER.messages[i].visible)
			{
				if(IFMANAGER.messages[i].close_button.visible && IFMANAGER.messages[i].close_button.clickedIn(x,y))
				{
					return IFMANAGER.messages[i].close_button;
					i = IFMANAGER.messages.length;
				}
			}
		}
	}
			
}




	



