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

    function findFormsByUserId (userId) {
        //console.log("Ho userid in model  " + userId);
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


    function findFormById(id) {
        return forms.findById(id);
    }

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

    function updateForm (id, form) {
        var deferred = q.defer();
        forms
            .update (
                {_id: id},
                {$set: {
                    title : form.title,
                    fields : form.fields
                }},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                        //console.log(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function createField(formId, field) {
        var form = null;
        //console.log(formId);
        var deferred = q.defer();
        //field._id = (new Date()).getTime();
        forms
            .find(
                {_id: formId},
                function (err, forms) {
                    if (!err) {
                        form = forms[0];
                        form.fields.push(field);
                        return form.save();
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        deferred.resolve(field);
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();
        var form = null;
        var fields;
        forms.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];

                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields.splice(i,1);
                        break;
                    }
                }

                forms.update(
                    {_id : formId},

                    {$set: {
                        fields : form.fields
                    }},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(form);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.reject(err);
            }
        });

        deferred.resolve(fields);
        return deferred.promise;}

    function findField(formId, fieldId) {
        var deferred = q.defer();
        var form = null;
        var fields;
        forms.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];
                for(var i in form.fields){
                    if(form.fields[i]._id==fieldId){
                        deferred.resolve(form.fields[i]);
                    }
                }
            }
            else{
                deferred.resolve([]);
            }
        });
        return deferred.promise;
    }

    function findFieldsByFormId (formId) {
        //console.log("Ho formId in model  " + formId);
        var deferred = q.defer ();
        forms
            .find(
                {_id: formId},
                function (err, forms) {
                    if (!err) {
                        deferred.resolve(forms[0].fields);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();
        var form = null;
        var fields;
        forms
            .find(
                {_id: formId},
                function (err, results) {
                    if (!err) {
                        //deferred.resolve(forms[0]);
                        form = results[0];
                        //console.log("fssfd" + form);
                        for (var index in form.fields){
                            if(form.fields[index]._id == fieldId){
                                form.fields[index] = field;
                                forms
                                    .update(
                                        {_id: formId},
                                        {$set: {
                                            fields : form.fields
                                        }},
                                        function (err, forms) {
                                            if (!err) {
                                                deferred.resolve(form);
                                            } else {
                                                deferred.reject(err);
                                            }
                                        }
                                    );
                            }
                        }
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        //fields = form.fields;

        return deferred.promise;
    }
};