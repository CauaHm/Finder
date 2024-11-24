<?php
// Configuração do banco de dados
$host = '127.0.0.1:3306';
$user = 'root'; // Nome de usuário do seu MySQL
$password = 'telef8ne'; // Senha do seu MySQL
$database = 'finder_pi';

// Criar conexão
$conn = new mysqli($host, $user, $password, $database);

// Verificar a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Receber os dados do formulário via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Coletar e sanitizar os dados recebidos
    $nome = $conn->real_escape_string($_POST['nome']);
    $sobrenome = $conn->real_escape_string($_POST['sobrenome']);
    $email = $conn->real_escape_string($_POST['email']);
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // Criptografar a senha

    // Verificar se os campos não estão vazios
    if (!empty($nome) && !empty($sobrenome) && !empty($email) && !empty($senha)) {
        // Preparar a consulta para inserir os dados
        $sql = "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES ('$nome', '$sobrenome', '$email', '$senha')";

        // Executar a consulta e verificar sucesso
        if ($conn->query($sql) === TRUE) {
            echo "<script>
                alert('Cadastro realizado com sucesso!');
                window.location.href = '../index.html'; // Redirecionar para a mesma página
            </script>";
        } else {
            echo "<script>
                alert('Erro ao cadastrar: " . $conn->error . "');
                window.location.href = 'cadastro.html'; // Redirecionar para a mesma página
            </script>";
        }
    } else {
        echo "<script>
            alert('Por favor, preencha todos os campos.');
            window.location.href = 'cadastro.html'; // Redirecionar para a mesma página
        </script>";
    }
}

// Fechar a conexão
$conn->close();
?>
