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
        objFields: []
    },
    mounted: function () {
        this.getTemplates()
    },
    methods: {
        getTemplates: function() {
            let vm = this
            axios.get('template_models.php?type_of_query=1')
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
            axios.get('template_models.php?type_of_query=2&id=' + idTemplate)
            .then(function (response) {
                vm.renderTemplate = response.data[0].file_path
                vm.objFields = []
                let obj = JSON.parse(response.data[0].obj_fields)
                vm.objFields.push(obj)
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
                $('#field' + id).html("<img width='100%' src='" + the_url + "' />")
            }

            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(file);
        },
        listenImageField: function(event) {
            //valor do field-id
            let fieldId = event.target.attributes[2].value
            this.renderImage(event.target.files[0], fieldId)
        },
        
        // snapshot of element and show to download
        // snapshot: function() {
        //     html2canvas(document.getElementById('example')).then(function(canvas) {
        //         document.body.appendChild(canvas);
        //     });
        // },
        generateJpg: function() {

        }
    }
})