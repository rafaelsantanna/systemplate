<?php
  include("conexao.php");
  $extensao = strtolower(substr($_FILES['arquivo']['name'], -4));
  $nomeArquivo = md5(time()) . $extensao;
  $tamanho = $_FILES['arquivo']['size']; //Para validar tamanho do arquivo
  $diretorio = "upload/";
  if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $diretorio.$nomeArquivo)) {
    $response = array(
      "success" => true,
      "arquivo" => $nomeArquivo
    );
    echo json_encode((object)$response);
  } else {
    $response = array("error" => true);
    echo json_encode((object)$response);
  }
?>