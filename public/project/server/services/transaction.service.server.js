module.exports = function(app, transactionModel) {
    app.post("/api/project/transaction", createTransaction);
    //app.get("/api/project/transaction?username=username&password=password", getUserByCredentials);
    app.get("/api/project/transaction", getTransactions);
    app.get("/api/project/user/:id", getTransactionById);
    //app.get("/api/project/user?username=username", getUserByUsername);
    app.put("/api/project/transaction/:id", updateTransactionById);
    app.delete("/api/project/transaction/:id", deleteTransactionById);


    function createTransaction(req, res) {
        var newTransaction = req.body;
        var Transaction = transactionModel.createTransaction(newTransaction);
        res.json(Transaction);
    }

    function getTransactions(req, res) {
        res.json(transactionModel.findAllTransactions());
    }

    function getTransactionById(req, res) {
        var transactionId = req.params.id;
        var transaction = transactionModel.findTransactionById(transactionId);
        res.json(transaction);
    }

    function updateTransactionById(req, res) {
        var transaction = req.body;
        var transactionId = req.params.id;
        res.json(transactionModel.updateTransaction(transactionId, transaction));
    }

    function deleteTransactionById(req, res) {
        var id = req.params.id;
        res.json(transactionModel.deleteTransactionById(id));

    }
};
