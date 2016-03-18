(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return api;

        // function that creates a new form for a particular user
        function createFormForUser(userId, form) {
            form._id = (new Date).getTime();
            form.userId = userId;

            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        // function that finds all the users' forms
        function findAllFormsForUser(userId) {
            console.log("sgdsg");
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        // function that deletes a form by its id
        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        // function that updates a form by its id
        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
})();