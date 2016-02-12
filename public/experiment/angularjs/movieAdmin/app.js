(function(){
    angular
        .module("MovieAdminApp",[])
        .controller("MovieController", MovieController);

    function MovieController($scope){
        $scope.movies = [
            {id:123, title:"Star Wars", director: "JJ Adams"},
            {id:234, title:"Blade Runner", director: "Alice Wonder"},
            {id:345, title:"Aliens", director: "James Dawn"}

        ];

        $scope.addMovie = function(movie){
            // $scope.title when we have id on the element as title
            // $scope.movie.title is the OO approach for the movie object having title function as its id
         //   console.log("addMovie: " + movie.title);

            var newMovie = {
                id:movie.id,
                title:movie.title,
                director:movie.director
            }
            $scope.movies.push(newMovie);

            $scope.movie= {};
        }
    }
})();