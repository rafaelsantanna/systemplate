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

    },
    mounted: function () {
        this.getTemplates()
    },
    methods: {
        getTemplates: function() {
            let vm = this
            axios.get('template_models.php')
            .then(function (response) {
                let length = Object.keys(response.data).length
                for(let i=0; i<length;i++){
                    vm.optionsTemplate.push(response.data[i])
                }
            })
        }
    }
})