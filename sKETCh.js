//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete 
let xRaquete= 5;
let yRaquete= 150;
let RaqueteComprimento= 10;
let RaqueteAltura= 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

let colidiu= false;

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaquete(xRaquete,yRaquete);
    mostraRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
}
  
function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraBolinha(){
      circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function mostraRaquete(){
      rect(xRaquete, yRaquete, RaqueteComprimento, RaqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=  10;
  }
   if (keyIsDown(DOWN_ARROW)){
    yRaquete +=  10;
  }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function verificaColisaoRaquete( x,y){
 colidiu = collideRectCircle(x, y, RaqueteComprimento, RaqueteAltura, xBolinha, yBolinha, raio);
 if (colidiu){
       velocidadeXBolinha *= -1;
           raquetada.play();

  }
}

function mostraRaqueteOponente() {
    rect(xRaqueteOponente, yRaqueteOponente, RaqueteComprimento, RaqueteAltura);
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - RaqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}