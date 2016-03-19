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
        fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formId;
        var fieldId;
        var field;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        field = formModel.findField(formId, fieldId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        var formId;
        var fieldId;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        formModel.deleteField(formId, fieldId);
        res.send(200);
    }

        function addFieldToForm(req, res) {
            var formId = req.params.formId;
            var newField = req.body;
            newField._id = (new Date()).getTime();
            field = formModel.createField(formId, newField);
            res.json(field);
    }

    function updateFieldById(req, res) {
        var fieldId;
        var formId;
        var field;
        var r;
        field = req.body;
        fieldId = req.params.fieldId;
        formId = req.params.formId;
        r = formModel.updateField(formId, fieldId, field);
        res.json(r);
    }
};