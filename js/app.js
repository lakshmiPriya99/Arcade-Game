//all modals
let startModal = document.querySelector(".onStart");
let overlay = document.querySelector(".overlay");
let gameFinished = document.querySelector(".gameComplete");
let winModal = document.querySelector(".win");


// points and lives of character
var Points = 0;
var Lives = 3;

//starts the game
function onStart() {
    startModal.classList.add("hide");
    overlay.classList.add("hide");

    // Initial points
    Points = 100;
}

//when all lives lost
function gameCompleted() {
    overlay.classList.add("show");
    gameFinished.classList.add("show");
}

// this function resets the game
function playAgain() {
    window.location.reload(true);
}

//runs to check lives
function updateLives() {
    if (fullLives.length === 0) {
        gameCompleted()
    }
}

// function when character reaches top and wins game
function winner() {
    document.getElementById("finalPoints").innerHTML = Points;
    overlay.classList.add("show");
    winModal.classList.add("show");

}

var Enemy = function(x, y, speed = 1) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.location = (x, y);
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += 70 * this.speed * dt;

    // collison detection
    if (parseInt(this.x) + 100 >= charX && parseInt(this.x) <= charX + 40 && this.y === charY) {
        myPlayer.reset();
        fullLives.pop();
        Lives -= 1

        if (Points <= 100) {
            Points -= 50;
        }
    }

    updateLives();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Character = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};
var charX
var charY

Character.prototype.update = function() {
    charX = this.x;
    charY = this.y;
}

// this draws player on canvas
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//to handleInput() 
Character.prototype.handleInput = function(keyPress) {
    if (keyPress === 'left' && this.x > 33) {
        this.x -= 100;
    } else if (keyPress === 'up' && this.y > 18) {
        this.y -= 80;
    } else if (keyPress === 'right' && this.x < 400) {
        this.x += 100
    } else if (keyPress === 'down' && this.y < 380) {
        this.y += 80
    }
};

//reset position of character
Character.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

var myLives = function(x, y) {
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};

//render lives class
myLives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}

//the water block
var Winner = function(x, y) {
    this.x = x;
    this.y = y
}

var winX
var winY
Winner.prototype.update = function() {
    winX = this.x;
    winY = this.y;

/*if player reaches water block*/

    if ((-Math.abs(winY)) == charY && this.x == charX) {
        winner();
        myPlayer.reset();
    }
}

// display points
var playerPoints = function(x, y, score) {
    this.x = x;
    this.y = y;
    this.score = "Your points: " + Points
}
playerPoints.prototype.render = function() {
    ctx.font = '15px Comfortaa';
    ctx.fillText(this.score, this.x, this.y);
}
playerPoints.prototype.update = function() {
    this.score = "Your points: " + Points
}

// X-axis on board
var columns = [-5, -100, -200, -300, -400];
var enX;

// Y-axis positions on board
var rows = [60, 140, 220];
var enY;

var enSpeed;

// randomly pick locations for bugs
setInterval(function instances() {
    enX = columns[Math.floor(Math.random() * 5)],
        enY = rows[Math.floor(Math.random() * 3)],
        enSpeed = Math.floor(Math.random() * 50),
        Enemies.push(new Enemy(enX, enY, enSpeed));
}, 300)

// instantiate objects.
// Enemies- array of all enemy objects 
var Enemies = [new Enemy(-8, 60, 3), new Enemy(0, 140, 10), new Enemy(-5, 300, 15)];

// Place the player object in a variable called myPlayer
var myPlayer = new Character(200, 380);

// instantiate lives
var fullLives = [new myLives(10, 540), new myLives(40, 540), new myLives(70, 540)];

// instantiate winning blocks
var winSquare = [new Winner(0, 20), new Winner(100, 20), new Winner(200, 20), new Winner(300, 20), new Winner(400, 20)];

var myPoints = new playerPoints(350, 570)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    myPlayer.handleInput(allowedKeys[e.keyCode]);
});