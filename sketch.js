// Aryan Verma
// 2023-06-05
// This program is an imitation of pong. Two players can play, each have to move the paddles on their side of the screen to hit the bacll back to the other player. If they miss the other player gets a point. First to ten points wins the game.

// Global variables

// Width of the paddle
var paddleWidth = 10;
// Height of the paddle
var paddleHeight = 80;
// Speed of the paddle when keys are pressed
var paddleSpeed = 5;
// Size of the pong ball
var ballSize = 15;
// X position of the ball
var ballXPos;
// Y position of the ball
var ballYPos;
// Speed of the ball horizontally
var ballXPosSpeed;
// Speed of the ball vertically
var ballYPosSpeed;
// Player 1 score
var player1Score = 0;
// Player 2 score
var player2Score = 0;
// The max score one player can achieve, then the game ends
var maxScore = 10;

// Paddle variables

// Player 1's paddle will start and always stay at the left side of the canvas
var player1PaddleX = 0;
// Player 1's paddle will start halfway on the canvas but can change from the press of the "w" and "s" key
var player1PaddleY = 200;
// Player 1's paddle will start and always stay at the right side of the canvas
var player2PaddleX = 390;
// Player 2's paddle will start halfway on the canvas but can change from the press of the up arrow and down arrow key
var player2PaddleY = 200;

// Variable placeholder to see if the game has started
var start = false;
// Variable placeholder to see if the user wants to see the instructions tab
// If the instructions box is clicked this value will turn true
var instructions = false;

// Pong collsion audio
var pongCollision = new Audio("Pong.mp3");
// Pong collision with wall audio
var pongWall = new Audio("Pong Wall.mp3");

// Defining the font used in the program
let fontShort;

// Function loads the font into the program
function preload() {
  fontShort = loadFont("ShortBaby Font.ttf");
}

// Function to display the home screen
function homeScreen() {
  // Creates a black background
  background(0);
  // Text is aligned at the center of the screen
  textAlign(CENTER);
  // The text will be displayed white
  fill(255);
  // The text will have a size of 20
  textSize(20);
  // Text tells the user to press space to play
  text("Press Space to Play", 400 / 2, 400 / 2);
  // Text is 80 size
  textSize(80);
  // Applies new font to text
  textFont(fontShort);
  // Game title
  text("Pong", 400 / 2, 400 / 4);

  // Display instructions button
  fill(0);
  // Makes the box white
  stroke(255);
  // Makes the box for the button
  rect(400 / 2 - 60, 400 / 2 + 50, 120, 40);
  // Makes the text white
  fill(255);
  // The text size is 16
  textSize(16);
  // Text says instructions inside the box
  text("Instructions", 400 / 2, 400 / 2 + 75);
}

// Function to display the instructions
function instructionsScreen() {
  // Background is black
  background(0);
  // Text will be aligned in the center
  textAlign(CENTER);
  // Text will be white
  fill(255);
  // Text size will be 20
  textSize(20);
  // Header
  text("Instructions", 400 / 2, 30);
  // Text size will be 16
  textSize(16);
  // Text tells players the instructions
  text(
    "Player 1: Use up and down arrow keys to move the paddle",
    400 / 2,
    400 / 2 - 40
  );
  text("Player 2: Use W and S keys to move the paddle", 400 / 2, 400 / 2);

  // Display back button
  // The button box will be black
  fill(0);
  // The box will have white outlines
  stroke(255);
  // The back button box size
  rect(400 / 2 - 60, 400 / 2 + 120, 120, 40);
  // The text will be white
  fill(255);
  // Text size will be 16
  textSize(16);
  // Text says back
  text("Back", 400 / 2, 400 / 2 + 145);
}

// Setup function
function setup() {
  // Creates a 400,400 canvas
  createCanvas(400, 400);
  // Calls the reset ball method to put the ball back in the center and put a new random speed to it
  resetBall();
}

// Draw function
function draw() {
  // Background is black
  background(0);
  // If the value of start is false
  if (start == false && instructions == true) {
    // If the value of instructions is true
    // Display the instructions screen to the user
    instructionsScreen();
  }
  // Else display the homescreen
  else if (start == false && instructions == false) {
    homeScreen();
  } else {
    // Draw paddles
    // noStroke allows for no outlines on the paddles
    noStroke();
    // Fill will make the paddles white
    fill(255);
    // Makes the paddles using dimensions declared before
    rect(player1PaddleX, player1PaddleY, paddleWidth, paddleHeight);
    // Makes the paddles using dimensions declared before
    rect(player2PaddleX, player2PaddleY, paddleWidth, paddleHeight);

    // When the up arrow key is pressed, the y position of player 2 paddle will decrease, therefore the paddle will go up
    if (keyIsDown(UP_ARROW)) {
      // The y position will go in increments of the paddle speed
      player2PaddleY -= paddleSpeed;
    }
    // When the down arrow key is pressed, the y position of player 2 paddle will increase, therefore the paddle will go down
    if (keyIsDown(DOWN_ARROW)) {
      // The y position will go in increments of the paddle speed
      player2PaddleY += paddleSpeed;
    }
    // If the position of player 1 paddle is less than zero, then it will stay at zero
    // This will restrict the paddle from going out the canvas
    if (player1PaddleY <= 0) {
      // Player 1 paddle y positon will equal zero
      player1PaddleY = 0;
    }
    // If the position of player 1 paddle is more than 400, it will stay 400
    // This will restrcit the paddle from going out of the canvas
    if (player1PaddleY >= 400 - paddleHeight) {
      // Subtracting the paddle height from 400 because the rectangle location is defined from the top left corner
      player1PaddleY = 400 - paddleHeight;
    }
    // If the user presses the "w" key,  the y position of player 1 paddle will decrease, therefore the paddle will go up
    if (keyIsDown(87)) {
      // The y position will go in increments of the paddle speed
      player1PaddleY -= paddleSpeed;
    }
    // If the user presses the "s" key,  the y position of player 1 paddle will increase, therefore the paddle will go down
    if (keyIsDown(83)) {
      // The y position will go in increments of the paddle speed
      player1PaddleY += paddleSpeed;
    }
    // If the position of player 1 paddle is less than 0, it will stay 0
    // This will restrict the paddle from going out the canvas
    if (player2PaddleY <= 0) {
      // Paddle 2 y position will stay at zero
      player2PaddleY = 0;
    }
    // If the position of player 2 paddle is more than 400, it will stay 400
    // This will restrcit the paddle from going out of the canvas
    if (player2PaddleY >= 400 - paddleHeight) {
      // Subtracting the paddle height from 400 because the rectangle location is defined from the top left corner
      player2PaddleY = 400 - paddleHeight;
    }

    // Draw dotted lines to split the players into two sections
    sideSplit();

    // Invoking the draw ball function
    drawBall();

    // Update ball position by adding x and y speed that are randomly generated
    ballXPos += ballXPosSpeed;
    ballYPos += ballYPosSpeed;

    // Check if the ball has collided with anything
    collision();

    // Draw scores of the players
    score();
  }
}

// Function to check ball collision with paddles and walls
function collision() {
  // Check collision with paddles
  // If the ball's left edge is touching or overlapping with player 1's paddle
  // If the ball's vertical position is within player 1's paddle height
  if (
    ballXPos - ballSize / 2 <= player1PaddleX + paddleWidth &&
    ballYPos >= player1PaddleY &&
    ballYPos <= player1PaddleY + paddleHeight
  ) {
    // Increase the ball speed on collision by changing its horizontal direction, making it go to the other player
    ballXPosSpeed *= -1.1;
    // Adjust ball's vertical speed based on collision position to create different angles and speed up the y value of ball speed
    ballYPosSpeed = (ballYPos - (player1PaddleY + paddleHeight / 2)) * 0.1;
    // Play a sound effect indicating a collision
    pongCollision.play();
  } // Check if the ball's right edge is touching or overlapping with player 2's paddle
  // Check if the ball's vertical position is within player 2's paddle height
  else if (
    ballXPos + ballSize / 2 >= player2PaddleX &&
    ballYPos >= player2PaddleY &&
    ballYPos <= player2PaddleY + paddleHeight
  ) {
    // Increase the ball speed on collision by changing its horizontal direction, making it go to the other player
    ballXPosSpeed *= -1.1;
    // Adjust ball's vertical speed based on collision position to create different angles and speed up the y value of ball speed
    ballYPosSpeed = (ballYPos - (player2PaddleY + paddleHeight / 2)) * 0.1;
    // Play a sound effect indicating a collision
    pongCollision.play();
  }

  // Check collision with walls
  if (ballYPos - ballSize / 2 <= 0 || ballYPos + ballSize / 2 >= 400) {
    // Reverse ball's vertical direction on collision with top or bottom walls
    ballYPosSpeed *= -1;
    // Play a sound effect indicating a collision with the wall
    pongWall.play();
  }

  // Check if ball goes out of bounds on player 1 side
  if (ballXPos - ballSize / 2 <= 0) {
    // Increase player 2's score when the ball goes out of bounds on the left side
    player2Score++;
      // Reset the ball position and continue the game
      resetBall();
  }
  // Check if the ball goes out of bounds on player 2 side
  else if (ballXPos + ballSize / 2 >= 400) {
    // Increase player 1's score when the ball goes out of bounds on the right side
    player1Score++;
      // Reset the ball position and continue the game
      resetBall();
    }
  if((player2Score >= maxScore) || (player1Score >= maxScore)){
    // If one of the players reach the max score, the game restarts 
      start = false;
  }
}


// Function to draw the ball
function drawBall() {
  // noStroke() allows for no outline on the ball
  noStroke();
  // The colour of the ball
  // It changes colour by updating the RGB values to the position of the ball
  fill(ballXPos, ballYPos, ballSize);
  // Draws the ball by using the ball size values defined from before
  ellipse(ballXPos, ballYPos, ballSize, ballSize);
}

// Function to draw the split in the players sides
function sideSplit() {
  // For loop to create the dotted lines to split the player sides
  for (var i = 0; i < 400; i += 75) {
    // Dotted line to split the players sides
    stroke(255);
    line(400 / 2, 40 + i, 400 / 2, 70 + i);
  }
}

// Function to reset the ball's position and speed
function resetBall() {
  // Speed array to hold the limited range of speeds the ball can start at
  let speeds = [-5, -4, -3, 3, 4, 5];
  // Ball starts in the middle of the game
  ballXPos = 400 / 2;
  ballYPos = 400 / 2;
  // Gets a random value from the speeds array
  ballXPosSpeed = random(speeds);
  ballYPosSpeed = random(speeds);
}

// Function to check if the mouse is pressed inside the instructions button
function mouseClicked() {
  // If the game has not started and the mouse x,y position is inside the instructions box and clicked, the user wants to enter the intructions screen
  if (
    !start &&
    mouseX >= 400 / 2 - 60 &&
    mouseX <= 400 / 2 + 60 &&
    mouseY >= 400 / 2 + 50 &&
    mouseY <= 400 / 2 + 90
  ) {
    // Display the instructions screen
    instructions = true;
  }
  // If the user is on the intructions screen and the mouse x,y position is on the back button, the user wants to go back to the homescreen
  if (
    instructions &&
    mouseX >= 400 / 2 - 60 &&
    mouseX <= 400 / 2 + 60 &&
    mouseY >= 400 / 2 + 120 &&
    mouseY <= 400 / 2 + 160
  ) {
    // Go back to the home screen
    instructions = false;
  }
}

// Function to draw the scores
function score() {
  // Text will be aligned in the center
  textAlign(CENTER);
  // Text will be 20 size
  textSize(20);
  // The text will be white
  fill(255);
  // Displays player 1 score in the top of the screen
  text("Player 1 Score: " + player1Score, 400 / 4, 30);
  // Displays player 2 score in the top of the screen
  text("Player 2 Score: " + player2Score, (400 / 4) * 3, 30);
}

// Function to handle key press events
function keyPressed() {
  // If spacebar is pressed and the players are not in the instructions screen the game will start
  if (keyCode === 32 && instructions === false) {
    if (start == false) {
      // Resets the scores
      if (player1Score >= maxScore || player2Score >= maxScore) {
        player1Score = 0;
        player2Score = 0;
      }
    }
    // To start the game
    start = true;
  }
}
