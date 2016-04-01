var q = require("q");

module.exports = function (app,uuid,mongoose,db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var forms = mongoose.model("form", FormSchema);
    var api = {
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };
    return api;



    function createField(formId, field) {
        //var form = null;
        //console.log(formId);
        var deferred = q.defer();
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
        deferred.resolve(field);
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();
        var form;
        var fields;
        for (var f in forms) {
            if (forms[f]._id == formId) {
                form = forms[f];
            }
        }
        //form = findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                fields.splice(f, 1);
            }
        }

        deferred.resolve(fields);
        return deferred.promise;}

    function findField(formId, fieldId) {
        var deferred = q.defer();
        var form;
        var fields;
        for (var f in forms) {
            if (forms[f]._id == formId) {
                form = forms[f];
            }
        }
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                deferred.resolve(fields[f]);
            }
        }
        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        var deferred = q.defer();
        var form;
        console.log(formId);
        for (var f in forms) {
            if (forms[f]._id == formId) {
                form = forms[f];
            }
        }
        console.log(form);
        deferred.resolve(form.fields);
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();
        var form;
        var fields;
        for (var f in forms) {
            if (forms[f]._id == formId) {
                form = forms[f];
            }
        }
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                fields[f] = field;
            }
        }
        deferred.resolve(fields);
        return deferred.promise;
    }
};