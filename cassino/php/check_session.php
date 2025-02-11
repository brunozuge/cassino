<?php
session_start();
if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'logged_in' => true,
        'username' => $_SESSION['username'],
        'balance' => $_SESSION['balance']
    ]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>