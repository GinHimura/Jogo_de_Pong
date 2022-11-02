//variavel bolinha
xBolinha = 300;
yBolinha = 200;
dmBolinha = 17;
raioBolinha = dmBolinha / 2;

//variavel minha raquete
xRaquete = 5;
yRaquete = 150;
lgRaquete = 8;
altRaquete = 90;

//variavel raquete oponente
xRaqueteOp = 585;
yRaqueteOp = 150;
var vlYOponente;
let chanceDeErrar = 0;

//velocidade da bolinha
vlXBolinha = 6;
vlYBolinha = 6;

//placar do jogo
meusPontos = 0;
pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  trilha.loop();
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostrarBolinha();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOp, yRaqueteOp);
  movBolinha();
  baterBorda();
  movMinhaRaquete();
  //verfColisaoRaquete();
  verfColisaoRaqueteBiblio(xRaquete, yRaquete);
  verfColisaoRaqueteBiblio(xRaqueteOp, yRaqueteOp);
  movRaqueteOp();
  incluirPlacar();
  pontuar();
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, dmBolinha);
}

function mostrarRaquete(xRaquete, yRaquete) {
  rect(xRaquete, yRaquete, lgRaquete, altRaquete);
}

function movBolinha() {
  xBolinha += vlXBolinha;
  yBolinha += vlYBolinha;
}

function baterBorda() {
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0 ) {
    vlXBolinha *= -1;
  }
  
  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
    vlYBolinha *= -1;
  }
}

function movMinhaRaquete() {
  if (keyIsDown(UP_ARROW) && yRaquete > 0) {
    yRaquete -= 5;
  }

  if (keyIsDown(DOWN_ARROW) && yRaquete < height - altRaquete) {
    yRaquete += 5;
  }
}

function verfColisaoRaquete() {
  if (xBolinha - raioBolinha < xRaquete + lgRaquete && (yBolinha + raioBolinha > yRaquete && yBolinha - raioBolinha < yRaquete + altRaquete)) {
    vlXBolinha *= -1;
    raquetada.play();
  }
}

function movRaqueteOp() {
  //Opção movimentar sozinho
  //vlYOponente = yBolinha - yRaqueteOp - lgRaquete / 2 - 30;
  //yRaqueteOp += vlYOponente + chanceDeErrar
  //calculaChanceDeErrar();
  
  //Jogar com 2 pessoas
  if (keyIsDown(87) && yRaqueteOp > 0) {
    yRaqueteOp -= 5;
  }

  if (keyIsDown(83) && yRaqueteOp < height - altRaquete) {
    yRaqueteOp += 5;
  }
}

function verfColisaoRaqueteBiblio(x,y){
  colisao = collideRectCircle(x, y, lgRaquete, altRaquete, xBolinha, yBolinha, dmBolinha);
  if (colisao) {
    raquetada.play();
    vlXBolinha *= -1;
  } 
}

function pontuar() {
  if (xBolinha < 10) {
    ponto.play();
    meusPontos += 1;
  }
  if (xBolinha > 590) {
    ponto.play();
    pontosOponente += 1;
  }
}

function incluirPlacar() {
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
  text(pontosOponente, 470, 26);
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

