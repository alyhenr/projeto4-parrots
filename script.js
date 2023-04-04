const container = document.querySelector(".container");
const gifsCards = [
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/bobrossparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/explodyparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/fiestaparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/metalparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/revertitparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/tripletsparrot.gif",
  "./Arquivos Úteis - Projeto 04 - Parrot Card Game/unicornparrot.gif",
];

let qtde = 0;
let nCards = [];
let counter = 0;

const finishTheGame = () => {
  alert(`Você ganhou em ${counter} jogadas!`);
}

function isTheSameCard(firstChoice, currentOne) {
  counter++;  
  currentOne.classList.add("rotate-back");

  function rotateCardsBack() {
    
    firstChoice.classList.remove("rotate-back"); 
    currentOne.classList.remove("rotate-back");
    
  }

  const card1 = firstChoice.querySelector('.gif').src;
  const card2 = currentOne.querySelector('.gif').src;

  if (card1 !== card2) {
    setTimeout(       
      () => rotateCardsBack()     
    , 1000)
  } else {  

      firstChoice.classList.remove("not-found"); 
      currentOne.classList.remove("not-found");       
  }

  if (!container.getElementsByClassName("not-found").length) {
    setTimeout(       
      () => finishTheGame()     
    , 700); 
    }     
  
};

function rotateCard(card) {

  const firstChoice = container.querySelector('.rotate-back.not-found');
  
  // Para evitar a possibilidade de se clicar rapidamente em varias cartas:
  const nSelectedCards = container.getElementsByClassName("rotate-back not-found").length;
  console.log(container.getElementsByClassName("rotate-back not-found"))

  if (firstChoice !== null) {
    if (nSelectedCards === 1) isTheSameCard(firstChoice, card.querySelector('.back-face'));

  } else {    
    const backFace = card.querySelector(".back-face");    
    
    backFace.classList.add("rotate-back");
    counter++;
  }
};

function comparador() {
  return Math.random() - 0.5;
};

const card = (randomImg) => {
  return `
            <div class="card" onclick="rotateCard(this)">
                <div class="front-face face">
                    <img src="./Arquivos Úteis - Projeto 04 - Parrot Card Game/back.png" alt="back-img" />
                </div>
                <div class="back-face face not-found">
                    <img class="gif" src="${randomImg}" alt="img" />
                </div>
            </div>
        `;
};

while (qtde < 4 || qtde > 14 || qtde % 2 !== 0) {
  qtde = prompt("Com quantas cartas você deseja jogar?");
};

const mixedCards = gifsCards.sort(comparador);

for (let i = 0; i < qtde / 2; i++) {
  nCards.push(card(mixedCards[i]));
};

nCards = [...nCards, ...nCards];
nCards = nCards.sort(comparador);

container.innerHTML = nCards.join("");
