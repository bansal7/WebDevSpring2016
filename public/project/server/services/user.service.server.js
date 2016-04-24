module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user?username=username&password=password", getUserByCredentials);
    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.get("/api/project/setToken/:token",setToken);
    app.get("/api/project/getToken/",getToken);
    app.get ("/api/user/search/:firstName", searchUser);

    function searchUser(req, res) {

        var firstName = req.params.firstName;
        console.log(firstName);
        userModel
            .searchUser(firstName)
            .then(
                function(developers){
                    res.json(developers);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


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

    function getToken(req,res){
        console.log("rssd  " + req.session.token);
        res.json(req.session.token);
    }

    function setToken(req,res){
        //console.log(req.params.token);
        userModel.setToken(req.params.token)
            .then(function(response){
                req.session.token = req.params.token;
                console.log(req.session.token);
                res.json();
                console.log(" after model " + req.session.token);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(
                function(doc){
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
    }

    function getUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(doc){
                    res.json(doc);
                },
                //send error if promise rejected
                function(err){
                    res.status(400).send(err);
                });
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.send(user);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateUserById(req, res) {
        var user = req.body;
        var userId = req.params.id;
        userModel
            .updateUser(userId, user)
            .then(function(doc){
                    res.json(doc);
                },
                //send error if promise rejected
                function(err){
                    res.status(400).send(err);
                });
    }

    function getUserByCredentials(req, res) {
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        //console.log("I am in user service in server" + cred);
        userModel
            .findUserByCredentials(cred)
            .then(function(doc){
                    //console.log("in user service server   "+doc);
                    req.session.currentActor = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getUserByUsername(req, res) {
        var uName = req.query.username;
        res.json(userModel.findUserByUsername(uName));
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        userModel
            .deleteUserById(id)
            .then(function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function loggedin(req, res) {
        res.json(req.session.currentActor);
    }
};
