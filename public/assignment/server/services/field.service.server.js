module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function fieldsForFormId(req, res) {
        var formId;
        var fields;
        formId = req.params.formId;
         formModel
            .findFieldsByFormId(formId)
            .then(function(response){
                fields = response;
                res.json(fields);
            });
    }

    function getFieldById(req, res) {
        var formId;
        var fieldId;
        var field;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        formModel
            .findField(formId, fieldId)
            .then(function(response){
                field = response;
                res.json(field);
            });
    }

    function deleteFieldById(req, res) {
        var formId;
        var fieldId;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        formModel
            .deleteField(formId, fieldId)
            .then(function(response){
                res.send(200);
            });
    }

    function addFieldToForm(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        //newField._id = (new Date()).getTime();
        formModel
            .createField(formId, newField)
            .then(function(response){
                var field = response;
                res.json(field);
            });
        //console.log("inside server service " + field);
    }

    function updateFieldById(req, res) {
        var fieldId;
        var formId;
        var field;
        field = req.body;
        fieldId = req.params.fieldId;
        formId = req.params.formId;
        formModel
            .updateField(formId, fieldId, field)
            .then(function(response){
                res.json(response);
            });

    }
};