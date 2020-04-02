var snake;
var pixel_size = 20;
var food = [];
var movement = [];
var highscore = 0;
var gameState = 'init';

function setup(){
  createCanvas(720, 600);
  frameRate(10);
}

function initGame(){
  background(50, 50, 56);
  var name = 'Morgans Snake Game';
  textSize(50);
  fill(255);
  nameWidth = textWidth(name);
  text(name, (width - nameWidth)/2, height/2 - 40);
  noLoop();
}

function startGame(){
  removeElements();
  
  gameState = 'play';
  snake = new Snake();
  setJellyfood(1);
  
  loop();
}

function runGame(){
  
  background(50, 50, 56);
  textSize(12);
  fill(255);
  text("Score: " + snake.tail.length, 1, 10);
  text("Highscore: " + highscore, 1, 24);

  snake.update();
  snake.show();
  snake.checkDeath();
  
	
	fill(2, 120, 200);
	
  for(var i=0;i<food.length;i++){
    rect(food[i].x, food[i].y, pixel_size, pixel_size);
    if(snake.eat(food[i])){
      snake.tail.push(createVector(snake.x, snake.y));
      food.splice(i, 1);
      setJellyfood(1);
      if(snake.tail.length > highscore) highscore = snake.tail.length;
    }
  }
}

function endGame(){
  background(156, 1, 12);
  textSize(32);
  var msg = 'Game Over';
  var score = 'Your Score is ' + snake.tail.length;
  msgWidth = textWidth(msg);
  scoreWidth = textWidth(score);
  fill(255);
  text(msg, (width - msgWidth)/2, height/2 - 40);
  text(score, (width - scoreWidth)/2, height/2);
  removeElements();
  noLoop();
}

function draw(){
  if(gameState == 'init'){
    initGame();
  }
  else if(gameState == 'play'){
    runGame();
  }
  else if(gameState == 'end'){
    endGame();
  }
}

function setJellyfood(num){
  var cols = floor(width / pixel_size);
  var rows = floor(height / pixel_size);
  for(var i=0;i<num;i++){
    var location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    while(snake_intersect(location)){
      location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    
	
	}
	
	
    food.push(location);
  }
}

function snake_intersect(location){
  var intersect = false;
  if(location.x == snake.pos.x && location.y == snake.pos.y){
    intersect = true;
  }else{
    for(var i=0;i<snake.tail.length;i++){
      if(location.x == snake.tail[i].x && location.y == snake.tail[i].y){
        intersect = true;
        break;
      }
    }
    for(var i=0;i<food.length;i++){
      if(location.x == food[i].x && location.y == food[i].y){
        intersect = true;
        break;
      }
    }
  }
  return intersect;
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    movement.push([0, 1]);
  }else if(keyCode === UP_ARROW){
    movement.push([0, -1]);
  }else if(keyCode === LEFT_ARROW){
    movement.push([-1, 0]);
  }else if(keyCode === RIGHT_ARROW){
    movement.push([1, 0]);
  }
 
}