(function(){
    "use script";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$http) {

        var model = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        }

        return model;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        // funtion finds the user based on username and password
        function findUserByCredentials(username, password) {
            //console.log("inside login");
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        // function finds all the users
        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        // function creates a new user
        function createUser(user) {
            user._id = (new Date).getTime();
            return $http.post("/api/assignment/user", user);
        }

        // function deletes a user
        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        // function updates a user entry
        function updateUser(userId, user) {
            console.log("sending: " + "/api/assignment/user/" + userId, user);
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();