module.exports = function(app,db,mongoose) {
    var BillSchema = require("./bill.schema.server.js")(mongoose);
    var q = require("q");
    var bills = mongoose.model("bill", BillSchema);

    // stores the data about all the users
    var api = {
        findBillsByUserId : findBillsByUserId,
        findAllBills: findAllBills,
        findBillById: findBillById,
        createBill: createBill,
        deleteBillById: deleteBillById,
        updateBill: updateBill
    }

    return api;

    function findBillsByUserId (userId) {
        //console.log("Ho userid in model  " + userId);
        var deferred = q.defer ();
        bills
            .find(
                {userId: userId},
                function (err, bill) {
                    if (!err) {
                        deferred.resolve(bill);
                    } else {
                        deferred.reject(err);
                    }
                }
            );

        return deferred.promise;
    }

// function finds all the bills
    function findAllBills() {
        var deferred = q.defer ();
        bills.find (
            function (err, bills) {
                if (!err) {
                    deferred.resolve (bills);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function findBillById (id) {
        return bills.findById(id)
    }

// function creates a new user
    function createBill(userId,bill) {
        var deferred = q.defer();
        var newBill = {
            description: bill.description,
            userId: userId,
            amount : bill.amount,
            type : bill.type,
            date : bill.date
        };
        bills.create(newBill, function (err, doc) {
            if (err) {
                deferred.reject (err);
            } else {
                deferred.resolve (doc);
            }
        });
        return deferred.promise;
    }

// function deletes a user
    function deleteBillById(billId) {
        var deferred = q.defer();
        bills
            .remove (
                {_id: billId},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;

    }

// function updates a user entry
    function updateBill(billId, bill) {
        var deferred = q.defer();
        bills
            .update (
                {_id: billId},
                {$set: {
                    description : bill.description,
                    userId : bill.userId,
                    amount : bill.amount,
                    type : bill.type,
                    date : bill.date
                }},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                        //console.log(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
};