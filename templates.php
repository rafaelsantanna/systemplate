<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags Obrigatórias -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
        crossorigin="anonymous">

    <title>Montar JPG</title>

    <style>
        #imagem_template{
            width: -webkit-fit-content;
            width: -moz-fit-content;
            width: fit-content;
        }

        #alert-message {
            position: absolute;
            top: 20px;
            right: 20px;
        }

        #list_templates li {
            cursor: pointer;
        }

        #list_templates img {
            width: 50px;
            height: auto;
            transition: width 1s;
        }

        #list_templates img:hover {
            width:300px;
            height:auto;
            transition: width 1s;
        }
    </style>
</head>
<body>

<div id="mountjpg" class="container">
<div id="url_fonts"></div>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-4">
                    <h1>Montar template</h1>
                </div>
                <div v-if="hasTemplateSelected" class="col-md-1 d-flex align-items-center">
                    <a class="mr-2" href="/systemplate/templates.php">
                        <img src="./icons/home-solid.svg" alt="icon copy" width="30" height="30">
                    </a>
                </div>
            </div>

            <div class="row mb-3" v-if="!hasTemplateSelected">
                <div class="col-6">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="search" placeholder="Buscar template">
                    </div>
                </div>
            </div>

            <div class="row" id="list_templates" v-if="!hasTemplateSelected">
                <div class="col-6">
                    <ul class="list-group">
                        <li v-for="item in filterTemplates" class="list-group-item d-flex justify-content-between align-items-center" @click="getSpecificTemplate(item.id)">
                            {{item.name_template}}
                            <div>
                                <img :src="item.file_path" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row mb-3 no-gutters">
                <div class="col-md-9 position-relative">
                    <div id="imagem_template">
                        <img :src="renderTemplate" alt="" :show="renderTemplate != ''">
                        <div v-for="fields in objFields">
                            <div v-for="(item, index) in fields" :id="'field' + index" 
                            :style="{wordWrap: 'break-word',position: 'absolute',top:item.pos_y + 'px',
                                left:item.pos_x + 'px',width:item.width + 'px', height:item.height + 'px',
                                transform:'rotate(' + item.rotate + 'deg)', fontSize:item.font_size + 'px',
                                fontFamily:item.font_family, color:'#' + item.color, textAlign: item.text_align}">
                                {{item.text}}
                            </div>
                        </div>
                    </div>    
                </div>
                <div class="col-md-3" v-if="hasTemplateSelected">
                    <button class="btn btn-primary" @click="generateJpg">Gerar Imagem</button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="row" v-for="fields in objFields">
                        <div class="col-md-6" v-for="(input, index) in fields">
                            <div v-if="input.is_image == 0" class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">{{input.name_field}}</span>
                                </div>
                                <input :id="'input' + index" :disabled="input.has_block_text == 1" :value="input.text" type="text" class="form-control" @keyup="setValueField(index)">
                            </div>
                            <div v-else class="input-group mb-3">
                                <div class="custom-file">
                                    <input :id="'input' + index" type="file" class="custom-file-input" :field-id="index" @change="listenImageField">
                                    <label class="custom-file-label">{{input.name_field}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
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
    <script src="./js/html2canvas.min.js"></script>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="./js/mountjpg.js"></script>
    </script>
</body>
</html>