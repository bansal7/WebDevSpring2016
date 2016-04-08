module.exports = function (app,db,mongoose) {
    var userModel = require("./models/user.model.js")(app,db,mongoose);
    var billModel = require("./models/bill.model.js")(app,db,mongoose);
    var groupModel = require("./models/group.model.js")(app,db,mongoose);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var billService = require("./services/bill.service.server.js")(app,billModel);
    var groupService = require("./services/group.service.server.js")(app,groupModel);
};