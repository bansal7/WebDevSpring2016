(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("UserController",UserController);

    function UserController($scope,UserService,$http) {

        $scope.data = {};
        UserService.findAllUsers(renderUsers);

        //$http.jsonp(' https://secure.splitwise.com/api/v3.0/get_current_user&&callback=JSON_CALLBACK')
         //   .success(callback);

        /*function callback(response)
        {
            console.log(response);
        }*/

        // renders all the forms of the logged in user
        function renderUsers(response) {
            //console.log(response);
            $scope.data = response;
        }

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser= selectUser;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addUser(fName,lName,username,email) {
            if (fName != null && lName != null && username != null && email != null){
                var newUser = {
                    "_id" : (new Date).getTime(),
                    "firstName": fName,
                    "lastName" : lName,
                    "username" : username,
                    "email" : email
                }

                UserService.createUser(newUser,renderAddUser)
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Username cannot be empty and Email format should be a@b.com")
            }
        }

        // function that actually adds a form after getting a response from the service
        function renderAddUser(response){
            //console.log(response)
            //$scope.data.push(response);
            $scope.fName= null;
            $scope.lName= null;
            $scope.username= null;
            $scope.email= null;
        }

        // function that updates a form of the user
        function updateUser(fName,lName,username,email) {
            if ((fName != null && lName != null && username != null && email != null) && $scope.selectedIndex != -1) {
                var user = $scope.data[$scope.selectedIndex];
                var newUser = {
                    "_id": user._id,
                    "firstName": fName,
                    "lastName": lName,
                    "username": username,
                    "email": email
                }

                UserService.updateUser(user._id, newUser, renderUpdateUser)

            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Username cannot be empty and Email format should be a@b.com")
            }
        }

        // function that actually updates a form afer getting response from the service
        function renderUpdateUser(response){
            //$scope.data[$scope.selectedIndex] = response;
            $scope.fName= null;
            $scope.lName= null;
            $scope.username= null;
            $scope.email= null;
            $scope.selectedIndex = -1;
        }

        // function that deletes a form
        function deleteUser(index){
            var user = $scope.data[index];

            UserService.deleteUserById(user._id,renderDeleteUser)
        }

        // function that actually deletes the form and gets the rest of the form from the service
        function renderDeleteUser(response){
            //$scope.data = response;
        }

        // function that selects the form to be updated
        function selectUser(index) {
            $scope.selectedIndex = index;
            var user = $scope.data[index];
            $scope.fName= user.firstName;
            $scope.lName= user.lastName;
            $scope.username= user.username;
            $scope.email= user.email;
        }
    }
})();