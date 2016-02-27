(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        // stores the data of all forms
        var forms = {};
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return api;

        // function that creates a new form for a particular user
        function createFormForUser(userId, form, callback) {
            var newForm = {
                "_id" : (new Date).getTime(),
                "title" : form.title,
                "userId" : userId
                };
            forms.push(newForm);
            callback(newForm)

        }

        // function that finds all the users' forms
        function findAllFormsForUser(userId, callback) {
            var form = [];
            for(var index in forms){
                if(forms[index].userId == userId){
                    form.push(forms[index]);
                }
            }
            callback(form);

        }

        // function that deletes a form by its id
        function deleteFormById(formId, callback) {
            for(var index in forms){
                if(forms[index]._id==formId){
                    forms.splice(index,1);
                    break;
                }
            }
            callback(forms);
        }

        // function that updates a form by its id
        function updateFormById(formId, newForm, callback) {
            for(var index in forms){
                if(forms[index]._id==formId){
                    forms[index] = newForm;
                    break;
                }
            }
            //findAllFormsForUser($rootScope._id,callback);
            callback(newForm);
        }

    }
})();