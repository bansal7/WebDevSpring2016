(function(){
    angular
        .module("SplitUpApp")
        .controller("TransactionController",TransactionController);

    function TransactionController($scope, $http, UserService) {

        //$scope.search = search;
        function init(){
            var token = UserService.getToken();

            var URL="https://www.buxfer.com/api/transactions?&token="+ token;

            var req = {
                method: 'POST',
                url: "/api/transactions",
                data: URL,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $http(req).success(renderTransactions);
        }

        init();
        function renderTransactions(response){
            var transactions = (response.response.transactions);

            $scope.data = transactions;
        }
    }
})();