(function(){
    "use script";
    angular
        .module("SplitUpApp")
        .factory("BillService", BillService);

    function BillService($rootScope) {

        // stores the data about all the users
        var bills = {};

        bills= [
            {	"_id":123, "name1":"Alice",            "name2":["Alice","Bob","Charlie"],
                "amount":"20.25",  "desc":"Grocery" },
            {	"_id":234, "name1":"John",            "name2":["John","Kevin","Charlie"],
                "amount":"30.25",  "desc":"Saturday Night" },
            {	"_id":345, "name1":"Charlie",            "name2":["Charlie","Tom","Charlie"],
                "amount":"10",  "desc":"Party" },
            {	"_id":456, "name1":"Alice",            "name2":["Alice"],
                "amount":"15",  "desc":"Movie" },
        ];

        var api = {
            findBillByCredentials : findBillByCredentials,
            findAllBills : findAllBills,
            createBill : createBill,
            deleteBillById : deleteBillById,
            updateBill : updateBill
        }

        return api;

        // funtion finds the user based on email and password
        function findBillByCredentials (username, password, callback){
            var bill = null;
            for(var index in bills){
                if(bills[index].username==username && bills[index].password==password){
                    bill = bills[index];
                    break;
                }
            }

            callback(user);

        }

        // function finds all the users
        function findAllBills(callback) {
            callback(bills);
        }

        // function creates a new user
        function createBill(bill,callback){
            bills.push(bill);
            callback(bill);
        }

        // function deletes a user
        function deleteBillById(billId,callback){
            for(var index in bills){
                if(bills[index]._id==billId){
                    bills.splice(index,1);
                    break;
                }
            }

            callback(bills);
        }

        // function updates a user entry
        function updateBill(billId,bill,callback){
            for(var index in bills){
                if(bills[index]._id==billId){
                    bills[index] = bill;
                    callback(bills[index]);
                    break;
                }
            }
        }
    }
})();