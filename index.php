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
        .previewImage {
            position: relative;
        }

        .previewImage svg {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>

<body>
    <div id="app" class="container mt-3">
        <div class="row">
            <div class="col-md-9">
                <h1>Upload banner</h1>

                <div class="col-6">
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
                </div>

                <div class="previewImage" class="mb-3" v-if="previewImage != ''">
                    <img width="800" :style="{height: heightTemplate + 'px'}" :src="previewImage" alt="preview-image">
                    <!-- <svg :style="objLogo">
                        <rect width="100%" height="100%" style="fill:#047FFF" />
                    </svg> -->
                </div>
            </div>

            <div v-show="displayFieldsImage" class="mb-2 col-md-3 pt-5" style="position:fixed;right:50px">
                <h3>Configuração Template</h3>
                <div class="input-group mb-5">
                    <input type="text" class="form-control" v-model="nameTemplate" placeholder="Nome do template">
                </div>
                <div class="input-group mb-2">
                    <input type="text" class="form-control" v-model="nameField" placeholder="Nome do campo">
                    <div class="input-group-append">
                        <button @click="addField" class="btn btn-success" type="button">Adicionar campo</button>
                    </div>
                </div>
                <select class="custom-select mb-3" v-model="selectFields" @change="onSelectChanged">
                    <option v-for="(option, index) in optionFields" v-bind:value="index">
                        {{option.name}}
                    </option>
                </select>

                <div class="input-group">
                    <label for="">X:</label>
                    <input type="text" class="form-control" v-model="inputLeft">
                    <label for="">Y:</label>
                    <input type="text" class="form-control" v-model="inputTop">
                </div>

                <div class="input-group">
                    <label for="">Largura:</label>
                    <input type="text" class="form-control" v-model="inputWidth">
                    <label for="">Altura:</label>
                    <input type="text" class="form-control" v-model="inputHeight">
                </div>

                <div class="input-group">
                    <label for="">Rotacionar:</label>
                    <input type="text" class="form-control" v-model="inputRotate">
                </div>
                <div class="input-group">
                    <label for="">Tamanho Fonte:</label>
                    <input type="text" class="form-control" v-model="inputFontSize">
                    <label for="">Fonte:</label>
                    <input type="text" class="form-control" v-model="inputFontFamily">
                </div>

                <div class="input-group">
                    <label for="">Cor:</label>
                    <input type="text" class="form-control" v-model="inputColor">
                    <label for="">Cor Bloco:</label>
                    <input type="text" class="form-control" v-model="inputColorBlockSvg">
                </div>


                <div class="input-group mt-2 mt-3">
                    <button @click="saveFields" class="btn btn-success" type="button">Salvar Campo</button>    
                </div>

                <p>Mostrar campos que foram salvos no array como badges</p>

                <div class="input-group mt-3">
                    <button @click="submitTemplate" class="btn btn-primary" type="button">Salvar Template</button>
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