(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("BillController",BillController);

    function BillController($scope,BillService,UserService) {

        var vm = this;

        vm.data = {};

        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                    var user = response.data;
                    BillService
                        .findBillsByUserId(user._id)
                        .then(function(response){
                            //console.log(response.data);
                            vm.data = response.data;
                        });
                });
            //console.log(user);
        }

        init();

        vm.addBill = addBill;
        vm.updateBill = updateBill;
        vm.deleteBill = deleteBill;
        vm.selectBill= selectBill;
        vm.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addBill(bill) {
            if (bill.description != null && bill.type != null && bill.amount != null && bill.date != null){
                var newBill = {
                    //"_id" : (new Date).getTime(),
                    "description": bill.description,
                    "type" : bill.type,
                    "amount" : bill.amount,
                    "date" : bill.date
                };
                //console.log(newBill);
                //console.log(bill.date);
                UserService.getCurrentUser()
                    .then(function(response) {
                        var user = response.data;
                        BillService
                            .createBill(user._id,newBill)
                            .then(function (response) {
                                if (response) {
                                    //console.log(response);
                                    vm.bill = null;
                                    init();
                                }
                            });
                    });
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames, Amount and Description cannot be empty")
            }
        }

        // function that updates a form of the user
        function updateBill(bill) {
            if ((bill.description != null && bill.type != null && bill.amount != null && bill.date != null) && vm.selectedIndex != -1) {
                var selectedBill = vm.data[vm.selectedIndex];
                var newBill = {
                    "_id": selectedBill._id,
                    "description": bill.description,
                    "type" : bill.type,
                    "amount" : bill.amount,
                    "date" : bill.date
                };
                BillService
                    .updateBill(selectedBill._id, newBill)
                    .then(function(response){
                        if(response) {
                            vm.data[vm.selectedIndex] = response.data;
                            vm.bill = null;
                            vm.selectedIndex = -1;
                        }
                    });
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames, Amount and Description cannot be empty")
            }
        }

        // function that deletes a form
        function deleteBill(index){
            var bill = vm.data[index];

            BillService
                .deleteBillById(bill._id)
                .then(function(response){
                    init();
                });
        }

        // function that selects the form to be updated
        function selectBill(index) {
            vm.selectedIndex = index;
            var selectedBill = vm.data[index];
            vm.bill = {
                description : selectedBill.description,
                type : selectedBill.type,
                amount : selectedBill.amount,
                date : selectedBill.date
            }
        }
    }
})();