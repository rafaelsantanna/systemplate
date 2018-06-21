<!DOCTYPE html>
<html lang="pt-br">

<head>
    <!-- Meta tags Obrigatórias -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
        crossorigin="anonymous">

    <title>Upload</title>
</head>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h1>Upload banner</h1>
                <form action="upload.php" method="POST" enctype="multipart/form-data">
                    <div class="input-group mb-3">
                        <select class="custom-select">
                            <option selected>Selecione o tipo do banner</option>
                            <option value="1">Capa</option>
                            <option value="2">Post</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" name="nome" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input type="file" required name="imagem" class="custom-file-input">
                            <label class="custom-file-label">Escolher arquivo</label>
                        </div>
                    </div>
                        <div>
                            <img src="./upload/<?php echo $_GET['caminho'] ?>" width="400" alt="preview">
                        </div>
                    <div class="d-none">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="posNome" placeholder="Posição Nome" aria-label="posNome" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="posLogo" placeholder="Posição Logomarca" aria-label="posLogo" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="posPromocao" placeholder="Posição Promoção" aria-label="posPromocao" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="posFacebook" placeholder="Posição Facebook" aria-label="posFacebook" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="posTelefone" placeholder="Posição Telefone" aria-label="posTelefone" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="input-group">
                        <button class="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <!-- JavaScript (Opcional) -->
    <!-- jQuery primeiro, depois Popper.js, depois Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>
</body>

</html>