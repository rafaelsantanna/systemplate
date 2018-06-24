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
    <div id="app" class="container mt-3">
        <div class="row">
            <div class="col-md-6">
                <h1>Upload banner</h1>
                <div class="input-group mb-3">
                    <select class="custom-select" v-model="typeTemplate" name="type_template">
                        <option value="0">Selecione o tipo do banner</option>
                        <option value="1">Capa</option>
                        <option value="2">Post</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input @change="onFileChanged" type="file" required name="file" class="custom-file-input">
                        <label class="custom-file-label">Escolher arquivo</label>
                    </div>
                </div>
                <div v-show="displayFieldsImage" class="mb-2">
                    <div class="mb-3">
                        <img width="800" :style="{height: heightTemplate + 'px'}" :src="previewImage" alt="preview-image">
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" name="nome" placeholder="Nome" aria-label="Nome" aria-describedby="basiaddon1">
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
            </div>
        </div>
    </div>

    <!-- jQuery primeiro depois Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js"></script>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="./js/app.js"></script>
</body>

</html>