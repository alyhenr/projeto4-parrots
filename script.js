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

function comparador() {
  return Math.random() - 0.5;
}

const card = (randomImg) => {
  return `
            <div class="card">
                <div class="front-face face">
                    <img src="./Arquivos Úteis - Projeto 04 - Parrot Card Game/back.png" alt="back-img" />
                </div>
                <div class="back-face face">
                    <img src="${randomImg}" alt="img" />
                </div>
            </div>
        `;
};

while (qtde < 4 || qtde > 14 || qtde % 2 !== 0) {
  qtde = prompt("Com quantas cartas você deseja jogar?");
}

for (let i = 0; i < qtde/2; i++) {
  console.log(gifsCards.sort(comparador)[i]);
  nCards.push(card(gifsCards.sort(comparador)[i]));
}
console.log(nCards)
nCards = [...nCards, ...nCards];
nCards = nCards.sort(comparador);
console.log(nCards)
container.innerHTML = nCards.join('');

const cardsGame = document.getElementsByClassName("card");
for (let j = 0; j <  cardsGame.length; j++) {
    cardsGame[j].addEventListener("click", (ev) => {
        ev.currentTarget.querySelector('.back-face').classList.add("rotate");        
    });
};
