	var canvas = document.querySelector("#myCanvas");
	var scoreT = document.querySelector("#scoree");
	var bestscoreT = document.querySelector("#bestscoree");
	var timerT = document.querySelector("#timer");
	var btn = document.querySelector("#restartbtn");
	var backbtn = document.querySelector("#backbtn");
	var langlist = document.querySelector("#langlist");
	var instruclong = document.querySelector("#instruclong");
	var instruct = document.querySelector("#instruc");
	var context = canvas.getContext("2d");
    var radius = 30;		
	var grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var gridback = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var score = 0;
	var bestScore = 0;
	var sec = 0;
	var time;
	var instructionsText,instructionsLongText,scoreTextLong,bestscoreText,newGameText,
	    pointsText,gameoverText,winText,loseText,backText;
	
	translate("en");
    init();
	update();


	btn.addEventListener("click", function() {
		init();
		update();
	});

	backbtn.addEventListener("click", function() {
		for(i=0; i < 25; i++) {
		grid[i] = gridback[i];
		}	
		update();
	});

	langlist.addEventListener("change", function() {
		var langselected = langlist.options[langlist.selectedIndex].value; 
	    translate(langselected);
		update();
	});

	canvas.addEventListener("click", function(evt) {
		var mousePos = getMousePos(canvas, evt);
		
		if (mousePos.x > (canvas.width-100) && mousePos.x < canvas.width
		    && mousePos.y > 0 && mousePos.y < 50 ) {
			init();
			update();
		}
	});
	
	document.addEventListener('keydown', function(event) {

		for(i=0; i < 25; i++) {
		gridback[i] = grid[i];
		}

	//Arrow Right
		if(event.keyCode === 39) {
		generateCell();	
		for(j=0; j < 5; j++) {
		    for(i=0; i < 24; i++) {
			if (i !== 4 && i !== 9 && i !== 14 && i !== 19) {
			if (grid[i] > 0 && grid[i+1] === 0) 
			{
			grid[i+1] = grid[i];
			grid[i] = 0;
		    }
			else if (grid[i] > 0 && grid[i] === grid[i+1])
			{
			grid[i+1] = grid[i];
			score += grid[i]*5;
			grid[i] = 0;
		    }
		    }
			}
		}
		}
		
	//Arrow Left	
		else if(event.keyCode === 37) {
		generateCell();	
		for(j=0; j < 5; j++) {
		    for(i=24; i > 0; i--) {
			if (i !== 5 && i !== 10 && i !== 15 && i !== 20) {
			if (grid[i] > 0 && grid[i-1] === 0) 
			{
			grid[i-1] = grid[i];
			grid[i] = 0;
		    }
			else if (grid[i] > 0 && grid[i] === grid[i-1])
			{
			grid[i-1] = grid[i];
			score += grid[i]*5;
			grid[i] = 0;	
		    }	
		    }
			}
		}
		}

	//Arrow up	
		else if(event.keyCode === 38) {
		generateCell();	
		for(j=0; j < 5; j++) {
		    for(i=24; i > 0; i--) {
			if (i !== 1 && i !== 2 && i !== 3 && i !== 4) {
			if (grid[i] > 0 && grid[i-5] === 0) 
			{
			grid[i-5] = grid[i];
			grid[i] = 0;
		    }
			else if (grid[i] > 0 && grid[i] === grid[i-5])
			{
			grid[i-5] = grid[i];
			score += grid[i]*5;
			grid[i] = 0;	
		    }	
		    }
			}
		}
		}
		
	//Arrow down	
		else if(event.keyCode === 40) {
		generateCell();	
		for(j=0; j < 5; j++) {
		    for(i=0; i < 24; i++) {
			if (i !== 20 && i !== 21 && i !== 22 && i !== 23) {
			if (grid[i] > 0 && grid[i+5] === 0) 
			{
			grid[i+5] = grid[i];
			grid[i] = 0;
		    }
			else if (grid[i] > 0 && grid[i] === grid[i+5])
			{
			grid[i+5] = grid[i];
			score += grid[i]*5;
			grid[i] = 0;	
		    }	
		    }
			}
		}
		}	
		
	
		update();

    }, false);

	//Timer
	function updateTimer() {
	    sec = (sec + 1) % 10000;
	    timerT.textContent = sec;
	}
		

	function generateCell(){
		
		var cellRandd, colorRandd;
		var emptyCells = getEmptyCellsNb();
		var numberLoop = Math.min(2, emptyCells);
		
		for(i=0; i < numberLoop; i++) {
		cellRandd = Math.floor(Math.random() * 25);
		colorRandd = Math.floor((Math.random() * 3) + 1);
		while (grid[cellRandd] > 0) {
	    cellRandd = Math.floor(Math.random() * 25);
	    }

		grid[cellRandd] = colorRandd;
		}	
	}
	
	function getEmptyCellsNb(){
		var emptyNb = 0;
		for(i=0; i < 25; i++) {
	    if (grid[i] === 0) {
		emptyNb++;
		}
		}
		return emptyNb;
	}

	//Gameover check
	function gameOver(){
		var gameover = 0;
		
		for(i=6; i < 9; i++) {
	    if ((grid[i+1] !== 0 && grid[i+1] !== grid[i])
	        && (grid[i-1] !== 0 && grid[i-1] !== grid[i])
			&& (grid[i+5] !== 0 && grid[i+5] !== grid[i])
			&& (grid[i-5] !== 0 && grid[i-5] !== grid[i]))		
		{
		gameover++;
		}
		}
		
		for(i=11; i < 14; i++) {
	    if ((grid[i+1] !== 0 && grid[i+1] !== grid[i])
	        && (grid[i-1] !== 0 && grid[i-1] !== grid[i])
			&& (grid[i+5] !== 0 && grid[i+5] !== grid[i])
			&& (grid[i-5] !== 0 && grid[i-5] !== grid[i]))		
		{
		gameover++;
		}
		}

		for(i=16; i < 19; i++) {
	    if ((grid[i+1] !== 0 && grid[i+1] !== grid[i])
	        && (grid[i-1] !== 0 && grid[i-1] !== grid[i])
			&& (grid[i+5] !== 0 && grid[i+5] !== grid[i])
			&& (grid[i-5] !== 0 && grid[i-5] !== grid[i]))		
		{
		gameover++;
		}
		}	

		for(i=1; i < 4; i++) {
	    if ((grid[i+1] !== 0 && grid[i+1] !== grid[i])
	        && (grid[i-1] !== 0 && grid[i-1] !== grid[i])
			&& (grid[i+5] !== 0 && grid[i+5] !== grid[i]))		
		{
		gameover++;
		}
		}	

		for(i=21; i < 24; i++) {
	    if ((grid[i+1] !== 0 && grid[i+1] !== grid[i])
	        && (grid[i-1] !== 0 && grid[i-1] !== grid[i])
			&& (grid[i-5] !== 0 && grid[i-5] !== grid[i]))		
		{
		gameover++;
		}
		}

		for(i=5; i < 20; i += 5) {
	    if ((grid[i+1] !== 0 && grid[i+1] !== grid[i])
		    && (grid[i+5] !== 0 && grid[i+5] !== grid[i])
			&& (grid[i-5] !== 0 && grid[i-5] !== grid[i]))		
		{
		gameover++;
		}
		}

		for(i=9; i < 20; i += 5) {
	    if ((grid[i-1] !== 0 && grid[i-1] !== grid[i])
	        && (grid[i+5] !== 0 && grid[i+5] !== grid[i])
			&& (grid[i-5] !== 0 && grid[i-5] !== grid[i]))		
		{
		gameover++;
		}
		}

	    if ((grid[1] !== 0 && grid[1] !== grid[0])
	        && (grid[5] !== 0 && grid[5] !== grid[0]))		
		{
		gameover++;
		}

	    if ((grid[21] !== 0 && grid[21] !== grid[20])
	        && (grid[15] !== 0 && grid[15] !== grid[20]))		
		{
		gameover++;
		}	

	    if ((grid[3] !== 0 && grid[3] !== grid[4])
	        && (grid[9] !== 0 && grid[9] !== grid[4]))		
		{
		gameover++;
		}	
		
	    if ((grid[23] !== 0 && grid[23] !== grid[24])
	        && (grid[19] !== 0 && grid[19] !== grid[24]))		
		{
		gameover++;
		}
		
		return gameover;
	}
	
	function init(){
		var cellRand, colorRand;
		score = 0;
		sec = 0;
		grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		timerT.textContent = sec;
		clearInterval(time);
		time = setInterval("updateTimer()", 1000);
		for(i=0; i < 11; i++) {
	    cellRand = Math.floor(Math.random() * 25);
		colorRand = Math.floor((Math.random() * 3) + 1);
		grid[cellRand] = colorRand;
		}

	    cellRand = Math.floor(Math.random() * 25);
		grid[cellRand] = 4;

	    cellRand = Math.floor(Math.random() * 25);
		grid[cellRand] = 5;

	    cellRand = Math.floor(Math.random() * 25);
		grid[cellRand] = 6;

		for(i=0; i < 25; i++) {
		gridback[i] = grid[i];
		}	
	}

	function update(){
		var gameO;
		var scoreText = scoreTextLong + score + pointsText;
		var bestS = bestscoreText + bestScore + pointsText;
		scoreT.textContent = scoreText;
		bestscoreT.textContent = bestS;
		btn.innerHTML = newGameText;
		backbtn.innerHTML = backText;
		instruclong.innerHTML = instructionsLongText;
		instruct.textContent = instructionsText;
		
		for(i=0; i < 25; i++) {
	    drawCell(i);
		}
		
		gameO = gameOver();
		
		if (gameO === 25) {
		bestScore = Math.max(bestScore,score);
		bestS = bestscoreText + bestScore + pointsText;
		if (score >= 2015) {
		scoreT.textContent = gameoverText + winText;
		}
		else if (score < 2015) {
		scoreT.textContent = gameoverText + loseText;
		}		
		bestscoreT.textContent = bestS;
		clearInterval(time);
		}
    }	

	function getCoorX(nb){
	    var refX = canvas.width/2;
		var nb_2 = nb%5 , x;

	    switch(nb_2) {
		case 0:
			x = refX + 5*radius;
	        break;	
	    case 1:
			x = refX - 7*radius;
	        break;
	    case 2:
			x = refX - 4*radius;
	        break;
	    case 3:
			x = refX - radius;
	        break;
	    case 4:
			x = refX + 2*radius;
	        break;
	    }		
		 return x;
	 
	}
	
	function getCoorY(nb){	
	    var refY = canvas.height/2;	
		var y;

		if(nb < 6) {
		y = refY - 7*radius;
		}
	    else if(nb > 5 && nb < 11) {
		y = refY - 4*radius;
		}
	    else if(nb > 10 && nb < 16) {
		y = refY - radius;
		}
	    else if(nb > 15 && nb < 21) {
		y = refY + 2*radius;
		}
	    else if(nb > 20 && nb < 26) {
		y = refY + 5*radius;
		}		
		return y;
	 
	}
	
    function getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
		return {
	        x: evt.clientX - rect.left,
	        y: evt.clientY - rect.top
	        };
	}
	

	function drawCell(nb){  
		var color;
	    var cellX, cellY;
	    cellX = getCoorX(i+1);
	    cellY = getCoorY(i+1);
		
		switch(grid[nb]) {
	    case 0:
	        color = "white";
	        break;
	    case 1:
	        color = "#6495ED";
	        break;
	    case 2:
	        color = "#32CD32";
	        break;
	    case 3:
	        color = "#FF4500";
	        break;
	    case 4:
	        color = "black";
	        break;	
	    case 5:
	        color = "#FFD700";
	        break;	
	    case 6:
	        color = "#5F9EA0";
	        break;		        		        
	    }
		
	    context.beginPath();
	    context.rect(cellX, cellY, 2 * radius, 2 * radius);
		context.closePath();
	    context.fillStyle = color;
	    context.fill();
	    context.lineWidth = 2;
	    context.strokeStyle = "black";
	    context.stroke();
    }
	
	function translate(lang){  
		switch(lang) {
	    case "en":
			instructionsText = "Instructions";
			instructionsLongText = "Use directional arrows to merge the same colors.<br/>You win when you score at least 2015 points.<br/>Seems simple? Give it a try!";
			scoreTextLong = "Your score: ";
			bestscoreText = "Your best score: ";
			newGameText = "New game";
			pointsText = " points";
			gameoverText = "Game over! ";
			winText = "You win";
			loseText = "You lose";
			backText = "Back -1";
	        break;			
	    case "fr":
			instructionsText = "Instructions";
			instructionsLongText = "Utilisez les touches directionnelles pour fusionner les m&ecirc;mes couleurs.<br/>Vous gagnez lorsque vous marquez au moins 2015 points.<br/>Cela semble simple? Alors pourquoi ne pas l\'essayer?";
			scoreTextLong = "Votre score: ";
			bestscoreText = "Votre meilleur score: ";
			newGameText = "Nouveau jeu";
			pointsText = " points";
			gameoverText = "Jeu termin&eacute;! ";
			winText = "Vous avez gagn&eacute;";
			loseText = "Vous avez perdu";
			backText = "Arri&egrave;re -1";
	        break;        
	    }
    }