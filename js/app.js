var app = new Vue({
    el: '#app',
    data: {
      selectedFile: null,
      typeTemplate: 0,
      previewImage: '',
      heightTemplate: '',
      displayFieldsImage: false,
    },
    methods: {
        onFileChanged (event) {
            let vm = this
            this.selectedFile = event.target.files[0]
            const data = new FormData()
            data.append('file', this.selectedFile, this.selectedFile.name)
            data.append('type_template', this.typeTemplate)

            axios.post('preview.php', data)
            .then(function(response) {
                if(vm.typeTemplate == 1) {
                    vm.heightTemplate = '312'
                } else {
                    vm.heightTemplate = '800'
                }
                vm.displayFieldsImage = true;
                vm.previewImage = response.data.file
                
            })
        }
    }
  })