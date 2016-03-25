module.exports = function(app, billModel) {
    app.post("/api/project/bill", createBill);
    app.get("/api/project/bill", getAllBills);
    app.get("/api/project/bill/:id", getBillById);
    app.get("/api/project/bill?username=username", getBillsByUsername);
    app.put("/api/project/bill/:id", updateBillById);
    app.delete("/api/project/bill/:id", deleteBillById);


    function getAllBills(req, res) {
        if (req.query.username) {
            getBillsByUsername(req, res);
        }
        else {
            getBills(req, res);
        }
    }

    function createBill(req, res) {
        var newBill = req.body;
        billModel
            .createBill(newBill)
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

    function getBills(req, res) {
        billModel
            .findAllBills()
            .then(
                function(doc){
                    res.json(doc);
                },
                //send error if promise rejected
                function(err){
                    res.status(400).send(err);
                });
    }

    function getBillById(req, res) {
        var billId = req.params.id;
        var bill = billModel.findBillById(billId);
        res.json(bill);
    }

    function updateBillById(req, res) {
        var bill = req.body;
        var billId = req.params.id;
        billModel
            .updateBill(billId, bill)
            .then(function(doc){
                    res.json(doc);
                },
                //send error if promise rejected
                function(err){
                    res.status(400).send(err);
                });
    }

    function getBillsByUsername(req, res) {
        var uName = req.query.username;
        billModel
            .findBillsByUsername(uName)
            .then(function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteBillById(req, res) {
        var id = req.params.id;
        billModel
            .deleteBillById(id)
            .then(function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
};