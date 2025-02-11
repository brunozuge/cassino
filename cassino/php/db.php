<?php
$host = 'localhost';
$dbname = 'cassino';
$username = 'root'; // Altere para seu usuário MySQL
$password = '';     // Altere para sua senha MySQL

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>