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
    <style>
        #preview {
            display: none;
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h1>Upload banner</h1>
                <div class="input-group mb-3">
                        <select id="selectType" class="custom-select" name="tipo">
                            <option selected>Selecione o tipo do banner</option>
                            <option value="1">Capa</option>
                            <option value="2">Post</option>
                        </select>
                    </div>
                <form id="formUpload" name="formUpload" action="" method="POST" enctype="multipart/form-data">
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input type="file" required name="file" class="custom-file-input">
                            <label class="custom-file-label">Escolher arquivo</label>
                        </div>
                    </div>
                </form>
                <div class="mb-3">
                    <img id="preview" src="" alt="preview">
                </div>
                <div class="d-none">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" name="nome" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1">
                    </div>
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
                    <div class="input-group">
                        <button id="save" class="btn btn-primary" type="button">Salvar</button>
                    </div>
                </div>
                <div class="input-group">
                    <button id="btnPreview" class="btn btn-primary" type="button">Preview</button>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery primeiro depois Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>

    <script>
    $(document).ready(function() {
    
        $('#btnPreview').click(function() {   
            var formdata = new FormData($("form[name='formUpload']")[0]);
            $.ajax({
                type: 'POST',
                url: 'preview.php',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(response) {
                    var response = JSON.parse(response);
                    var tipo = $('#selectType').val();
                    if(tipo == 1) {
                        $('#preview').css({
                            'width':'800px',
                            'height':'312px'
                        });
                    } else {
                        $('#preview').css({
                            'width':'800px',
                            'height':'800px'
                        });
                    }
                    $('#preview').css('display','block').prop('src', response.file);
                    console.log('Upload realizado com sucesso...');
                },
                error: function(e) {
                    console.log('Erro:' + e);
                }
            });

        return false;
        });
    });
    </script>
</body>

</html>