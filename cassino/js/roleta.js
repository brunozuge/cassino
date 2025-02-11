document.addEventListener("DOMContentLoaded", function () {
    const spinButton = document.getElementById("spin-button");
    const rouletteWheel = document.getElementById("roulette-wheel");
    const resultElement = document.getElementById("result");
    const balanceElement = document.getElementById("balance");

    let balance = 100; // Saldo inicial do jogador

    // Função para girar a roleta
    spinButton.addEventListener("click", function () {
        const betColor = document.getElementById("bet-color").value;
        const betAmount = parseInt(document.getElementById("bet-amount").value);

        // Validação da aposta
        if (isNaN(betAmount) || betAmount <= 0) {
            alert("Por favor, insira um valor válido para a aposta.");
            return;
        }

        if (betAmount > balance) {
            alert("Você não tem saldo suficiente para essa aposta.");
            return;
        }

        // Desabilita o botão durante a animação
        spinButton.disabled = true;

        // Gera um ângulo aleatório para simular o giro
        const randomAngle = Math.floor(Math.random() * 360); // Ângulo final entre 0 e 359
        const duration = 3; // Duração da animação em segundos

        // Aplica a animação CSS
        rouletteWheel.style.transition = `transform ${duration}s ease-out`;
        rouletteWheel.style.transform = `rotate(${randomAngle + 360 * 5}deg)`; // 5 voltas completas + ângulo final

        // Calcula o resultado final com base no ângulo
        setTimeout(() => {
            let resultColor = "";

            if (randomAngle >= 0 && randomAngle < 90) {
                resultColor = "vermelho";
            } else if (randomAngle >= 90 && randomAngle < 180) {
                resultColor = "verde";
            } else if (randomAngle >= 180 && randomAngle < 270) {
                resultColor = "azul";
            } else {
                resultColor = "amarelo";
            }

            // Verifica se o jogador ganhou ou perdeu
            if (resultColor === betColor) {
                balance += betAmount; // Ganha o valor apostado
                resultElement.textContent = `Parabéns! Você ganhou R$${betAmount}. Cor sorteada: ${resultColor}`;
            } else {
                balance -= betAmount; // Perde o valor apostado
                resultElement.textContent = `Que pena! Você perdeu R$${betAmount}. Cor sorteada: ${resultColor}`;
            }

            // Atualiza o saldo
            balanceElement.textContent = balance;

            // Reabilita o botão após a animação
            spinButton.disabled = false;
        }, duration * 1000); // Aguarda o tempo da animação
    });
});