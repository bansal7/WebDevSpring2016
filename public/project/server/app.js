module.exports = function (app) {
    var userModel = require("./models/user.model.js")();
    //var transactionModel = require("./models/transaction.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    //var transactionService = require("./services/transaction.service.server.js")(app, formModel);
};