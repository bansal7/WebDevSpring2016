var forms = require("./form.mock.json");
module.exports = function (app) {
    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId
    };
    return api;

    function findFormByTitle(title) {
        for (var f in forms) {
            if (forms[f].title === title) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        console.log("Ho dkfbsjfd");
        var userForms = [];
        for (f in forms) {
            if (forms[f].userId == userId) {
                userForms.push(forms[f]);
            }
        }
        return userForms;
    }

    function findFormById (id) {
        for (var f in forms) {
            if (forms[f]._id === id) {
                return forms[f];
            }
        }
        return null;
    }

    function findAllForms () {
        return forms;
    }

    function deleteFormById (id) {
        for (var f in forms) {
            if (forms[f]._id === id) {
                forms.splice(f, 1);
            }
        }
        console.log("form.model.js");
        console.log(forms);
    }

    function createFormForUser (userId, newForm) {
        var nForm = {
            _id: "ID_" + (new Date).getTime(),
            title: newForm.title,
            userId: userId,
            fields: []
        };
        forms.push(nForm);
        return forms;
    }

    function updateForm (id, form) {
        for (var f in forms) {
            if (forms[f]._id === id) {
                forms[f] = form;
            }
        }
    }
};