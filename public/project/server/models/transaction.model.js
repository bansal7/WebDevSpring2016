module.exports = function() {
    var bills = require("./transaction.mock.json");

    var api = {
        findBillByCredentials : findBillByCredentials,
        findAllBills : findAllBills,
        createBill : createBill,
        deleteBillById : deleteBillById,
        updateBill : updateBill
    }

    return api;

    // funtion finds the user based on email and password
    function findBillByCredentials (username, password){
        var bill = null;
        for(var index in bills){
            if(bills[index].username==username && bills[index].password==password){
                bill = bills[index];
                break;
            }
        }

        return bill;

    }

    // function finds all the users
    function findAllBills() {
       return bills;
    }

    // function creates a new user
    function createBill(bill){
        bills.push(bill);
        return bill;
    }

    // function deletes a bill
    function deleteBillById(billId){
        for(var index in bills){
            if(bills[index]._id==billId){
                bills.splice(index,1);
                break;
            }
        }

        return bills;
    }

    // function updates a user entry
    function updateBill(billId,bill){
        for(var index in bills){
            if(bills[index]._id==billId){
                bills[index] = bill;
                return  bills[index];
                break;
            }
        }
    }
}
