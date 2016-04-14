module.exports = function (app,db,mongoose,LocalStrategy) {
    var userModel = require("./models/user.model.js")(app,db,mongoose);
    var formModel = require("./models/form.model.js")(app,db,mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel,LocalStrategy);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};