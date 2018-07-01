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
    </style>
</head>
<body>

<div id="mountjpg" class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Montar template</h1>

            <div class="row">
                <div class="md-col-6">
                    <div class="input-group mb-3">
                        <select class="custom-select" v-model="selectedTemplate" @change="getSpecificTemplate">
                            <option v-for="option in optionsTemplate" v-bind:value="option.id">{{option.name_template}}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-12 position-relative">
                    <img :src="renderTemplate" alt="" :show="renderTemplate != ''">
                    <div v-for="fields in objFields">
                        <div v-for="(item, index) in fields" :id="'field' + index" 
                            :style="{wordWrap: 'break-word',position: 'absolute',top:item.pos_y + 'px',
                            left:item.pos_x + 'px',width:item.width + 'px', height:item.height + 'px',
                            transform:'rotate(' + item.rotate + 'deg)', fontSize:item.font_size + 'px',
                            fontFamily:item.font_family, color:'#' + item.color}">
                        </div>
                    </div>
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
                                <input :id="'input' + index" type="text" class="form-control" @keyup="setValueField(index)">
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
    <script>

        // <input id="file" type="file">
        // <div id="example"></div>

        // render the image in our view
        function renderImage(file) {

            // generate a new FileReader object
            var reader = new FileReader();

            // inject an image with the src url
            reader.onload = function (event) {
                the_url = event.target.result
                $('#example').html("<img src='" + the_url + "' />")
            }

            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(file);
        }

        // handle input changes
        $("#file").change(function () {
            console.log(this.files)

            // grab the first image in the FileList object and pass it to the function
            renderImage(this.files[0])
        });

        // snapshot of element and show to download
        function snapshot() {
            html2canvas(document.getElementById('example')).then(function(canvas) {
             document.body.appendChild(canvas);
            });
        }
    </script>
</body>
</html>