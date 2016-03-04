(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("UserController",UserController);

    function UserController($scope,UserService) {

        UserService.findAllUsers(renderUsers);

        // renders all the forms of the logged in user
        function renderUsers(response) {
            console.log(response);
            $scope.data = response;
        }

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser= selectUser;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addUser(name) {
            if (name != null){
                var newUser = {
                    "firstName": name
                }

                UserService.createUser(newUser,renderAddUser)
            }
        }

        // function that actually adds a form after getting a response from the service
        function renderAddUser(response){
            $scope.data.push(response);
            $scope.name= null;
        }

        // function that updates a form of the user
        function updateUser(name) {
            if (name != null && $scope.selectedIndex != -1) {
                var form = $scope.data[$scope.selectedIndex];
                var newForm = {
                    "_id": form._id,
                    "title": name,
                    "userId": form.userId
                }

                FormService.updateFormById(form._id, newForm, renderUpdateUser)

            }
        }

        // function that actually updates a form afer getting response from the service
        function renderUpdateUser(response){
            $scope.data[$scope.selectedIndex] = response;
            $scope.name= null;
            $scope.selectedIndex = -1;
        }

        // function that deletes a form
        function deleteUser(index){
            var form = $scope.data[index];

            UserService.deleteUserById(form._id,renderDeleteUser)
        }

        // function that actually deletes the form and gets the rest of the form from the service
        function renderDeleteUser(response){
            //$scope.data = response;
        }

        // function that selects the form to be updated
        function selectUser(index) {
            $scope.selectedIndex = index;
            var user = $scope.data[index];
            $scope.name= user.title;

        }
    }
})();