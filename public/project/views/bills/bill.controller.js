(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("BillController",BillController);

    function BillController($scope,BillService) {

        $scope.data = {};
        BillService.findAllBills(renderBills);



        // renders all the forms of the logged in user
        function renderBills(response) {
            //console.log(response);
            $scope.data = response;
        }

        $scope.addBill = addBill;
        $scope.updateBill = updateBill;
        $scope.deleteBill = deleteBill;
        $scope.selectBill= selectBill;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addBill(name1,name2,amount,desc) {
            if (name1 != null && name2 != null && amount != null && desc != null){
                var newBill = {
                    "_id" : (new Date).getTime(),
                    "name1": name1,
                    "name2" : name2.split(","),
                    "amount" : amount,
                    "desc" : desc
                }

                BillService.createBill(newBill,renderAddBill)
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames, Amount and Description cannot be empty")
            }
        }

        // function that actually adds a form after getting a response from the service
        function renderAddBill(response){
            //console.log(response)
            //$scope.data.push(response);
            $scope.name1= null;
            $scope.name2= null;
            $scope.amount= null;
            $scope.desc= null;
        }

        // function that updates a form of the user
        function updateBill(name1,name2,amount,desc) {
            if ((name1 != null && name2 != null && amount != null && desc != null) && $scope.selectedIndex != -1) {
                var bill = $scope.data[$scope.selectedIndex];
                var newBill = {
                    "_id": bill._id,
                    "name1": name1,
                    "name2": name2.split(","),
                    "amount": amount,
                    "desc": desc
                }
                BillService.updateBill(bill._id, newBill, renderUpdateBill)
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames, Amount and Description cannot be empty")
            }
        }

        // function that actually updates a form afer getting response from the service
        function renderUpdateBill(response){
            //$scope.data[$scope.selectedIndex] = response;
            $scope.name1= null;
            $scope.name2= null;
            $scope.amount= null;
            $scope.desc= null;
            $scope.selectedIndex = -1;
        }

        // function that deletes a form
        function deleteBill(index){
            var bill = $scope.data[index];

            BillService.deleteBillById(bill._id,renderDeleteBill)
        }

        // function that actually deletes the form and gets the rest of the form from the service
        function renderDeleteBill(response){
            //$scope.data = response;
        }

        // function that selects the form to be updated
        function selectBill(index) {
            $scope.selectedIndex = index;
            var bill = $scope.data[index];
            $scope.name1= bill.name1;
            $scope.name2= bill.name2;
            $scope.amount= bill.amount;
            $scope.desc= bill.desc;


        }
    }
})();