// Armazenando o corpo do HTML, onde serão inseridas as cartas:
const container = document.querySelector(".container");

// Armazenando o elemto para inserir os segundos passados do inicio do jogo (timer):
const timer = document.querySelector(".timer");

// Referencias aos gids a serem implementados de forma aleatória na 
// quantidade de cartas desajada pelo usuário:
const gifsCards = [
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/bobrossparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/explodyparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/fiestaparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/metalparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/revertitparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/tripletsparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/unicornparrot.gif",
];

// Declarando variavel para posterior armazenamento da quantidade de cartas
// que o usuario deseja jogar:
let qtde = 0;
// Array para adicionar as divs (cartas) que serão renderizadas no HTML:
let nCards = [];
// Contador do numero de jogadas:
let counter = 0;
// Tempo passado:
let time = 0;

// Função chamada quando todas as cartas são encontradas:
const finishTheGame = () => {  
  alert(`Você ganhou em ${counter} jogadas! A duração do jogo foi de ${time} segundos!`);

  let reloadGame = "";
  
  while (reloadGame !== "sim" && reloadGame !== "não") {
    reloadGame = prompt("Gostaria de jogar novamente?");
    if (reloadGame === "sim") location.reload();
  };
};

// Quando uma carta sem par está selecionada, essa função verifica se a proxima carta escolhida
// é o par desta:
function isTheSameCard(firstChoice, currentOne) {
  // Atualiza o valor do contados (numero de jogadas):
  counter++;

  currentOne.classList.add("rotate-back");

  function rotateCardsBack() {
    firstChoice.classList.remove("rotate-back");
    currentOne.classList.remove("rotate-back");
  }

  const card1 = firstChoice.querySelector(".gif").src;
  const card2 = currentOne.querySelector(".gif").src;

  if (card1 !== card2) {
    setTimeout(() => rotateCardsBack(), 1000);
  } else {
    firstChoice.classList.remove("not-found");
    currentOne.classList.remove("not-found");
  }

  if (!container.getElementsByClassName("not-found").length) {
    setTimeout(() => finishTheGame(), 700);
  }
}

// Mostra qual o gif da carta clicada:
function rotateCard(card) {
  // Verifica se já havia uma carta (sem par) selecionada: 
  const firstChoice = container.querySelector(".rotate-back.not-found");  
  const backFace = card.nextElementSibling;

  // Para evitar a possibilidade de se clicar rapidamente em varias cartas:
  const nSelectedCards = container.getElementsByClassName(
    "rotate-back not-found"
  ).length;  

  if (firstChoice !== null) {
    if (nSelectedCards === 1) // Para garantir que a função que compara as cartas 
    // só seja executada quando apenas uma carta (sem par) estiver selecionada
      isTheSameCard(firstChoice, backFace);
  } else {   

    backFace.classList.add("rotate-back");
    counter++;
  }
}

function comparador() {
  return Math.random() - 0.5;
}

const card = (randomImg) => {
  return `
            <div class="card" data-test="card">
                <div onclick="rotateCard(this)" class="front-face face">
                    <img 
                      data-test="face-down-image" 
                      src="./Arquivos Úteis - Projeto 04 - Parrot Card Game/back.png" 
                      alt="back-img"
                    />
                </div>
                <div class="back-face face not-found">
                    <img data-test="face-up-image" class="gif" src="${randomImg}" alt="img" />
                </div>
            </div>
        `;
};

while (qtde < 4 || qtde > 14 || qtde % 2 !== 0) {
  qtde = prompt("Com quantas cartas você deseja jogar?");
}

function timerCounter() {
    time++;
    timer.innerHTML = time;
    callback();
}

function callback() {
  setTimeout(() => {
    timerCounter()
  }, 1000);
}

callback();

const mixedCards = gifsCards.sort(comparador);

for (let i = 0; i < qtde / 2; i++) {
  nCards.push(card(mixedCards[i]));
}

nCards = [...nCards, ...nCards];
nCards = nCards.sort(comparador);

container.innerHTML = nCards.join("");
