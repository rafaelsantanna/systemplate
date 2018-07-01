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
            <div class="input-group mb-3">
            <select class="custom-select" v-model="selectedTemplate" @change="getSpecificTemplate">
                <option v-for="option in optionsTemplate" v-bind:value="option.id">{{option.name_template}}</option>
            </select>
        </div>
            <!-- <input id="file" type="file" >
            <div id="example"></div> -->
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

        function snapshot() {
            html2canvas(document.getElementById('example')).then(function(canvas) {
             document.body.appendChild(canvas);
            });
        }
    </script>
</body>
</html>