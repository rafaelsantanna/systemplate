var app = new Vue({
    el: '#app',
    data: {
        selectedFile: null,
        typeTemplate: 0,
        previewImage: '',
        heightTemplate: '',
        displayFieldsImage: false,
        
        nameTemplate: '',
        selectFields: 0,
        optionFields: [{
            name_field: 'Selecione um campo'
        }],
        
        arrayObjField: [],
        
        nameField: '',
        inputX: 0,
        inputY: 0,
        inputWidth: 0,
        inputHeight: 0,
        inputRotate: 0,
        inputFontSize: 0,
        inputFontFamily: '',
        inputColor: '',
        inputColorBlock: ''

    },
    methods: {
        submitTemplate: function(){
            let vm = this
            let nameTemplate = vm.nameTemplate
            let filepath = vm.previewImage
            let typeTemplate = vm.typeTemplate
            let arrayObjField = vm.arrayObjField

            const data = new URLSearchParams();
            data.append('nameTemplate', nameTemplate);
            data.append('file_path', filepath);
            data.append('type_template', typeTemplate);
            data.append('obj_fields', arrayObjField)

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
            let vm = this
            let valueArray = vm.selectFields - 1
            
            if(vm.arrayObjField[valueArray -1] !== 'undefined'){
                vm.inputX = vm.arrayObjField[valueArray].pos_x
                vm.inputY = vm.arrayObjField[valueArray].pos_y
                vm.inputWidth = vm.arrayObjField[valueArray].width
                vm.inputHeight = vm.arrayObjField[valueArray].height
                vm.nameField = vm.arrayObjField[valueArray].name_field
                vm.inputRotate = vm.arrayObjField[valueArray].rotate
                vm.inputFontSize = vm.arrayObjField[valueArray].font_size
                vm.inputFontFamily = vm.arrayObjField[valueArray].font_family
                vm.inputColor = vm.arrayObjField[valueArray].color
                vm.inputColorBlock = vm.arrayObjField[valueArray].color_block
            }
        },
        addField: function() {
            let vm = this
            vm.arrayObjField.push({name_field:vm.nameField})
            vm.optionFields.push({name_field:vm.nameField})
            vm.nameField = ''
        },
        saveFields: function() {
            let vm = this
            
            vm.arrayObjField[vm.selectFields - 1] = {
                name_field: vm.nameField,
                pos_x: vm.inputX,
                pos_y: vm.inputY,
                width: vm.inputWidth,
                height: vm.inputHeight,
                rotate: vm.inputRotate,
                font_size: vm.inputFontSize,
                font_family: vm.inputFontFamily,
                color: vm.inputColor,
                color_block: vm.inputColorBlock 
            }

            vm.selectFields = 0
            vm.nameField = ''
            vm.inputX = 0
            vm.inputY = 0
            vm.inputWidth = 0
            vm.inputHeight = 0
            vm.inputRotate = 0
            vm.inputFontSize = 0
            vm.inputFontFamily = ''
            vm.inputColor = ''
            vm.inputColorBlock = ''
        },
    }

})