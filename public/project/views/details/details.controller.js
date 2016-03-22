(function(){
    angular
        .module("SplitUpApp")
        .controller("DetailsController",DetailsController);

    //var id = null;

    function DetailsController($routeParams,$http,$scope,UserService) {
        var tid = $routeParams.id;
        //id = tid;
        //UserService.setTransactionId(tid);
        var token = UserService.getToken();
        var URL = "https://www.buxfer.com/api/transactions?&token=" + token;
        var req = {
            method: 'POST',
            url: "/api/transactions",
            data: URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };

        $http(req).success(renderTransaction);


        function renderTransaction(response) {
            //var tid = UserService.getTransactionId();
            var transactions = (response.response.transactions);
            for (var index = 0; index < response.response.numTransactions; index++) {
                if (transactions[index].id = tid) {
                    $scope.transaction = transactions[index];
                    break;
                }
                else {
                    console.log("Error in renderTransaction");
                }
            }

        }
    }


})();