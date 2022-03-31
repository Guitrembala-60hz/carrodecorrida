var canvas, database, form, bgImg, estadojogo, jogador, Jcount;
var carro1, carro2, carroImg1, carroImg2, pistaImg, allPlayers, carros = [];

function preload() {
  bgImg = loadImage("assets/planodefundo.png");
  carroImg1 = loadImage("assets/car1.png");
  carroImg2 = loadImage("assets/car2.png");
  pistaImg = loadImage("assets/PISTA.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
 database = firebase.database();

 game = new Game();
 game.lerEstado();
 game.start();


}

function draw() {
  background(bgImg);
  
  if(Jcount === 2) {
    game.update(1);
  }
  if(estadojogo === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
