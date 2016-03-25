module.exports = function() {
    var bills = require("./bill.mock.json");
    var q = require("q");

    // stores the data about all the users
    var api = {
        findBillsByUsername: findBillsByUsername,
        findAllBills: findAllBills,
        findBillById: findBillById,
        createBill: createBill,
        deleteBillById: deleteBillById,
        updateBill: updateBill
    }

    return api;


    function findBillsByUsername(username) {
        var deferred = q.defer();
        var userBills = [];
        for (var index in bills) {
            if (bills[index].username == username) {
                userBills.push(bills[index]);
            }
        }
        deferred.resolve(userBills);
        return deferred.promise;
    }

// function finds all the users
    function findAllBills(callback) {
        callback(bills);
    }

    function findBillById (id) {
        //console.log(users);
        for (var index in users) {
            if (users[index]._id == id) {
                return users[index];
                //console.log(users[index]);
            }
        }
        return null;
    }

// function creates a new user
    function createBill(bill) {
        var deferred = q.defer();

        bills.push(bill);

        deferred.resolve(bills);
        return deferred.promise;
    }

// function deletes a user
    function deleteBillById(billId) {
        var deferred = q.defer();

        for (var index in bills) {
            if (bills[index]._id == billId) {
                bills.splice(index, 1);
                break;
            }
        }
        deferred.resolve(bills);
        return deferred.promise;

    }

// function updates a user entry
    function updateBill(billId, bill) {
        var deferred = q.defer();
        var updatedBill = null;
        for (var index in bills) {
            if (bills[index]._id == billId) {
                bills[index] = bill;
                updatedBill = bills[index];
                break;
            }
        }
        deferred.resolve(updatedBill);
        return deferred.promise;
    }
};