import "./sss-contact.js";
import "./navbar.js";
		
		window.onload = init;
		//global variables
		let paused = true;
		let ctx;
		let canvas;
		let createRectangles = true;
		let createArcs = true;
		let createLines = true;
		let createTriangles = true;
		let dragging=false;
		let currentTool;
		let backgroundColor;
		let lineWidth;
		let strokeStyle;
		let fillStyle;
		let circleRadius;
		let origin;
		let topCanvas, topCtx;
		let canvasWidth = 800;
		let canvasHeight = 480;
		let drawParams = {
			showNoise     : false,
			showInvert    : false,
			showPastel   : false
		  };
		
		//constants
		let DEFAULT_LINE_WIDTH = 3;
		let DEFAULT_RADIUS = 3;
		let DEFAULT_STROKE_STYLE = "red";
		let DEFAULT_FILL_STYLE = "red";
		let DEFAULT_BACKGROUND = "white";
		let TOOL_PENCIL = "toolPencil";
		let TOOL_RECTANGLE = "toolRectangle";
		let TOOL_LINE = "toolLine";
		let TOOL_CIRCLE = "toolCircle";
		let TOOL_TRIANGLE = "toolTriangle";
	
		function init(){
			//set background to default color
			//establish bottom canvas
			backgroundColor = DEFAULT_BACKGROUND;
			canvas = document.querySelector('canvas');
			ctx = canvas.getContext('2d');
			ctx.fillStyle = backgroundColor; 
			ctx.fillRect(0,0,800,480); 

			//set defualt values
			circleRadius = DEFAULT_RADIUS;
			currentTool = TOOL_PENCIL;
			lineWidth = DEFAULT_LINE_WIDTH;
			strokeStyle = DEFAULT_STROKE_STYLE;
			fillStyle = DEFAULT_FILL_STYLE;
			origin = {};
		
			//establish top canvas
			topCanvas = document.querySelector('#topCanvas');
			topCtx = topCanvas.getContext('2d');
		
			//set initial properties of both graphics contexts
			topCtx.lineWidth = ctx.lineWidth = lineWidth;
			topCtx.strokeStyle = ctx.strokeStyle = strokeStyle;
			topCtx.fillStyle = ctx.fillStyle = fillStyle;
			topCtx.lineCap = ctx.lineCap = "round";
			topCtx.lineJoin = ctx.lineJoin = "round";

		
			//hook up event handlers for mouse movement
			topCanvas.onmousedown = doMousedown;
			topCanvas.onmousemove = doMousemove;
			topCanvas.onmouseup = doMouseup;
			topCanvas.onmouseout = doMouseout;
		
			//set up on change events for settings
			document.querySelector('#toolChooser').onchange = doToolChange;
			document.querySelector('#radiusChooser').onchange = doCircleRadiusChange;
			document.querySelector('#strokeStyleChooser').onchange = doStrokeColorChange;
			document.querySelector('#fillStyleChooser').onchange = doFillColorChange;
			document.querySelector('#lineWidthChooser').onchange = doLineWidthChange;
			document.querySelector('#backgroundColor').onchange = backgroundColorChange;

			loop();
			setupUI();
			update();

			}

			//draws random rectangle using random values
			function drawRandomRect(ctx){

				drawRectangle(ctx,getRandomInt(0,800),getRandomInt(0,480),getRandomInt(10,90),getRandomInt(10,90), getRandomColor(), getRandomInt(2,8),getRandomColor());
			}
			//draws random circle using random values
			function drawRandomCircle(ctx){

				drawArc(ctx,getRandomInt(0,800),getRandomInt(0,480),getRandomInt(10,50),0,Math.PI*2,getRandomColor(), getRandomInt(2,8),getRandomColor())
			}
			//draws random line using random values
			function drawRandomLine(ctx){
				drawLine(ctx,getRandomInt(0,800),getRandomInt(0,480),getRandomInt(0,800),getRandomInt(0,480),getRandomInt(2,8),getRandomColor());
			}
			//draws random triangle using random values
			function drawRandomTriangle(ctx){
				drawTriangle(ctx,getRandomInt(0,800),getRandomInt(0,800),getRandomInt(0,800),getRandomInt(0,800),getRandomInt(2,8),getRandomColor(),getRandomColor());
			}

			//loop for filters to be applied
			function loop(){
				  requestAnimationFrame(loop);
				  draw(drawParams);
			}
			
			//loop for random shapes to be drawn in play button is selected
			function update(){
				//if paused do nothing
				if(paused) return;
				
				requestAnimationFrame(update);
				if(createRectangles) drawRandomRect(ctx);
				if(createArcs) drawRandomCircle(ctx);
				if(createLines) drawRandomLine(ctx);
				if(createTriangles) drawRandomTriangle(ctx);
			}


			//helper functions
			function getRandomColor(){
				function getByte(){
					return 55 + Math.round(Math.random() * 200);
				}
				return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.9)";
				}

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
				}

			//set up button functionality 
			function setupUI(){
				document.querySelector("#btnPause").onclick = function(){
					paused = true;
				};
				document.querySelector("#btnPlay").onclick = function(){
					paused = false;
					update();
					
				};
				document.querySelector("#btnClear").onclick = function(){
					ctx.save();
					ctx.fillStyle = backgroundColor; 
					ctx.fillRect(0,0,800,480); 
					ctx.restore();
				};

				//check to see which shapes are selected for random drawing
				document.querySelector("#cbRectangles").onclick = function(e){
					createRectangles = e.target.checked;
				};
				document.querySelector("#cbCircles").onclick = function(e){
					createArcs = e.target.checked;
				};
				document.querySelector("#cbLines").onclick = function(e){
					createLines = e.target.checked;
				};
				document.querySelector("#cbTriangles").onclick = function(e){
					createTriangles = e.target.checked;
				};

			}

			//draws rectangle based on params passed into the function 
			function drawRectangle(ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black"){
				ctx.save();
				ctx.fillStyle = fillStyle; 
				ctx.beginPath();
				ctx.rect(x,y,width,height); 
				ctx.fill();
				if(lineWidth > 0){
					ctx.lineWidth = lineWidth;
					ctx.strokeStyle = strokeStyle;
					ctx.stroke();
				}
				ctx.closePath();
				ctx.restore();

			}

			//draws circles based on params passed into the function 
			function drawArc(ctx,x,y,radius, startAngle=0, endAngle=Math.PI*2,fillStyle="black",lineWidth=0,strokeStyle="black"){
				ctx.save();
				ctx.fillStyle = fillStyle; 
				ctx.beginPath();
				ctx.arc(x,y,radius,startAngle,endAngle); 
				ctx.fill();
				if(lineWidth > 0){
					ctx.lineWidth = lineWidth;
					ctx.strokeStyle = strokeStyle;
					ctx.stroke();
				}
				ctx.closePath();
				ctx.restore();

			}

			//draws lines based on params passed into the function 
			function drawLine(ctx,x1,y1,x2,y2,lineWidth=1,strokeStyle="black"){
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);
				if(lineWidth > 0){
					ctx.lineWidth = lineWidth;
					ctx.strokeStyle = strokeStyle;
					ctx.stroke();
				}
				ctx.closePath();
				ctx.restore();

			}

			//draws triangles based on params passed into the function 
			function drawTriangle(ctx,n1,n2,n3,n4,lineWidth = 1,fillStyle="black",strokeStyle="black"){
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = strokeStyle;
				ctx.fillStyle = fillStyle;
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(n1, n2);
				ctx.lineTo(n3, n1);
				ctx.lineTo(n4, n1);
				ctx.lineTo(n1, n2);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			  }

			  	// Function Name: getMouse()
				// returns mouse position in local coordinate system of element
				// Author: Tony Jefferson
				// Last update: 3/1/2014
				function getMouse(e){
					var mouse = {}
					mouse.x = e.pageX - e.target.offsetLeft;
					mouse.y = e.pageY - e.target.offsetTop;
					return mouse;
				}

				
				
				// Function Name: doMouseDown()
				// Author: Tony Jefferson
				// Last update: 3/1/2014
				// I have added a circle and triangle parameter to the cases
				function doMousedown(e){
					dragging = true;
					var mouse = getMouse(e);
					
					switch(currentTool) {
						case TOOL_PENCIL:
							ctx.beginPath();
							ctx.moveTo(mouse.x, mouse.y);
							break;
							
						case TOOL_RECTANGLE:
						case TOOL_LINE:
							origin.x = mouse.x;
							origin.y = mouse.y;
							break;
						case TOOL_CIRCLE:
						case TOOL_TRIANGLE:
					}
				}
			 
				// Function Name: doMouseMove() (pencil rectangle and line)
				// Author: Tony Jefferson
				// Last update: 3/1/2014

				// I have added a circle and triangle case
				 function doMousemove(e) {
					 if(!dragging) return;
					 var mouse = getMouse(e);
					 switch(currentTool) {
						case TOOL_PENCIL:
							ctx.strokeStyle = strokeStyle;
							ctx.lineWidth = lineWidth;
							ctx.lineTo(mouse.x, mouse.y);
							ctx.stroke();
							break;
							
						case TOOL_RECTANGLE:
							var x = Math.min(mouse.x,origin.x);
							var y = Math.min(mouse.y,origin.y);
							var w = Math.abs(mouse.x - origin.x);
							var h = Math.abs(mouse.y - origin.y);
							
							topCtx.strokeStyle = strokeStyle;
							topCtx.fillStyle = fillStyle;
							topCtx.lineWidth = lineWidth;
							clearTopCanvas()
							topCtx.fillRect(x,y,w,h); //also have .rect() and .fill()
							topCtx.strokeRect(x,y,w,h);
							
							break;
							
						case TOOL_LINE:
							topCtx.beginPath();
							topCtx.moveTo(origin.x, origin.y);
							topCtx.strokeStyle = strokeStyle;
							topCtx.lineWidth = lineWidth;
							clearTopCanvas();
							topCtx.lineTo(mouse.x,mouse.y);
							topCtx.closePath();
							topCtx.stroke();
							break;
						
						case TOOL_CIRCLE:
						    topCtx.beginPath();
							topCtx.save();
							topCtx.beginPath();
    						topCtx.arc(mouse.x, mouse.y, circleRadius*10, 0, 2*Math.PI);
							if(lineWidth > 0){
								clearTopCanvas();
								topCtx.fillStyle = fillStyle; 
								topCtx.fill();
								topCtx.lineWidth = lineWidth;
								topCtx.strokeStyle = strokeStyle;
								topCtx.stroke();
							}
							topCtx.closePath();
							topCtx.restore();
							break;

						case TOOL_TRIANGLE:
							topCtx.save();
							topCtx.beginPath();
							topCtx.moveTo(mouse.x, mouse.y)
							topCtx.lineTo(mouse.x-100, mouse.y);
							topCtx.lineTo(mouse.x-50, mouse.y-100);
							topCtx.lineTo(mouse.x, mouse.y);
							if(lineWidth > 0){
								clearTopCanvas();
								topCtx.fillStyle = fillStyle; 
								topCtx.fill();
								topCtx.lineWidth = lineWidth;
								topCtx.strokeStyle = strokeStyle;
								topCtx.stroke();
							}
							topCtx.closePath();
							topCtx.restore();

					}
				}
				
				// Function Name: doMouseUp()
				// Author: Tony Jefferson
				// Last update: 3/1/2014
				// I have added a circle and triangle parameter to the cases
				function doMouseup(e) {
					switch(currentTool) {
						case TOOL_PENCIL:
						ctx.closePath();
							break;
						case TOOL_RECTANGLE:
						case TOOL_LINE:
						case TOOL_CIRCLE:
						case TOOL_TRIANGLE:
							if(dragging){
								ctx.drawImage(topCanvas,0,0);
								clearTopCanvas()
							}
							break;
					}
					
					
					dragging = false;
				}
				
				// Function Name: doMouseOut()
				// Author: Tony Jefferson
				// Last update: 3/1/2014
				// I have added a circle and triangle parameter to the cases
				function doMouseout(e) {
					// if the user drags out of the canvas
					switch(currentTool) {
						case TOOL_PENCIL:
						ctx.closePath();
							break;
						case TOOL_RECTANGLE:
						case TOOL_LINE:
						case TOOL_CIRCLE:
						case TOOL_TRIANGLE:
							// cancel the drawing
							clearTopCanvas()
							break;
					}
					
					dragging = false;
				}
				
				function doToolChange(e) {
					currentTool = e.target.value;
				}
				
				function doStrokeColorChange(e){
					strokeStyle = e.target.value;
				}
				
				function doFillColorChange(e){
					fillStyle = e.target.value;
				}
				
				function doLineWidthChange(e){
					lineWidth = e.target.value;
				}

				function doCircleRadiusChange(e){
					circleRadius = e.target.value;
				}

				function backgroundColorChange(e){
					backgroundColor = e.target.value;
					ctx.fillStyle = backgroundColor; 
					ctx.fillRect(0,0,800,480); 
				}
				function clearTopCanvas(){
					topCtx.clearRect(0,0,topCtx.canvas.width,topCtx.canvas.height);
				}

			  
				document.querySelector("#noiseCB").onclick = function(e){
					drawParams.showNoise = e.target.checked;
				};
			  
				document.querySelector("#invertCB").onclick = function(e){
					drawParams.showInvert = e.target.checked;
				};
				  
				document.querySelector("#pastelCB").onclick = function(e){
					drawParams.showPastel = e.target.checked;
				};

		
		function draw(params={}){
			let imageData = topCtx.getImageData(0,0,canvasWidth,canvasHeight);
			let data = imageData.data;
			let length = data.length;
				//iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
				for(let i = 0; i < length; i += 4){
				//andomly change every 20th pixel to red
						if(params.showNoise && Math.random() < .05){
						// data[i] is the red channel
						// data[i+1] is the green channel
						// data[i+2] is the blue channel
						// data[i+3] is the alpha channel
						data[i] = data[i+2] = 0;// zero out the red and green and blue channels
						data[i+2] = 255;// make the blue channel 100% blue
					}
						//invets color choice
						if(params.showInvert){
							let red =  data[i], green = data[i+1], blue = data[i+2];
							data[i] = 255 - red;
							data[i + 1] = 255 - green;
							data[i + 2] = 255 - blue;
						}
						//creates pastel effect on chosen color
						if(params.showPastel){
							let red =  data[i], green = data[i+1], blue = data[i+2];
							data[i] = red+100;
							data[i + 1] = green+100;
							data[i + 2] = blue+100;
						}
		}
		


		//copy image data back to canvas
		topCtx.putImageData(imageData, 0,0);
}
							