class Game {
    constructor() {
     this.resetTitle = createElement("h2");
     this.resetButton = createButton("");

     this.placarTitle = createElement("h2");
     this.placar1 = createElement("h2");
     this.placar2 = createElement("h2");
    }

    mostrarElementos() {
        this.resetTitle.html("reiniciar jogo");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width/2 +200,40);

        this.resetButton.class("resetButton");
        this.resetButton.position(width/2 +230,100);

        this.placarTitle.html("Placar:");
        this.placarTitle.class("resetText");
        this.placarTitle.position(width/3-60,40);

        this.placar1.class("leadersText");
        this.placar1.position(width/3 - 50,80);

        this.placar2.class("leadersText");
        this.placar2.position(width/3 - 50,130);
    }

    mostrarPlacar() {
        var pl1, pl2;
        var players = Object.values(allPlayers);

        if(
            (players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1
        ) {
            pl1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
            pl2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
        }

        if(players[1].rank === 1) {
            pl2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
            pl1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
        }

        this.placar1.html(pl1);
        this.placar2.html(pl2);
    }

    lerEstado() {
        var estadoRef = database.ref("gameState");
        estadoRef.on("value", function(data){
            estadojogo = data.val();
        })
    }

    start() {
        jogador = new Player();
        jogador.lerJogadores();
      form = new Form();
      form.display();

      carro1 = createSprite(width/2 - 50, height - 100);
      carro1.addImage("car1",carroImg1);
      carro1.scale = 0.07;

      carro2 = createSprite(width/2 + 100, height - 100);
      carro2.addImage("car2",carroImg2);
      carro2.scale = 0.07;
      
      carros = [carro1,carro2];

  }
  update(state) {
      database.ref("/").update({
          gameState: state
      })
  }
  play() {
      form.esconder();
      this.mostrarElementos();
      this.clickReset();
      Player.infoJogadores();

      
  
      if(allPlayers !== undefined) {
          image(pistaImg,0,-height * 3, width, height * 6);

          this.mostrarPlacar();

          var index = 0;
          for(var plr in allPlayers) {
              index = index + 1;
              var x = allPlayers[plr].positionX;
              var y = height-allPlayers[plr].positionY;

              carros[index-1].position.x = x;
              carros[index-1].position.y = y;

              if(index === jogador.index) {
                  stroke(10);
                  fill("red");
                  ellipse(x,y,60,60);

                  //posiçao da camera
                  camera.position.x = carros[index-1].position.x;
                  camera.position.y = carros[index-1].position.y;
              }
            
          } 
          
        this.playerControl();

          drawSprites();
      }
  }

    playerControl() {
        if(keyIsDown(UP_ARROW)) {
            jogador.positionY = jogador.positionY +10;
            jogador.updatePosition();
        }
        if(keyIsDown(LEFT_ARROW) && jogador.positionX > width/3 - 50) {
            jogador.positionX = jogador.positionX - 5;
            jogador.updatePosition();
        } 
        if(keyIsDown(RIGHT_ARROW) && jogador.positionX < width/2 + 300) {
            jogador.positionX = jogador.positionX +5;
            jogador.updatePosition();
        }
    }

    clickReset() {
        this.resetButton.mousePressed(() => {
            database.ref("/").set ({
                playerCount: 0,
                gameState: 0,
                jogadores: {}
            });
            window.location.reload();
        })
    }

}
