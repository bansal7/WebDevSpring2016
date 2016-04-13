(function(){
    angular
        .module("SplitUpApp")
        .controller("TransactionController",TransactionController);

    function TransactionController($scope, $http, UserService) {

        var vm = this;

        //$scope.search = search;
        function init(){
            UserService.getToken()
                .then(function(response){
                    var token = response.data;
                    //console.log("Inside Transaction Controller ... here iss the token   " + token);
                    var URL="https://www.buxfer.com/api/transactions?&token="+ token;

                    var req = {
                        method: 'POST',
                        url: "/api/transactions",
                        data: URL,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    };

                    $http(req).success(renderTransactions);
                });
        }



        init();
        function renderTransactions(response){
            var transactions = (response.response.transactions);
            //console.log(transactions);
            vm.data = transactions;
        }
    }
})();