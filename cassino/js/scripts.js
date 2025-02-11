// Função de Registro
document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("register-button");

    // Adiciona um evento de clique ao botão de registro
    registerButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validação básica
        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Envia os dados para o backend via POST
        fetch("php/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(data.success);
                window.location.href = "login.html"; // Redireciona para a página de login
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error("Erro ao registrar:", error);
            alert("Ocorreu um erro ao registrar. Tente novamente.");
        });
    });
});