module.exports = function(app, groupModel) {
    app.post("/api/project/group", createGroup);
    app.get("/api/project/group", findAllGroups);
    app.put("/api/project/group/:id", updateGroupById);
    app.delete("/api/project/group/:id", deleteGroupById);


    // function finds all the users
    function findAllGroups(req, res) {
        groupModel
            .findAllGroups()
            .then(
                function (doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }

    // function creates a new user
    function createGroup(req, res) {
        var newGroup = req.body;
        groupModel
            .createGroup(newGroup)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // function deletes a user
    function deleteGroupById(req, res) {
        var id = req.params.id;
        groupModel
            .deleteGroupById(id)
            .then(function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    // function updates a user entry
    function updateGroupById(groupId, group) {
        var group = req.body;
        var groupId = req.params.id;
        groupModel
            .updateUser(groupId, group)
            .then(function (doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }
}
