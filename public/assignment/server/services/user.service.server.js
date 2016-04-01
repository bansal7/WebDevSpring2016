module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout",logout);


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
        console.log(newUser);
        userModel
            .createUser(newUser)
            .then(function(response){
                //console.log(response + "   in service server");
                var user = response;
                req.session.currentUser = user;
                res.json(user);
            });

    }

    function getUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function(response){
                res.json(response);
            });
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function(response){
                var user = response.data;
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var user = req.body;
        var userId = req.params.id;
        userModel
            .updateUser(userId, user)
            .then(function(response){
                res.json(response.data);
            });
    }

    function getUserByCredentials(req, res) {
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        userModel
            .findUserByCredentials(cred)
            .then(function(response){
                //console.log(response);
                //console.log(response.data);
                var user = response;
                req.session.currentUser = user;
                res.json(user);
            });
    }

    function getUserByUsername(req, res) {
        var uName = req.query.username;
        userModel
            .findUserByUsername(uName)
            .then(function(response){
                res.json(response.data);
            });
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        userModel
            .deleteUserById(id)
            .then(function(response){
                res.json(response.data);
            });
    }

    function loggedin(req,res){
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }
};
