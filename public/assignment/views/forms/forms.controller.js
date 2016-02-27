(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,FormService, UserService) {

        FormService.findAllFormsForUser(UserService.getCurrentUser()._id, renderForms);

        // renders all the forms of the logged in user
        function renderForms(response) {
            $scope.data = response;
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addForm(name) {
            if (name != null){
                var newForm = {
                    "title": name
                }

                FormService.createFormForUser(UserService.getCurrentUser()._id, newForm, renderAddForm)
            }
        }

        // function that actually adds a form after getting a response from the service
        function renderAddForm(response){
            $scope.data.push(response);
            $scope.name= null;
        }

        // function that updates a form of the user
        function updateForm(name) {
            if (name != null && $scope.selectedIndex != -1) {
                var form = $scope.data[$scope.selectedIndex];
                var newForm = {
                    "_id": form._id,
                    "title": name,
                    "userId": form.userId
                }

                FormService.updateFormById(form._id, newForm, renderUpdateForm)

            }
        }

        // function that actually updates a form afer getting response from the service
        function renderUpdateForm(response){
            $scope.data[$scope.selectedIndex] = response;
            $scope.name= null;
            $scope.selectedIndex = -1;
        }

        // function that deletes a form
        function deleteForm(index){
            var form = $scope.data[index];

            FormService.deleteFormById(form._id,renderDeleteForm)
        }

        // function that actually deletes the form and gets the rest of the form from the service
        function renderDeleteForm(response){
            //$scope.data = response;

            FormService.findAllFormsForUser(UserService.getCurrentUser()._id,renderForms);
        }

        // function that selects the form to be updated
        function selectForm(index) {
            $scope.selectedIndex = index;
            var form = $scope.data[index];
            $scope.name= form.title;

        }
    }
})();