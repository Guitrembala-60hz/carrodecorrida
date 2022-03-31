class Player {
    constructor() {
        this.name = null;
        this.index = null;
        this.positionX = 0;
        this.positionY = 0;
        this.rank = 0;
        this.score = 0;
    }
    
    addJogadores() {
        var playerIndex = "jogadores/jogador" + this.index;
        if(this.index === 1) {
            this.positionX = width/2 - 100;
        }
        else{
            this.positionX = width/2 + 100;
        }

        database.ref(playerIndex).set({
            name: this.name,
            positionX: this.positionX,
            positionY: this.positionY,
            rank: this.rank,
            score: this.score

        })
    }

    lerJogadores() {
        var jogadoresRef = database.ref("playerCount");
        jogadoresRef.on("value", function(data){
            Jcount = data.val();
        })
    }

    updateJogadores(count) {
        database.ref("/").update({
            playerCount: count
        })
    }

    static infoJogadores() {
        var infoRef = database.ref("jogadores");
        infoRef.on("value", function(data){
        allPlayers = data.val();
        });
    }

    updatePosition() {
       var playerIndex = "jogadores/jogador" + this.index;
       database.ref(playerIndex).update({
           positionX: this.positionX, positionY: this.positionY, rank: this.rank, score: this.score
       })
    }

    lerDistancia() {
        var playerIndex = "jogadores/jogador" + this.index;
        database.ref(playerIndex).on("value", function(data){
            var dado = data.val();
            this.positionX = dado.positionX;
            this.positionY = dado.positionY;
        })
    }
    
}
