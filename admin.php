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

        .previewImage div  {
            position: absolute;
        }

        #alert-message {
            position: absolute;
            top: 20px;
            right: 20px;
        }
    </style>
</head>

<body>
    <div id="app" class="container-fluid mt-3 mb-3 pl-4 pr-4">
        <div class="row">
            <div class="col-md-8">
            <div class="row">
                <div class="col-md-5">
                    <h1>Upload banner</h1>
                </div>
                <div v-if="previewImage != ''" class="col-md-2 d-flex align-items-center">
                    <a class="mr-2" href="/systemplate/admin.php">
                        <img src="./icons/home-solid.svg" alt="icon copy" width="30" height="30">
                    </a>
                </div>
            </div>

                <div class="row">
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
                                <input id="inputFile" @change="onFileChanged" type="file" required name="file" class="custom-file-input">
                                <label class="custom-file-label">Escolher arquivo</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="listTemplates.length > 0 && previewImage == ''" class="row">
                    <div class="col-6">
                        <ul class="list-group">
                            <li v-for="item in listTemplates" class="list-group-item d-flex justify-content-between align-items-center">
                                {{item.name_template}}
                                <div>
                                    <a class="mr-2" href="" v-on:click.stop.prevent="duplicateTemplate(item.id)">
                                        <img src="./icons/copy-solid.svg" alt="icon copy" width="20" height="20">
                                    </a>
                                    <a class="mr-2" href="" v-on:click.stop.prevent="updateTemplate(item.id)">
                                        <img src="./icons/edit-solid.svg" alt="icon edit" width="20" height="20">
                                    </a>
                                    <a href="" v-on:click.stop.prevent="showModalDelete(item.id)">
                                        <img src="./icons/trash-solid.svg" alt="icon trash" width="20" height="20">
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="row mb-2" v-if="previewImage != ''">
                    <div class="col-6">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="nameTemplate" placeholder="Nome do template">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <button @click="submitTemplate" :disabled="nameTemplate == ''" class="btn btn-primary" type="button">Salvar Template</button>
                        </div>
                    </div>
                </div>

                <div class="previewImage" class="mb-3" v-if="previewImage != ''">
                    <img :style="{width: widthTemplate + 'px',height: heightTemplate + 'px'}" :src="previewImage" alt="preview-image">
                    <div v-for="(style, index) in arrayObjField" :id="'field' + index"
                        :style="{wordWrap: 'break-word', left:style.pos_x + 'px', top:style.pos_y + 'px',
                            width:style.width + 'px', height:style.height + 'px', transform:'rotate(' + style.rotate + 'deg)',
                            backgroundColor: '#' + style.color_block,fontSize:style.font_size + 'px', fontFamily:style.font_family,
                            color:'#' + style.color, textAlign: style.text_align}">
                    </div>
                </div>
            </div>

            <div v-show="displayFieldsImage" class="mb-2 col-md-4" style="position:fixed;right:50px">
                <h3>Configuração Template</h3>

                <div class="input-group mb-2">
                    <input type="text" class="form-control" v-model="nameField" placeholder="Nome do campo">
                    <div class="input-group-append">
                        <button @click="addField" :disabled="nameField == ''" class="btn btn-success" type="button">Adicionar campo</button>
                    </div>
                </div>
                <select class="custom-select mb-2" v-model="selectFields" @change="onSelectChanged">
                    <option v-for="(option, index) in optionFields" v-bind:value="index">
                        {{option.name_field}}
                    </option>
                </select>

                <div class="row">
                    <div class="col-12">
                        <div class="input-group mb-2 align-items-center">
                            <label for="isImage" style="margin-bottom:0">É imagem? &nbsp;</label>
                            <input id="isImage" type="checkbox" v-model="isImage">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">X</span>
                            </div>
                            <input type="number" class="form-control" v-model="inputX" @keyup="reactiveField">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Y</span>
                            </div>
                            <input type="number" class="form-control" v-model="inputY" @keyup="reactiveField">
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Largura</span>
                            </div>
                            <input type="number" class="form-control" v-model="inputWidth" @keyup="reactiveField">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Altura</span>
                            </div>
                            <input type="number" class="form-control" v-model="inputHeight" @keyup="reactiveField">
                        </div>
                    </div>

                    <div class="col-6" v-show="isImage == false">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Tamanho Fonte</span>
                            </div>
                            <input type="number" class="form-control" v-model="inputFontSize" @keyup="reactiveField">
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Rotacionar</span>
                            </div>
                            <input type="number" class="form-control" v-model="inputRotate" @keyup="reactiveField">
                        </div>
                    </div>

                    <div class="col-12" v-show="isImage == false">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">CSS da font</span>
                            </div>
                            <input type="text" class="form-control" v-model="inputFontFamily">
                        </div>
                    </div>

                    <div class="col-12" v-show="isImage == false">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">URL fonte</span>
                            </div>
                            <input type="text" class="form-control" v-model="inputFontUrl">
                        </div>
                    </div>

                    <div class="col-5" v-show="isImage == false">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Cor</span>
                            </div>
                            <input type="text" class="form-control" v-model="inputColor" @keyup="reactiveField">
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Cor Bloco</span>
                            </div>
                            <input type="text" class="form-control" v-model="inputColorBlock" @keyup="reactiveField">
                        </div>
                    </div>

                    <div class="col-12" v-show="isImage == false">
                        <div class="input-group align-items-center mb-1">
                            <label for="hasBlockText" style="margin-bottom:0">Bloquear texto? &nbsp;</label>
                            <input id="hasBlockText" type="checkbox" v-model="hasBlockText">
                            <div class="ml-auto">
                                <a href="" v-on:click.stop.prevent="setAlignText(1)">
                                    <img src="./icons/align-left-solid.svg" alt="icon align-left" width="20" height="20">
                                </a>
                                <a href="" v-on:click.stop.prevent="setAlignText(2)">
                                    <img src="./icons/align-center-solid.svg" alt="icon align-center" width="20" height="20">
                                </a>
                                <a href="" v-on:click.stop.prevent="setAlignText(3)">
                                    <img src="./icons/align-right-solid.svg" alt="icon align-right" width="20" height="20">
                                </a>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Preview Texto</span>
                            </div>
                            <input v-model="inputPreview" id="preview-text" type="text" class="form-control" @keyup="setTextField">
                        </div>
                    </div>
                </div>

                <div class="input-group">
                    <button @click="saveFields" :disabled="selectFields == 0" class="btn btn-success" type="button">Salvar Campo</button>
                </div>
            </div>
        </div>
        <div id="modal-delete" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Deletar Template</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Tem certeza?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="deleteTemplate" class="btn btn-danger">Deletar</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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