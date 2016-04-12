(function(){
    angular
        .module("SplitUpApp")
        .controller("ContactsController",ContactsController);

    //var id = null;

    function ContactsController($routeParams,$http,$scope,UserService) {

        var vm = this;

        function init() {

            //id = tid;
            //UserService.setTransactionId(tid);
            var token = UserService.getToken();
            var URL = "https://www.buxfer.com/api/contacts?&token=" + token;
            var req = {
                method: 'POST',
                url: "/api/contacts",
                data: URL,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };

            $http(req).success(renderContacts);
        }

        init();


        function renderContacts(response) {
            //var cid = $routeParams.id;
            //var number = response.response.numTransactions;
            var contacts = (response.response.contacts);
            console.log(contacts);
            vm.data = contacts;
        }
    }

})();