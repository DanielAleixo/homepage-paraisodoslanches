<?php
// Configuração do banco de dados
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "paraiso_dos_lanches";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Coletar dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$rua = $_POST['rua'];
$bairro = $_POST['bairro'];
$estado = $_POST['estado'];
$cidade = $_POST['cidade'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

// Inserir dados no banco de dados
$sql = "INSERT INTO clientes (nome, email, telefone, rua, bairro, estado, cidade, senha) 
        VALUES ('$nome', '$email', '$telefone', '$rua', '$bairro', '$estado', '$cidade', '$senha')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}

// Fechar conexão
$conn->close();
?>
