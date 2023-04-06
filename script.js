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
  // Parando o cronômetro:
  clearInterval(timerCount);
  // Menssagem final:
  alert(
    `Você ganhou em ${counter} jogadas! A duração do jogo foi de ${time} segundos!`
  );
  // Possibilidade de reiniciar o jogo ou permanecer na tela com o jogo finalizado:
  let reloadGame = "";
  while (reloadGame !== "sim" && reloadGame !== "não") {
    reloadGame = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
    if (reloadGame === "sim") location.reload();
  }
};

// Renderizando no HTML o número de jogadas:
function roundCounter(n) {
  document.querySelector(".round-counter").innerHTML = n + 1;
}

// Quando uma carta sem par está selecionada, essa função verifica se a proxima carta escolhida
// é o par desta:
function isTheSameCard(firstChoice, currentOne) {
  // Atualiza o valor do contador (numero de jogadas):
  roundCounter(counter++);

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
    // Implementado essa comparação o bug de dar double-click rapidamente e deixar
    // o card virado foi eliminado, pois como o src das img são comparados, era possível
    // chamar a função IsTheSameCard duas vezes rapidamente para uma mesma card e remover
    // a classe not-found, deixando uma carta virada:
    if (firstChoice.id !== currentOne.id) {
      firstChoice.classList.remove("not-found");
      currentOne.classList.remove("not-found");
    }
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
    if (nSelectedCards === 1)
      // Para garantir que a função que compara as cartas
      // só seja executada quando apenas uma carta (sem par) estiver selecionada
      isTheSameCard(firstChoice, backFace);
  } else {
    backFace.classList.add("rotate-back");
    roundCounter(counter++);
  }
}

function comparador() {
  return Math.random() - 0.5;
}

const card = (randomImg) => {
  return `
            <div class="card" data-test="card">
                <div 
                  onclick="rotateCard(this)" 
                  class="front-face face"
                >
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

// Embaralhando os gifs do array gifsCards:
const mixedCards = gifsCards.sort(comparador);

// Com o array embaralhado, implemeta-se os gifs nas div a serem renderizadas no container:
for (let i = 0; i < qtde / 2; i++) {
  nCards.push(card(mixedCards[i]));
}

// Como cada card precisa do seu par, metade da qtde pedida pelo usuário é gerada,
// e a outra metade é replicada, tendo-se assim os pares de cards:
nCards = [...nCards, ...nCards];

// Por fim, como o array ficou simétrico, devido a replicação anterior, embaralha-se
// novamente, tendo-se então a quantidade de cartas pedida pelo usuário, os devidos
// pares e tudo embaralhado:
nCards = nCards.sort(comparador);

// Renderizando os cards no HTML:
container.innerHTML = nCards.join("");

//(Eliminando um bug encontrado) Gerando um id única para cada card, elimando o bug
// de clicar duas vezes rapidamente em uma mesma card e contar como se o par tivesse sido
// encontrado, dado que os pares estão
// sendo definidos de acord com o src das imagens:
document
  .querySelectorAll(".back-face")
  .forEach((card, index) => (card.id = `card-${index}`));

// Iniciando o contador em 0:
timer.innerHTML = 0;

// Começa a contar o tempo:
const timerCount = setInterval(() => {
  time++;
  timer.innerHTML = time;
}, 1000);
