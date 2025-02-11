<?php
include 'db.php'; // Inclui a conexão com o banco de dados

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados enviados pelo frontend
    $data = json_decode(file_get_contents('php://input'), true);
    $username = trim($data['username']);
    $password = $data['password'];

    // Validação básica
    if (empty($username) || empty($password)) {
        echo json_encode(['error' => 'Todos os campos são obrigatórios.']);
        exit();
    }

    // Verifica se o nome de usuário já existe
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        echo json_encode(['error' => 'Nome de usuário já existe.']);
        exit();
    }

    // Criptografa a senha
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insere o novo usuário no banco de dados
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt->execute([$username, $hashedPassword])) {
        echo json_encode(['success' => 'Registro realizado com sucesso!']);
    } else {
        echo json_encode(['error' => 'Erro ao registrar usuário.']);
    }
} else {
    echo json_encode(['error' => 'Método de requisição inválido.']);
}
?>