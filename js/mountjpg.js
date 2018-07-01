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
        generateJpg: function() {

        }
    }
})