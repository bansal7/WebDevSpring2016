"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $routeParams,$scope) {
        var vm = this;
        vm.cField = null;
        vm.eField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.cloneField = cloneField;
        $scope.reorderForm = reorderForm
        vm.options =
            [
                'Single Line Text Field',
                'Multi Line Text Field',
                'Date Field',
                'Dropdown Field',
                'Checkboxes Field',
                'Radio Buttons Field'
            ];
        vm.selection = vm.options[0];
        vm.fieldOptions = null;
        var formId;
        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"},
                {key: "Date Field", value: "DATE"},
                {key: "Dropdown Field", value: "OPTIONS"},
                {key: "Checkboxes Field", value: "CHECKBOXES"},
                {key: "Radio Buttons Field", value: "RADIOS"}
            ];

        function init() {
            //console.log("inside fields controller  " + formId);
            FieldService
                .findFieldsByForm(formId)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        //vm.display = response.data;
                        vm.fields = response.data;
                    }
                });
            FormService
                .getFormById(formId)
                .then(function (response)
                {
                    console.log(response.data);
                    vm.form = response.data;
                });
        }
        init();

        function sendEdit(field) {
            vm.cField = null;
            FieldService
                .updateField(formId, field._id, field)
                .then(init);
        }

        function reorderForm(start,end){

            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }
            newFields.splice(end, 0 ,newFields.splice(start, 1)[0]);
            FormService
                .getFormById(formId)
                .then(
                    function (res){
                        //console.log(res.data);
                        var form = res.data;
                        form.fields = newFields;
                        FormService
                            .updateFormById(form._id,form);

                    }
                );
        }


        function cloneField(newField) {
            delete newField._id;
            //console.log(newField);
            FieldService
                .createField(formId, newField)
                .then(function(response){
                    if(response) {
                        //console.log("inside clone "+ response.data._id);
                        init();
                    }
                });

        }

        function deleteField(field) {
            vm.cField = null;
            FieldService
                .deleteField(formId, field._id)
                .then(init);
        }

        function translateFieldType(fieldType) {
            for (var k in optionMap) {
                console.log(optionMap[k].key + " " + optionMap[k].value);
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function addField(fieldType) {
            switch(fieldType){
                case "TEXT": var field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA": var field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE": var field = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS": var field = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
                    break;
                case "CHECKBOXES": var field = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
                    break;
                case "RADIOS": var field = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
                    break;
            }
            console.log(field);
            FieldService
                .createField(formId, field)
                .then(init);
        }


        function editField(field) {

            vm.eField = {
                _id:field._id,
                label : field.label,
                placeholder : field.placeholder,
                options : field.options,
                type: field.type
            }

            var isOption = !(vm.eField.type === 'TEXT' || vm.eField.type === 'TEXTAREA' || vm.eField.type === 'DATE'|| vm.eField.type === 'EMAIL');

            if (isOption) {
                var optionList = [];
                var ol = vm.eField.options;
                //console.log(ol + "   sjdvfsdjv")
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                //console.log(optionList);
                vm.optionText = optionList.join("\n");
                //console.log(vm.optionText);
            }
        }

        function commitEdit(field) {


            vm.eField = {
                _id:field._id,
                label : field.label,
                placeholder : field.placeholder,
                options : field.options,
                type: field.type
            }

            console.log(field._id);

            var isOption = !(vm.eField.type === 'TEXT' || vm.eField.type === 'TEXTAREA' || vm.eField.type === 'DATE'|| vm.eField.type === 'EMAIL');

            var optionArray = [];
            if (isOption) {

                var oa = vm.optionText;

                    var a = oa.split("\n");

                for (var i in a){
                    //console.log(a[i]);
                    var b = a[i].split(":");
                    optionArray.push({
                        label: b[0],
                        value: b[1]
                    });
                }

                vm.eField.options = optionArray;

            }
            else {
            }
            //console.log(vm.eField._id);
            FieldService
                .updateField(formId, field._id, vm.eField)
                .then(init);
            //vm.eField = null;
        }

    }
})();