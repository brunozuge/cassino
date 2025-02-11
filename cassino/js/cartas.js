let balance = 1000; // Saldo inicial fictício

// Atualiza o saldo na tela
document.getElementById("balance").textContent = balance.toFixed(2);

// Adiciona o evento de clique ao botão "Jogar"
document.getElementById("play-cards").addEventListener("click", function () {
    // Solicita a aposta do jogador
    const bet = prompt("Digite sua aposta para o jogo de cartas:");
    if (!bet || isNaN(bet) || parseFloat(bet) <= 0 || parseFloat(bet) > balance) {
        alert("Aposta inválida!");
        return;
    }

    // Gera cartas aleatórias para o jogador e o dealer (valores entre 1 e 10)
    const playerCard = Math.floor(Math.random() * 10) + 1;
    const dealerCard = Math.floor(Math.random() * 10) + 1;

    // Exibe as cartas na tela
    document.getElementById("cards-result").textContent = `Sua carta: ${playerCard}, Carta do Dealer: ${dealerCard}`;

    // Verifica quem ganhou
    if (playerCard > dealerCard) {
        alert("Você ganhou!");
        balance += parseFloat(bet); // Adiciona a aposta ao saldo
    } else if (playerCard < dealerCard) {
        alert("Você perdeu!");
        balance -= parseFloat(bet); // Deduz a aposta do saldo
    } else {
        alert("Empate!");
    }

    // Atualiza o saldo na tela
    document.getElementById("balance").textContent = balance.toFixed(2);
});