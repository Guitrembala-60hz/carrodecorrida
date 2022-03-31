class Form {
    constructor() {
        this.input = createInput("").attribute("placeholder", "digite seu nome");
        this.button = createButton("Jogar");
        this.title = createImg("./assets/TITULO.png");
        this.msg = createElement("h2");
    }

    positionElements() {
    this.title.position(120,50);
    this.input.position(width/2 - 110, height/2 - 80);
    this.button.position(width/2 - 90, height/2 - 20);
    this.msg.position(width/2 - 300, height/2 - 100);

    }

    styleElements() {
        this.title.class("gameTitle");
        this.input.class("customInput");
        this.button.class("customButton");
        this.msg.class("greeting");
    }

    esconder() {
        this.input.hide();
        this.button.hide();
        this.msg.hide();
        this.title.position(40,50);
        this.title.class("gameTitleAfterEffect");

    }

    mouseClick() {
        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            var nome = this.input.value();
            var mensagem = `Olá,${nome} </br> espere o outro jogador entrar...`;
            this.msg.html(mensagem); 

            Jcount = Jcount + 1;
            jogador.name = nome;
            jogador.index = Jcount;
            jogador.addJogadores();
            jogador.updateJogadores(Jcount);
            jogador.lerDistancia();
        } ) 
    }

    display() {
        this.positionElements();
        this.styleElements();
        this.mouseClick();
    }

}
