var app = new Vue({
    el: '#app',
    data: {
        selectedFile: null,
        typeTemplate: 0,
        previewImage: '',
        heightTemplate: '',
        widthTemplate: '',
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
        inputFontUrl: '',
        inputColor: '',
        inputColorBlock: '',
        inputPreview: '',
        textAlign: '',
        hasBlockText: false,
        isImage: false,

        listTemplates: [],

        paramDelete: 0,
        paramUpdate: 0

    },
    mounted: function(){
        this.getTemplates()
    },
    methods: {
        submitTemplate: function(){
            let vm = this
            let nameTemplate = vm.nameTemplate
            let filepath = vm.previewImage
            let typeTemplate = vm.typeTemplate
            let arrayObjField = JSON.stringify(vm.arrayObjField)

            const data = new URLSearchParams();
            data.append('nameTemplate', nameTemplate);
            data.append('file_path', filepath);
            data.append('obj_fields', arrayObjField)
            data.append('type_template', typeTemplate);
            if(vm.paramUpdate == 0) {
                data.append('type_of_query', 4) //Insert
            } else {
                data.append('id', vm.paramUpdate)
                data.append('type_of_query', 5) //Update
            }

            axios.post('/systemplate/controller/TemplateController.php', data)
            .then(function (response) {
                vm.nameTemplate = ''
                vm.previewImage = ''
                vm.typeTemplate = 0
                vm.arrayObjField = []
                vm.displayFieldsImage = false
                vm.listTemplates = []
                vm.paramUpdate = 0
                vm.getTemplates()
                document.getElementById('inputFile').value = ''
                vm.showAlert('Template criado com sucesso!', 'alert-success')
            })
        },
        onFileChanged: function(event) {
            let vm = this
            this.selectedFile = event.target.files[0]
            const data = new FormData()
            data.append('file', this.selectedFile, this.selectedFile.name)
            data.append('type_template', this.typeTemplate)

            axios.post('/systemplate/controller/PreviewController.php', data)
            .then(function (response) {
                if (vm.typeTemplate == 1) {
                    vm.widthTemplate = '828'
                    vm.heightTemplate = '475'
                } else {
                    vm.widthTemplate = '800'
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
                vm.nameField = vm.arrayObjField[valueArray].name_field
                vm.isImage = vm.arrayObjField[valueArray].is_image
                vm.inputX = vm.arrayObjField[valueArray].pos_x
                vm.inputY = vm.arrayObjField[valueArray].pos_y
                vm.inputWidth = vm.arrayObjField[valueArray].width
                vm.inputHeight = vm.arrayObjField[valueArray].height
                vm.inputRotate = vm.arrayObjField[valueArray].rotate
                vm.inputFontSize = vm.arrayObjField[valueArray].font_size
                vm.inputFontFamily = vm.arrayObjField[valueArray].font_family
                vm.inputFontUrl = vm.arrayObjField[valueArray].font_url
                vm.inputColor = vm.arrayObjField[valueArray].color
                vm.inputColorBlock = vm.arrayObjField[valueArray].color_block
                vm.inputPreview = vm.arrayObjField[valueArray].text
                vm.textAlign = vm.arrayObjField[valueArray].text_align
                vm.hasBlockText = vm.arrayObjField[valueArray].has_block_text
            }
        },
        reactiveField: function() {
            let vm = this
            let is_image = vm.isImage ? 1 : 0
            let has_block_text = vm.hasBlockText ? 1 : 0
            //Vue.set torna reativo a alteração no array
            Vue.set(vm.arrayObjField,vm.selectFields - 1, {
                pos_x: vm.inputX,
                pos_y: vm.inputY,
                width: vm.inputWidth,
                height: vm.inputHeight,
                rotate: vm.inputRotate,
                font_size: vm.inputFontSize,
                font_family: vm.inputFontFamily,
                font_url: vm.inputFontUrl,
                color: vm.inputColor,
                color_block: vm.inputColorBlock,
                text: vm.inputPreview,
                has_block_text: has_block_text,
                is_image: is_image,
                text_align: vm.textAlign
            })
        },
        addField: function() {
            let vm = this
            var color_block = this.getRandomColor()
            vm.arrayObjField.push(
                {
                    name_field:vm.nameField,
                    pos_x: 0,
                    pos_y: 0,
                    width: 50,
                    height: 50,
                    rotate: 0,
                    font_size: 14,
                    font_family: 'arial',
                    font_url: '',
                    color: '000000',
                    color_block: color_block,
                    is_image: 0,
                    text_align: 'left',
                    has_block_text: 0
                }
            )
            vm.optionFields.push({name_field:vm.nameField})
            vm.nameField = ''
        },
        saveFields: function() {
            let vm = this
            let is_image = vm.isImage ? 1 : 0
            let has_block_text = vm.hasBlockText ? 1 : 0
            let text = vm.hasBlockText ? vm.inputPreview : ''
            
            vm.arrayObjField[vm.selectFields - 1] = {
                name_field: vm.nameField,
                pos_x: vm.inputX,
                pos_y: vm.inputY,
                width: vm.inputWidth,
                height: vm.inputHeight,
                rotate: vm.inputRotate,
                font_size: vm.inputFontSize,
                font_family: vm.inputFontFamily,
                font_url: vm.inputFontUrl,
                color: vm.inputColor,
                color_block: vm.inputColorBlock,
                text: text,
                text_align:vm.textAlign,
                has_block_text: has_block_text,
                is_image: is_image
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
            vm.inputFontUrl = ''
            vm.inputPreview = ''
            vm.textAlign = ''
            vm.hasBlockText = false
            vm.isImage = false
            document.getElementById('preview-text').value = ''
        },
        getRandomColor: function(){
            var letters = '0123456789ABCDEF'.split('')
            var color = ''
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.round(Math.random() * 15)]
            }
            return color
        },
        setTextField: function(event) {
            let vm = this
            let index = vm.selectFields - 1
            document.getElementById('field' + index).innerHTML = event.target.value
        },
        getTemplates: function() {
            let vm = this
            axios.get('/systemplate/controller/TemplateController.php?type_of_query=1')
            .then(function (response) {
                if (response.data.error) {
                    vm.listTemplates = []
                    return
                }
                let length = Object.keys(response.data).length
                for(let i=0; i<length;i++){
                    vm.listTemplates.push(response.data[i])
                }
            })
        },
        showModalDelete: function(id) {
            $('#modal-delete').modal('show')
            this.paramDelete = id
        },
        deleteTemplate: function() {
            let vm = this
            let id = this.paramDelete
            const data = new URLSearchParams();
            data.append('id', id);
            data.append('type_of_query', 3)
            axios.post('/systemplate/controller/TemplateController.php', data)
            .then(function(response) {
                $('#modal-delete').modal('hide')
                vm.showAlert('Template deletado com sucesso!', 'alert-success')
                vm.paramDelete = 0
                vm.listTemplates = []
                vm.getTemplates()
            })
        },
        updateTemplate: function(id) {
            let vm = this
            axios.get('/systemplate/controller/TemplateController.php?type_of_query=2&id=' + id)
            .then(function (response) {
                let data = response.data[0]
                if(data.type_template == 1){
                    vm.widthTemplate = '828'
                    vm.heightTemplate = '475'
                } else {
                    vm.widthTemplate = '800'
                    vm.heightTemplate = '800'
                }
                vm.typeTemplate = data.type_template
                vm.nameTemplate = data.name_template
                vm.previewImage = data.file_path
                vm.displayFieldsImage = true
                vm.arrayObjField = JSON.parse(data.obj_fields)
                JSON.parse(data.obj_fields).map(function(item) {
                    vm.optionFields.push({name_field:item.name_field})
                })
                vm.paramUpdate = id
            })
        },
        duplicateTemplate: function(id) {
            let vm = this
            axios.get('/systemplate/controller/TemplateController.php?type_of_query=6&id=' + id)
            .then(function (response) {
                vm.listTemplates = []
                vm.getTemplates()
                vm.showAlert('Template duplicado com sucesso!', 'alert-success')
            })
        },
        setAlignText: function(param) {
            let vm = this
            if(param == 1) {
                vm.textAlign = 'left'
                vm.reactiveField()
            }
            if(param == 2) {
                vm.textAlign = 'center'
                vm.reactiveField()
            }
            if(param == 3) {
                vm.textAlign = 'right'
                vm.reactiveField()
            }
        },
        showAlert: function(message, type) {
            $('body').append('<div id="alert-message" class="alert '+ type +'">'+message+'</div>')
            $('#alert-message').css('display', 'none').fadeIn(1000)
            setTimeout(function(){ $('#alert-message').fadeOut(1000,function() {$(this).remove()}) }, 2000)
        }
    }

})