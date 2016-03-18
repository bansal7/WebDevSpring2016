(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,FormService, UserService) {

        $scope.forms = [];

        // renders all the forms of the logged in user
        function retrieveForms () {
            var userId = UserService.getCurrentUser()._id;
            //console.log(userId);
            FormService
                .findAllFormsForUser(userId)
                .then(function(response) {
                    if (response.data) {
                        $scope.forms = response.data;
                    }
                });
        }
        retrieveForms();

        $scope.form = {};
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addForm(form) {
            FormService
                .createFormForUser(UserService.getCurrentUser()._id, form)
                .then(function(response){
                    if (response.data) {
                        $scope.form = {};
                        retrieveForms();
                    }
                });
        }

        // function that updates a form of the user
        function updateForm(name) {
            if (name != null && $scope.selectedIndex != -1) {
                var form = $scope.data[$scope.selectedIndex];
                var newForm = {
                    "_id": form._id,
                    "title": name,
                    "userId": form.userId
                };

                FormService
                    .updateFormById(form._id, newForm)
                    .then(function(response){
                        if (response.data) {
                            $scope.data[$scope.selectedIndex] = response;
                            $scope.form= {};
                            $scope.selectedIndex = -1;
                        }
                    })
            }
        }

        // function that deletes a form
        function deleteForm(index) {
            var form = $scope.data[index];

            FormService
                .deleteFormById(form._id)
                .then(function (response) {
                    if (response.data) {
                        retrieveForms();
                        $scope.form = {};
                    }
                });
        }

        // function that selects the form to be updated
        function selectForm(index) {
            $scope.selectedIndex = index;
            var form = $scope.data[index];
            $scope.form= form.title;

        }
    }
})();