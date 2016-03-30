(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,FormService, UserService) {

        var vm = this;

        vm.forms = [];

        // renders all the forms of the logged in user
        function init () {
            var userId = null;
            UserService.getCurrentUser()
                .then(function(response){

                    userId = response.data._id;
                    //console.log(userId);
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(response) {
                            //console.log("In form controller" + response.data);
                            if (response.data) {
                                //console.log(response.data);
                                vm.forms = response.data;
                            }
                        });
                });
            //console.log(userId);

        }
        init();

        vm.form = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addForm(form) {
            UserService
                .getCurrentUser()
                .then(function(response){
                    //console.log(response.data);
                    var userId = response.data._id;

                    FormService
                        .createFormForUser(userId, form)
                        .then(function(response){
                            //console.log(response.data);
                            if (response.data != null) {
                                vm.form = null;
                                init();
                            }
                        });
                });

        }

        // function that updates a form of the user
        function updateForm(form) {
            var newForm = vm.forms[vm.selectedIndex];
            newForm.title=form.title;
            //console.log(newForm);
            FormService
                .updateFormById(newForm._id, newForm)
                .then(function(response) {
                    if (response.data) {
                        vm.form = {};
                        vm.forms = init();
                    }
                });
        }

        // function that deletes a form
        function deleteForm(index) {
            var form = vm.forms[index];

            FormService
                .deleteFormById(form._id)
                .then(function (response) {
                    if (response.data) {
                        init();
                        vm.form = {};
                    }
                });
        }

        // function that selects the form to be updated
        function selectForm(index) {
            vm.selectedIndex = index;
            var form = vm.forms[index];
            //console.log(form);
            vm.form =
            {
                title:form.title
            };
        }
    }
})();