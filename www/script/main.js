require([],function () {
    console.log("yo, I'm alive!");

    //Prompt box pop up welcoming the player and giving the player some basic instructions on how to start the game
    alert("Welcome to the Candy Counter!\nThis game will test your memory skills and is proven to improve brain memory over time.\n\nPlease indicate the difficulty level (Easy, Medium, Hard) by choosing the dropdown menu")

    //The variable "paper" was created to start a Raphael project
    var paper = new Raphael(document.getElementById("mySVGCanvas"));
    // put the width and heigth of the canvas into variables for our own convenience
    var pWidth = paper.canvas.offsetWidth;
    var pHeight = paper.canvas.offsetHeight;
    //The variable "speed" was defined to hold the change of speed depending on the difficulty selected
    var speed;
    //HTML DOM to retrieve dropdown menu
    var userDifficulty = document.getElementById("myList");
    //HTML DOM to retrieve game instructions
    var instructions = document.getElementById("instructions");

    //Drawing the startbutton and starttext using Raphael
    var startButton = paper.rect(250,170,100,50,20);
    startButton.attr({
        stroke: "white",
        fill: "coral"
    });
    var startText = paper.text(300, 200, 'START');
    startText.attr({
        "font-family": "Comic Sans MS",
        "font-size": 18,
        "fill": "white"
    });
    //The initial number of jellies
    var sizeJellyArray = 0;
    //DifficultyValue variable is defined for 
    var difficultyValue;
    //The variable timeout" and "count" were declared to be used in functions later
    var timeout;
    var count = 0
    //HTML DOM to retrieve the end button
    var endGameButton = document.getElementById("endButton");


    //------add event listeneters------//
    //Instructions
    instructions.addEventListener("click", function(){
        alert("Welcome to JellyBean Counter! \nBased on the difficulty you have selected there will be a number of jellybeans that will be displayed on the screen for you to count.\nAfter 10 seconds a window will prompt asking you how many jellybeans there were")
    });
    
    //The start function is only called when the startbutton is pressed
    startButton.node.addEventListener('click', function (){
        console.log("Game is starting");
        startButton.hide();  
        difficultyValue = parseInt(userDifficulty.options[userDifficulty.selectedIndex].value)
        changeJellyAmount();
        startJelly(sizeJellyArray);

        timer(); //Calls the timer function
    });

     //An event listener was added to the end button
    endGameButton.addEventListener("click", function(){
        prematureEnd(); //calls the prematureEnd function
        clearTimeout(timeout); //clears the timeout previously set when the game was started
        ready();  
    });

    //An event listener was added to the ready button
    userDifficulty.addEventListener("change", function(){
        var setDifficulty = userDifficulty.options[userDifficulty.selectedIndex].value;
        //Conversion of the string to an integer (1 for Easy, 2 for Medium or 3 for Difficult)
        var difficultyValue = parseInt(setDifficulty)
        console.log("the level selected is "+ difficultyValue);
    });

    //Function map used to calculate the array
    function map (x, a, b, m, n ) {
        return (x-a)*(n-m) / (b-a)+m;
    };

    //Ready function displays the start button to allow the player to start the game
    var ready = function(){
        startButton.show();
        startButton.toFront();
        startText.show();
        jelly[j].toBack
    };
    //Work function hides the start button when player starts the game
    var work = function(){
        startButton.hide();
        startText.hide();
        jelly[1].hide();
    };

    //TODO: function that shows N elements
    var startJelly = function(amountToShow){
        //show "amountToShow" amount of jelly
        amountToShow = sizeJellyArray
        setInterval(draw,speed);
    };

    //The level of difficulty selected will change the amount of jellies shown
    var changeJellyAmount = function(){
        //Depending on the difficulty level chosen, the game will generate a specific number of jellybeans
        if (difficultyValue == 1) {
            //This is the easiest mode. There will only be a small amount of jellybeans
            speed = 50; //Candies are moving at 5 seconds
            sizeJellyArray = 2 + Math.floor((Math.random() * 4) + 1);
        } else if (difficultyValue == 2) {
            speed = 30; //Candies are moving at 3 seconds
            sizeJellyArray = 5 + Math.floor((Math.random() * 4) + 1);
        } else if (difficultyValue == 3) {
            speed = 20; //Candies are moving at 2 seconds
            sizeJellyArray = 6 + Math.floor((Math.random() * 4) + 1);
        };
    };
    //Moving the candy object within the paper specifications
    var draw = function(){
        count++; 
        var j = 0;
        while (j < sizeJellyArray){
            //Updating the position of the candy
            jelly [j].xpos += jelly [j].xrate;
            jelly [j].ypos += jelly [j].yrate;
            //Moving candy according to state variables
            jelly [j].attr({'cx': jelly [j].xpos, 'cy': jelly [j].ypos});
            if (jelly [j].xpos > pWidth) {
                jelly [j].xrate = -jelly [j].xrate;
            };
            if (jelly [j].ypos > pHeight) {
                jelly [j].yrate = - jelly [j].yrate;
            };
            if (jelly [j].xpos < 0) {
                jelly [j].xrate = -jelly [j].xrate;
            };
            if (jelly [j].ypos < 0) (jelly [j].yrate = - jelly [j].yrate);
            j = j+1;
        };
    };
    //Timer function makes sure the game ends after 10 seconds
    var timer = function(){
        timeout = setTimeout(end, 10000); //the end function is called after 10 seconds
    };
    //Ends the game
    var end = function(){
        //A pop up box to let the user know how he/she fared in the game
        var userInput = prompt("How many candies did you count?")
        //To determine if the player has counted correctly
        if (sizeJellyArray == userInput){
            alert("You're correct!")}
        else {
            alert("Sorry you are incorrect, Please try again !")
        };
        console.log("game has ended");
    };

    //Ends the game when the player chooses to do so before the end of the 10 seconds
    var prematureEnd = function(){
        //A pop up box to prompt the player to start a new game
        confirm("You have ended the game. Select the level of difficulty to start a new game.");   
        console.log("game has ended");
        clearInterval(speed);
        clearInterval(sizeJellyArray);
    };   

    //Drawing the target object using Raphael  
    //Array used for jellybean
    var init = function(){
        jelly = []
        var j = 0
        sizeJellyArray = 20 //variable declared to set amount of candies shown in an array
        while (j < sizeJellyArray){
            jelly [j] = paper.circle(pWidth/2, pHeight/2, 20);
            jelly [j].attr({"fill": "pink"});
            jelly [j].xpos= pWidth/2;
            jelly [j].ypos= pHeight/2;
            jelly [j].xrate = map (Math.random(0,1), 0, 1, -6, 6);
            jelly [j].yrate = map (Math.random(0,1), 0, 1, -6, 6);
            //Changing candy colors
            var hue = map(Math.random(0,1), 0, 1, 0, 360);
            var saturation = map(Math.random(0,1), 0, 1, 0, 100);
            var lightness = map(Math.random(0,1), 0, 1, 0, 100); 
            var color = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
            jelly [j].attr({"fill": color});
            jelly [j].color=color;
        j = j+1;
        };
    }; init();
});
