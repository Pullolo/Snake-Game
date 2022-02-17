var gamecell = 50;
var kierunek;
var gameloop;
var headx;
var heady;
var prevx;
var prevy;
var fruitx;
var fruity;
var fruit;
var score;
var xBody = new Array(200);
var yBody = new Array(200);
var id;

document.onload = load();
window.onload = setInterval(() => {
  update();
}, 200);

function load(){
  document.getElementsByClassName("start")[0].addEventListener("click", close);
}

function close() {
  console.log("close");
  document.querySelector(".play-screen").classList.add("close");
  document.querySelector(".background-blur").classList.add("close");
  start();
}

function open() {
  console.log("open");
  document.querySelector(".play-screen").classList.remove("close");
  document.querySelector(".background-blur").classList.remove("close");
  
}

// console
function consolee(){
  console.log(fruit + " -fruit");
  console.log(fruitx + " -x");
  console.log(fruity + " -y");
  console.log(score + " -score");
}
// console




//snake ->

function start() {
  score = 0;
  headx = 0;
  heady = 0;
  kierunek = 0;
  fruit = 0;
  document.getElementsByClassName("head")[0].style.left = headx + "px";
  document.getElementsByClassName("head")[0].style.bottom = heady + "px";
  window.addEventListener("keydown", movement, true);
  document.getElementsByClassName("head")[0].style.display = "block";
  gameloop = 1;
}

function stop() {
  window.removeEventListener("keydown", movement, true);
  document.querySelectorAll('.body').forEach(e => e.remove());
  gameloop = 0;
  document.getElementsByClassName("head")[0].style.display = "none";
  document.getElementsByClassName("fruit")[0].style.display = "none";
  open();
}

function update() {

  if(gameloop == 1){
    move();
    moveBody();
    selfCheck();
    //consolee();
    fruitSpawn();
    pointcheck();
    displayScore();
    //consolee();
    WallColider();
  }
}

function movement(event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "Down":
    case "ArrowDown":
      if(kierunek!= 0) {
        kierunek = 180;
      }
      break;
    case "Up":
    case "ArrowUp":
      if(kierunek!= 180) {
        kierunek = 0;
      }
      break;
    case "Left":
    case "ArrowLeft":
      if(kierunek!= 90) {
        kierunek = 270;
      }
      break;
    case "Right":
    case "ArrowRight":
      if(kierunek!= 270) {
        kierunek = 90;
      }
      break;
    default:
      return;
  }

  event.preventDefault();
}

function WallColider() {
  if(headx > 1050 || headx < 0){
    stop();
  }
  if(heady > 550 || heady < 0){
    stop();
  }
}

function move() {
  prevx = headx;
  prevy = heady;
  if (kierunek === 0) {
    heady += 50;
  } else if (kierunek === 180) {
    heady += -50;
  } else if (kierunek === 90) {
    headx += 50;
  } else if (kierunek === 270) {
    headx += -50;
  }
  document.getElementsByClassName("head")[0].style.left = headx + "px";
  document.getElementsByClassName("head")[0].style.bottom = heady + "px";
}

function fruitSpawn() {
  if (fruit == 0) {
    fruitx = getRandomInt(0, 21) * 50;
    fruity = getRandomInt(0, 11) * 50;
    document.getElementsByClassName("fruit")[0].style.display = "block";
    document.getElementsByClassName("fruit")[0].style.left = fruitx + "px";
    document.getElementsByClassName("fruit")[0].style.bottom = fruity + "px";
    fruit = 1;
  }
}

function pointcheck() {
  if(headx == fruitx && heady == fruity){
    score+=1;
    fruit=0;
    createBodyPart();
  }
}

function selfCheck(){
  for(var i=1; i<score; i++){
    if(headx == xBody[i] && heady == yBody[i]) {
      stop();
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var bodyDiv = '<div class="body" id="blok' + id + '"></div>';

function createBodyPart(){
  id = score;
  bodyDiv = '<div class="body" id="blok' + id + '"></div>';
  document.getElementsByClassName("playfield")[0].innerHTML += bodyDiv;
}

function moveBody(){
  for(var i = score; i > 0; i--){
    if(i==1){
      console.log(i + " = 0");
      xBody[1] = prevx;
      yBody[1] = prevy;
      document.getElementById("blok1").style.left = xBody[1] + "px";
      document.getElementById("blok1").style.bottom = yBody[1] + "px";
      document.getElementsByClassName("body")[score-1].style.display = "block";
    }
    else {
      console.log(i + " = else");
      xBody[i] = xBody[i-1];
      yBody[i] = yBody[i-1];
      document.getElementById("blok" + i).style.left = xBody[i] + "px";
      document.getElementById("blok" + i).style.bottom = yBody[i] + "px";
      document.getElementsByClassName("body")[score-1].style.display = "block";
    }
  }
}

function displayScore(){
  document.querySelector(".score-box").innerHTML = "Score: " + score;
}