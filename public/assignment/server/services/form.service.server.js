module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res) {
        var id = req.params.userId;
        //console.log(id + "in service server");
        formModel
            .findFormsByUserId(id)
            .then(function(response){
                //console.log(response + " after calling model");
                var userForms = response;
                res.json(userForms);
                //console.log(userForms);
            });
        //console.log(userForms);

    }

    function getFormById(req, res) {
        var id = req.params.formId;

        formModel
            .findFormById(id)
            .then(function(response){
                console.log(response);
                var forms = response;
                res.json(forms);
            });
    }

    function deleteFormById(req, res) {
        var id = req.params.formId;
        formModel
            .deleteFormById(id)
            .then(function(response){
                res.send(200);
            });

    }

    function createFormForUser(req, res) {
        //console.log("recieved request and building user");
        var userId = req.params.userId;
        var form = req.body;

        formModel
            .createFormForUser(userId, form)
            .then(function(response){
                res.json(response);
            });
    }

    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        formModel
            .updateForm(id, form)
            .then(function(response){
                res.send(200);
            });

    }
};