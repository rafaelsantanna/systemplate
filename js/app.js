var app = new Vue({
    el: '#app',
    data: {
        selectedFile: null,
        typeTemplate: 0,
        previewImage: '',
        heightTemplate: '',
        displayFieldsImage: false,
        selectPosicao: 0,
        nameTemplate: '',
        colorElementPosition: '',

        fieldPositionLogoMarca: false,
        fieldPositionTexto: false,
        fieldPositionFacebook: false,
        fieldPositionTelefone: false,

        objStyleSvgLogo: {
            top: '0',
            left: '0',
            width: '50',
            height: '50'
        },
        objStyleSvgTexto: {
            top: '0',
            left: '0',
            width: '50',
            height: '50'
        },
        objStyleSvgFacebook: {
            top: '0',
            left: '0',
            width: '50',
            height: '50'
        },
        objStyleSvgTelefone: {
            top: '0',
            left: '0',
            width: '50',
            height: '50'
        }

    },
    methods: {
        submitTemplate(){
            let vm = this
            let nameTemplate = vm.nameTemplate
            let filepath = vm.previewImage
            let typeTemplate = vm.typeTemplate
            let objLogo = vm.objStyleSvgLogo
            let objTexto = vm.objStyleSvgTexto
            let objFacebook = vm.objStyleSvgFacebook
            let objTelefone = vm.objStyleSvgTelefone
            let objPositions = {
                logo: objLogo,
                texto: objTexto,
                facebook: objFacebook,
                telefone: objTelefone
            }
            let positions = JSON.stringify(objPositions)

            const data = new URLSearchParams();
            data.append('nameTemplate', nameTemplate);
            data.append('file_path', filepath);
            data.append('type_template', typeTemplate);
            data.append('positions', positions);

            axios.post('saveTemplate.php', data)
            .then(function (response) {
                console.log(response)
            })
        },
        onFileChanged(event) {
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
        onPositionChanged(event) {
            let vm = this

            //reset fields on change
            vm.fieldPositionLogoMarca = false
            vm.fieldPositionTexto = false
            vm.fieldPositionFacebook = false
            vm.fieldPositionTelefone = false

            //1 - Logo, 2 - Promoção, 3 - Facebook, 4 - Telefone
            if (vm.selectPosicao == 1) {
                vm.positionLogoMarca = ''
                vm.fieldPositionLogoMarca = true
                vm.colorElementPosition = '#047FFF'
            } else if (vm.selectPosicao == 2) {
                vm.positionTexto = ''
                vm.fieldPositionTexto = true
                vm.colorElementPosition = '#03E832'
            } else if (vm.selectPosicao == 3) {
                vm.positionFacebook = ''
                vm.fieldPositionFacebook = true
                vm.colorElementPosition = '#FFE309'
            } else if (vm.selectPosicao == 4) {
                vm.positionTelefone = ''
                vm.fieldPositionTelefone = true
                vm.colorElementPosition = '#E84E02'
            }
        }
    }
})