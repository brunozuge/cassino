<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = trim($data['username']);
    $password = $data['password'];

    if (empty($username) || empty($password)) {
        echo json_encode(['error' => 'Todos os campos são obrigatórios.']);
        exit();
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['balance'] = $user['balance'];
        echo json_encode(['success' => 'Login bem-sucedido!']);
    } else {
        echo json_encode(['error' => 'Usuário ou senha inválidos.']);
    }
}
?>