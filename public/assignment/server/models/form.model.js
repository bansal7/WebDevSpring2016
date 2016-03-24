var forms = require("./form.mock.json");
module.exports = function (app,uuid) {
    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };
    return api;

    function findFormByTitle(title) {
        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        //console.log("Ho dkfbsjfd");
        var userForms = [];
        for (f in forms) {
            if (forms[f].userId == userId) {
                userForms.push(forms[f]);
            }
        }
        return userForms;
    }

    function findFormById (id) {
        //console.log("inside form by Id :" + id);
        for (var f in forms) {
            if (forms[f]._id == id) {
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
            if (forms[f]._id == id) {
                forms.splice(f, 1);
            }
        }
        //console.log("form.model.js");
        //console.log(forms);
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
            if (forms[f]._id == id) {
                forms[f] = form;
            }
        }
    }

    function createField(formId, field) {
        //var form = null;
        //console.log(formId);
        field._id = (new Date()).getTime();
        for (var f in forms) {
            if (forms[f]._id == formId) {
                //form = forms[f];
                break;
            }
        }
        //console.log(forms);
        //form =  findFormById(formId);
        forms[f].fields.push(field);
        //console.log("inside model " + field.type);
        return field;
    }

    function deleteField(formId, fieldId) {
        var form;
        var fields;
        form = findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                fields.splice(f, 1);
            }
        }
    }

    function findField(formId, fieldId) {
        var form;
        var fields;
        form = findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                return fields[f];
            }
        }
    }

    function findFieldsByFormId(formId) {
        var form;
        //console.log(formId);
        form = findFormById(formId);
        return form.fields;
    }

    function updateField(formId, fieldId, field) {
        var form;
        var fields;
        form = findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                fields[f] = field;
            }
        }
    }
};