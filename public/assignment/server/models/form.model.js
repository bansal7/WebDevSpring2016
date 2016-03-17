module.exports = function() {
    var forms = require("./form.mock.json");

    var api = {
        createUser: createForm,
        findUserById: findFormById,
        findAllUsers: findAllForms,
        updateUser: updateForm,
        deleteUser: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        findFieldsForForm: findFieldsForForm,
        deleteFormFieldById: deleteFormFieldById
    };

    return api;

    function createForm (newForm) {
        var now = new Date();
        newForm._id = "id" + now.getTime();
        forms.push (newForm);

        return forms;
    }

    function updateForm (id, form) {
        for (var index in forms) {
            if (forms[index]._id === id) {
                forms[index] = form;
            }
        }
    }

    function findAllForms () {
        return forms;
    }

    function findFormById (id) {
        for (var index in forms) {
            if (forms[index]._id === id) {
                return forms[index];
            }
        }
        return null;
    }

    function deleteForm (id) {
        for (var index in forms) {
            if (forms[index]._id === id) {
                forms.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    function findFormByTitle(title) {
        for (var index in forms) {
            var currentForm = forms[index];
            if (currentForm.title === title) {
                return currentForm;
            }
        }

        return null;
    }

    function findFormsForUser(userId) {
        var userForms = [];

        for (var index in forms) {
            var currentForm = forms[index];

            if (currentForm.userId === userId) {
                userForms.push(currentForm);
            }
        }

        return userForms;
    }

    function deleteFormFieldById (formId, fieldId) {
        var form = findFormById(formId);

        for (var index in form.fields) {
            if (form.fields._id === fieldId) {
                form.fields.splice(index, 1);
                return true;
            }
        }

        return false;
    }

    function findFieldsForForm(formId) {
        for (var index in forms) {
            if (forms[index]._id === formId) {
                return forms[index].fields;
            }
        }

        return [];
    }
}