module.exports = function (app) {
    var userModel = require("./models/user.model.js")();
    var billModel = require("./models/bill.model.js")();
    //var transactionModel = require("./models/transaction.model.js")();

    var userService = require("./services/user.service.server.js")(app,userModel);
    var billService = require("./services/bill.service.server.js")(app,billModel);
    //var transactionService = require("./services/transaction.service.server.js")(app, formModel);
};