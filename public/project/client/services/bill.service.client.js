(function(){
    "use script";
    angular
        .module("SplitUpApp")
        .factory("BillService", BillService);

    function BillService($http) {

        var api = {
            findBillsByUsername : findBillsByUsername,
            findAllBills : findAllBills,
            createBill : createBill,
            deleteBillById : deleteBillById,
            updateBill : updateBill
        }

        return api;

        // function finds the bill based on email and password
        function findBillsByUsername (username){
            return $http.get("/api/project/bill?username=" + username);
        }

        // function finds all the bills
        function findAllBills() {
            return $http.get("/api/project/bill");
        }

        // function creates a new bill
        function createBill(bill){
            return $http.post("/api/project/bill", bill);
        }

        // function deletes a bill
        function deleteBillById(billId){
            return $http.delete("/api/project/bill/" + billId);
        }

        // function updates a bill entry
        function updateBill(billId,bill){
            return $http.put("/api/project/bill/" + billId, bill);
        }
    }
})();