<?php
  include("conexao.php");

  if(isset($_FILES['imagem'])){
    $nome = $_POST['nome'];
    // $tipo = $_POST['tipo'];
    // $posNome = $_POST['posNome'];
    // $posLogo = $_POST['posLogo'];
    // $posPromocao = $_POST['posPromocao'];
    // $posFacebook = $_POST['posFacebook'];
    // $posTelefone = $_POST['posTelefone'];

    $extensao = strtolower(substr($_FILES['imagem']['name'], -4)); //pega a extensao do imagem
    $path = md5(time()) . $extensao; //define o nome do imagem
    $tamanho = $_FILES['imagem']['size'];
    $diretorio = "upload/"; //define o diretorio para onde enviaremos o imagem
    move_uploaded_file($_FILES['imagem']['tmp_name'], $diretorio.$path); //efetua o upload
    $sql_code = "INSERT INTO banner (nome, caminho, tamanho, tipo, posicoes) VALUES('$nome','$path','$tamanho', '1', '10,20,30' )";
    if($mysqli->query($sql_code)){
      header('Location:index.php?caminho='.$path);
    }
    else{
        echo 'não foi';
    }
  }
?>