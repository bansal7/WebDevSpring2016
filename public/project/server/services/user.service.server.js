module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user?username=username&password=password", getUserByCredentials);
    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);


    function getAllUsers(req, res) {
        if (req.query.username && req.query.password) {
            getUserByCredentials(req, res);
        }
        else if (req.query.username) {
            getUserByUsername(req, res);
        }
        else {
            getUsers(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        var user = userModel.createUser(newUser);
        res.json(user);
    }

    function getUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUserById(req, res) {
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUser(userId, user));
    }

    function getUserByCredentials(req, res) {
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
    }

    function getUserByUsername(req, res) {
        var uName = req.query.username;
        res.json(userModel.findUserByUsername(uName));
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUserById(id));

    }
};
