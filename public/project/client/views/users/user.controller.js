(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("UserController",UserController);

    function UserController($scope,UserService,$http) {

        var vm = this;

        vm.data = {};

        function init(){
            UserService
                .findAllUsers()
                .then(function(response){
                    //console.log(response);
                    vm.data = response.data;
                });
        }

        init();


        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser= selectUser;
        vm.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addUser(user) {
            if (user.firstName != null && user.lastName != null && user.username != null && user.email != null){
                var newUser = {
                    //"_id" : (new Date).getTime(),
                    "firstName": user.firstName,
                    "lastName" : user.lastName,
                    "username" : user.username,
                    "email" : user.email
                }

                UserService
                    .createUser(newUser)
                    .then(function(response){
                        //console.log(response.data);
                        user.firstName = null;
                        user.lastName = null;
                        user.username = null;
                        user.email = null;
                    });

                init();
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Username cannot be empty and Email format should be a@b.com")
            }
        }

        // function that updates a form of the user
        function updateUser(user) {
            if ((user.firstName != null && user.lastName != null && user.username != null && user.email != null) && vm.selectedIndex != -1) {
                var selectedUser = vm.data[vm.selectedIndex];
                var newUser = {
                    "_id": selectedUser._id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "username": user.username,
                    "email": user.email
                }
                console.log(newUser);
                UserService
                    .updateUser(selectedUser._id, newUser)
                    .then(function(response){
                        vm.data[vm.selectedIndex] = response.data;
                        vm.user = null;
                        vm.selectedIndex = -1;
                    });
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Username cannot be empty and Email format should be a@b.com")
            }
        }

        // function that deletes a form
        function deleteUser(index){
            var selectedUser = vm.data[index];
            UserService
                .deleteUserById(selectedUser._id)
                .then(function(response){
                    if(response){
                        init();
                    }
                });
        }

        // function that selects the form to be updated and places the data into input fields
        function selectUser(index) {
            //console.log(index);
            vm.selectedIndex = index;
            var selectedUser = vm.data[index];

            vm.user = {
                "firstName": selectedUser.firstName,
                "lastName": selectedUser.lastName,
                "username": selectedUser.username,
                "email": selectedUser.email
            };
        }
    }
})();