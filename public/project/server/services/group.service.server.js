module.exports = function(app, groupModel) {
    app.post("/api/project/group", createGroup);
    app.get("/api/project/group",getAllGroups)
    app.get("/api/project/group?username=username", findGroupsByUser);
    app.put("/api/project/group/:id", updateGroupById);
    app.delete("/api/project/group/:id", deleteGroupById);



    function getAllGroups(req, res) {
        if (req.query.username) {
            findGroupsByUser(req, res);
        }
    }

    // function finds all the users
    function findGroupsByUser(req, res) {
        var name = req.query.username;
        //console.log(name + "in group service server");
        groupModel
            .findGroupsByUser(name)
            .then(
                function(doc){
                    res.json(doc);
                },
                //send error if promise rejected
                function(err){
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
            .updateGroup(groupId, group)
            .then(function (doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                });
    }
}
