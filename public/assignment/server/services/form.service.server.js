module.exports = function (app, model) {

    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    function updateFormById (req, res) {
        var id = req.params.formId;
        var form = req.body;
        form = model.updateUser(id, form);

        if(form) {
            res.json(form);
            return;
        }
        res.send(null);
    }

    function createForm (req, res) {
        var userId = req.params.userId;
        var now = new Date();
        var form = req.body;
        form._id = now.getTime();
        form.userId = userId;

        res.send (model.createUser(form));
    }

    function getFormsForUser (req, res) {
        var userId = req.params.userId;
        var forms = model.findFormsForUser(userId);
        res.json(forms);
    }

    function getFormById (req, res) {
        var id = req.params.formId;
        var form = model.findUserById(id);
        if(form) {
            res.json(form);
            return;
        }
        res.send(null);
    }

    function deleteFormById (req, res) {
        var id = req.params.formId;
        model.deleeUser(id);

        res.json (model.findAllUsers());
    }
}