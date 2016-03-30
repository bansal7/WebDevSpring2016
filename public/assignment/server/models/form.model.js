var q = require("q");

module.exports = function (app,uuid,mongoose,db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var forms = mongoose.model("form", FormSchema);
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

    //function findFormByTitle(title) {
    //    var deferred = q.defer();
    //    for (var f in forms) {
    //        if (forms[f].title == title) {
    //            deferred.resolve(forms[f]);
    //        }
    //    }
    //    return deferred.promise;
    //}

    function findFormByTitle (title) {
        var deferred = q.defer ();
        forms
            .findOne (
                {title: title},
                function (err, form) {
                    if (!err) {
                        deferred.resolve(form);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    //function findFormsByUserId(userId) {
    //    console.log("Ho userid   " + userId);
    //    var deferred = q.defer();
    //    var userForms = [];
    //    for (var f in forms) {
    //        if (forms[f].userId == userId) {
    //            userForms.push(forms[f]);
    //           // console.log("fgxfxf")
    //        }
    //    }
    //    console.log("findFormsByUserId " + userForms);
    //    deferred.resolve(userForms);
    //    return deferred.promise;
    //}

    function findFormsByUserId (userId) {
        console.log("Ho userid in model  " + userId);
        var deferred = q.defer ();
        var userForms = [];
        forms
            .find(
                {userId: userId},
                function (err, form) {
                    if (!err) {
                        deferred.resolve(form);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }

    //function findFormById (id) {
    //    //console.log("inside form by Id :" + id);
    //    var deferred = q.defer();
    //    for (var f in forms) {
    //        if (forms[f]._id == id) {
    //            deferred.resolve(forms[f]);
    //        }
    //    }
    //    return deferred.promise;
    //}

    function findFormById(id) {
        return forms.findById(id);
    }

    //function findAllForms () {
    //    var deferred = q.defer();
    //    deferred.resolve(forms);
    //    return deferred.promise;
    //}

    function findAllForms () {
        var deferred = q.defer ();
        forms.find (
            function (err, forms) {
                if (!err) {
                    deferred.resolve (forms);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    //function deleteFormById (id) {
    //    var deferred = q.defer();
    //    for (var f in forms) {
    //        if (forms[f]._id == id) {
    //            forms.splice(f, 1);
    //        }
    //    }
    //    deferred.resolve(forms);
    //    return deferred.promise;
    //}

    function deleteFormById (id) {
        var deferred = q.defer();
        forms
            .remove (
                {_id: id},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    //function createFormForUser (userId, newForm) {
    //    var deferred = q.defer();
    //    var nForm = {
    //        _id: "ID_" + (new Date).getTime(),
    //        title: newForm.title,
    //        userId: userId,
    //        fields: []
    //    };
    //    forms.push(nForm);
    //    deferred.resolve(forms);
    //    return deferred.promise;
    //}

    function createFormForUser (userId, newForm){
        var deferred = q.defer();
        var nForm = {
            title: newForm.title,
            userId: userId,
            fields: []
        };
        forms.create(nForm, function (err, doc) {
            if (err) {
                deferred.reject (err);
            } else {
                deferred.resolve (doc);
            }
        });
        return deferred.promise;
    }

    //function updateForm (id, form) {
    //    var deferred = q.defer();
    //    var updatedForm = null;
    //    for(var index in forms){
    //        if(forms[index]._id==id){
    //            forms[index]._id = id;
    //            forms[index] = form;
    //
    //            //console.log(user);
    //            updatedForm = forms[index];
    //            //console.log(users[index]);
    //            break;
    //        }
    //    }
    //    deferred.resolve(updatedForm);
    //    return deferred.promise;
    //}

    function updateForm (id, form) {
        var deferred = q.defer();
        forms
            .update (
                {_id: id},
                {$set: form},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                        console.log(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

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