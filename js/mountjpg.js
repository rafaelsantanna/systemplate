var mountjpg = new Vue({
    el: '#mountjpg',
    data: {
        selectedTemplate: 0,
        optionsTemplate: [
            {
                id: 0,
                name_template: 'Selecione um template'
            }
        ],

        renderTemplate: '',
        renderFields: [],
        objFields: [],
        urlFonts: []
    },
    mounted: function () {
        this.getTemplates()
    },
    methods: {
        getTemplates: function() {
            let vm = this
            axios.get('TemplateController.php?type_of_query=1')
            .then(function (response) {
                let length = Object.keys(response.data).length
                for(let i=0; i<length;i++){
                    vm.optionsTemplate.push(response.data[i])
                }
            })
        },
        getSpecificTemplate: function() {
            let vm = this
            let idTemplate = vm.selectedTemplate
            axios.get('TemplateController.php?type_of_query=2&id=' + idTemplate)
            .then(function (response) {
                vm.renderTemplate = response.data[0].file_path
                vm.objFields = []
                let obj = JSON.parse(response.data[0].obj_fields)
                vm.objFields.push(obj)
                let stringLinks = ''
                for(let i = 0; i < vm.objFields[0].length; i++){
                    stringLinks +='<link href="https://fonts.googleapis.com/css?family='+ vm.objFields[0][i].font_url +'" rel="stylesheet">'
                }
                document.getElementById('url_fonts').innerHTML = stringLinks
            })
        },
        setValueField: function(id) {
            let val = document.getElementById('input' + id).value
            document.getElementById('field' + id).innerHTML = val
        },
        renderImage: function(file, id) {
            // generate a new FileReader object
            var reader = new FileReader();

            // inject an image with the src url
            reader.onload = function (event) {
                the_url = event.target.result
                $('#field' + id).html("<img style='width:100%;height:inherit' src='" + the_url + "' />")
            }

            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(file);
        },
        listenImageField: function(event) {
            //value of field-id
            let fieldId = event.target.attributes[2].value
            this.renderImage(event.target.files[0], fieldId)
        },
        
        //snapshot html and generate image
        generateJpg: function() {
            html2canvas(document.getElementById('imagem_template')).then(function(canvas) {
                canvas.style.width = '800px'
                let url_image = canvas.toDataURL('image/jpg')
                let img = $("<a>")
                    .attr("href", url_image)
                    .attr("download", "banner.png")
                    .appendTo("body");
                img[0].click();
                img.remove();
            });
        }
    }
})