"use strict";

(function(){
    angular
        .module("SplitUpApp")
        .controller("AddTransactionController", AddTransactionController);

    function AddTransactionController($scope, $http, UserService,$location) {

        var vm = this;
        vm.addTransaction = addTransaction;

        function addTransaction(transaction){
            var token = UserService.getToken();
            console.log("Inside Transaction Controller ... here iss the token   " + token);

            var URL="https://www.buxfer.com/api/add_transaction?&token="+ token;

            if(transaction.share) {
                var a = URL + "&format=sms&text=" + transaction.description + " " + transaction.amount + " with: " + transaction.share + " date: " +
                    transaction.date.toISOString().substr(0,10);
            }
            else {
                var a = URL + "&format=sms&text=" + transaction.description + " " + transaction.amount +  " date: " +
                    transaction.date.toISOString().substr(0,10);
            }
            var req = {
                method: 'POST',
                url: "/api/add_transactions",
                data: a,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $http(req).success(renderTransactions);
        }

        function renderTransactions(response){
            if(response.response.status == "OK"){
                $location.path("/searchtransactions");
            }
        }
    }
})();