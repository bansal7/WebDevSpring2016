module.exports = function (app, model) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.put("/api/assignment/user/:id", updateUserById);

    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        user = model.updateUser(id, user);

        if(user) {
            res.json(user);
            return;
        }
        res.send(null);
    }

    function createUser (req, res) {
        var user = req.body;
        var now = new Date();
        user._id = now.getTime();
        res.send (model.createUser(user));
    }

    function getAllUsers (req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            var credentials = {
                username: username,
                password: password
            };
            var user = model.findUserByCredentials(credentials);

            if (user) {
                res.json(user);
                return;
            }
            res.send(null);
        }
        else {
            var users = model.findAllUsers();
            res.json(users);
        }
    }

    function getUserById (req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if(user) {
            res.json(user);
            return;
        }
        res.send(null);
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id);

        res.json (model.findAllUsers());
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        var user = model.findUserByUsername(username);

        if(user) {
            res.json(user);
            return;
        }
        res.send(null);
    }

    function getUserByCredentials(req, res) {
        //console.log("Inside user by credentials");
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = model.findUserByCredentials(credentials);

        if (user) {
            res.json(user);
            return;
        }
        res.send(null);
    }
}