module.exports = function (app) {
    var userModel = require("./models/user.model.js")();
    var billModel = require("./models/bill.model.js")();
    var groupModel = require("./models/group.model.js")();

    var userService = require("./services/user.service.server.js")(app,userModel);
    var billService = require("./services/bill.service.server.js")(app,billModel);
    var groupService = require("./services/group.service.server.js")(app,groupModel);
};