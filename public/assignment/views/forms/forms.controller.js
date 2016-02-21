(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,FormService) {

        FormService.findAllFormsForUser($rootScope._id, renderForms);

        function renderForms(response) {
            $scope.data = response;
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = null;

        function addForm(name) {
            if (name != null){
                var newForm = {
                    "title": name
                }

                FormService.createFormForUser($rootScope._id, newForm, renderAddForm)
            }
        }

        function renderAddForm(response){
            $scope.data.push(response);
            $scope.name= null;
        }

        function updateForm(name) {
            if (name != null) {
                var form = $scope.data[selectedIndex];
                var newForm = {
                    "_id": form._id,
                    "title": name,
                    "userId": form.userId
                }

                FormService.updateFormById(form._id, newForm, renderUpdateForm)

            }
        }

        function renderUpdateForm(response){
            $scope.data[selectedIndex] = response;
            $scope.name= null;
            selectedIndex = null;
        }

        function deleteForm(index){
            var form = $scope.data[index];

            FormService.deleteFormById(form._id,renderDeleteForm)
        }

        function renderDeleteForm(response){
            $scope.data = response;
        }

        function selectForm(index) {
            selectedIndex = index;
            var form = $scope.data[index];
            $scope.name= form.title;

        }


        }
})();