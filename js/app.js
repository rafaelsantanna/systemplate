var app = new Vue({
    el: '#app',
    data: {
        selectedFile: null,
        typeTemplate: 0,
        previewImage: '',
        heightTemplate: '',
        displayFieldsImage: false,
        
        nameTemplate: '',
        nameField: '',
        selectFields: 0,
        optionFields: [
            {
                name: 'Selecione um elemento',
                value: 0
            }
        ],

        arrayObjText: [],
        arrayObjImage: [],

        objText: {
            name: '',
            top: '0',
            left: '0',
            width: '50',
            height: '50',
            fontSize: '14',
            color: '#000',
            rotate: '0',
            fontFamily: '',
            colorSvg: ''
        },
        objImage: {
            name: '',
            top: '0',
            left: '0',
            width: '50',
            height: '50',
            rotate: '',
            colorSvg: ''
        },

    },
    methods: {
        submitTemplate: function(){
            let vm = this
            let nameTemplate = vm.nameTemplate
            let filepath = vm.previewImage
            let typeTemplate = vm.typeTemplate
            let objText = vm.objText
            let objImage = vm.objImage

            const data = new URLSearchParams();
            data.append('nameTemplate', nameTemplate);
            data.append('file_path', filepath);
            data.append('type_template', typeTemplate);
            data.append('obj_text', objText);
            data.append('obj_image', objImage);

            axios.post('saveTemplate.php', data)
            .then(function (response) {
                console.log(response)
                vm.nameTemplate = ''
                vm.previewImage = ''
                vm.typeTemplate = 0
                vm.displayFieldsImage = false
                alert('mensagem de sucesso!!!')
            })
        },
        onFileChanged: function(event) {
            let vm = this
            this.selectedFile = event.target.files[0]
            const data = new FormData()
            data.append('file', this.selectedFile, this.selectedFile.name)
            data.append('type_template', this.typeTemplate)

            axios.post('preview.php', data)
            .then(function (response) {
                if (vm.typeTemplate == 1) {
                    vm.heightTemplate = '312'
                } else {
                    vm.heightTemplate = '800'
                }
                vm.displayFieldsImage = true;
                vm.previewImage = response.data.file
            })
        },
        onSelectChanged: function() {
            
        },
        addTextField: function() {
            console.log('')
        },
        addImageField: function() {
            console.log('')
        }
    }

})