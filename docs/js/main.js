function startGame(){
   var myGamePiece;
var myObstacles = [];
    myGameArea.start();
    //pieces
    myGamePiece = new component(30, 30, "red", 30, 120);
}

var myGameArea = {
    //CANVAS
    canvas : document.createElement("canvas"),
    start : function() {
        //preparing the game canvas
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        //this runs the game
        this.interval = setInterval(updateGameArea, 20);
        //LISTENING STUDIO
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
    })   
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
    })
},
    clear : function() { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
},
    stop : function() { clearInterval(this.interval);
}
} //END MYGAMEAREA HERE



//CHOOSE HOW MANY FRAMES TO WAIT BETWEEN ACTIONS
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
function component(width, height, color, x, y) {
 //PLAYER ENVIRONMENT VARIABLES
  this.width = width; 
  this.height = height;
  this.x = x;
  this.y = y;
  ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  this.speedX = 0;
  this.speedY = 0;
  //UPDATE PLAYER OBJECT
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  //COMPONENT RESPONDS TO BUTTON CLICK
  this.clicked = function() {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var clicked = true;
    if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
      clicked = false;
    }
    return clicked;
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  //collision mechanics
  this.crashWith = function(otherobj) {
  //gather data about where this.boundaries are
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
  //data for object being collided with boundaries
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || 
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
//UPDATE GAME AREA
function updateGameArea() {
//ends game if collision 
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
    }
  //continue game
  myGameArea.clear();
   //THE LAND BETWEEN FRAMES
   
  
  //THINGS THAT HAPPEN REPEATEDLY
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
  var x, y;
    x = myGameArea.canvas.width;
    y = myGameArea.canvas.height - 200
    myObstacles.push(new component(10, 200, "green", x, y));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  //KEYBOARD MOVEMENT
  if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
  if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
  if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
  if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
  myGamePiece.newPos();
  //END OF THE LAND BETWEEN FRAMES
  myGamePiece.update();
  }
