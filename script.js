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
                Frente
                </div>
                <div class="back-face face">
                    <img src=${randomImg} alt="img" />
                </div>
            </div>
        `;
};

while (qtde < 4 || qtde > 14 || qtde % 2 !== 0) {
  qtde = prompt("Com quantas cartas você deseja jogar?");
}

for (let i = 0; i < qtde/2; i++) {
  nCards.push(card(gifsCards.sort(comparador)[i]));
}

nCards = [...nCards, ...nCards];
nCards = nCards.sort(comparador);

container.innerHTML = nCards.join('');
