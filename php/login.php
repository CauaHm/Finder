<?php
// Configurações do banco de dados
$host = '127.0.0.1:3306';
$user = 'root';
$password = 'telef8ne'; // Atualize conforme necessário
$database = 'finder_pi';

// Criar conexão com o banco
$conn = new mysqli($host, $user, $password, $database);

// Verificar se houve erro na conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verificar se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Consulta SQL para buscar o usuário no banco
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar se a senha corresponde
        if (password_verify($senha, $user['senha'])) {
            echo "Login bem-sucedido! Redirecionando...";
            header("Location: https://unisofinder.netlify.app/");
            exit;
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "E-mail não encontrado.";
    }

    // Fechar a consulta
    $stmt->close();
}

// Fechar conexão com o banco
$conn->close();
?>
