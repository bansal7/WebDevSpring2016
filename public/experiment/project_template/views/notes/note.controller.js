(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .controller("NoteController",NoteController);

    function NoteController($scope,NoteService) {

        $scope.data = {};
        NoteService.findAllNotes(renderGroups);



        // renders all the forms of the logged in user
        function renderGroups(response) {
            //console.log(response);
            $scope.data = response;
        }

        $scope.addNote = addNote;
        $scope.updateNote = updateNote;
        $scope.deleteNote = deleteNote;
        $scope.selectNote= selectNote;
        $scope.selectedIndex = -1;

        // function that adds a new form to the users' list
        function addNote(name,comments) {
            if (name != null && comments != null){
                var newNote = {
                    "_id" : (new Date).getTime(),
                    "name": name,
                    "comments" : comments
                }

                NoteService.createNote(newNote,renderAddNote)
            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Comments cannot be empty")
            }
        }

        // function that actually adds a form after getting a response from the service
        function renderAddNote(response){
            //console.log(response)
            //$scope.data.push(response);
            $scope.name= null;
            $scope.comments= null;
        }

        // function that updates a form of the user
        function updateNote(name,comments) {
            if ((name != null && comments != null) && $scope.selectedIndex != -1) {
                var note = $scope.data[$scope.selectedIndex];
                var newNote = {
                    "_id": note._id,
                    "name": name,
                    "comments": comments
                }

                NoteService.updateNote(note._id, newNote, renderUpdateNote)

            }
            else {
                alert("Please Enter a proper value in the fields.\nNames and Comments cannot be empty")
            }
        }

        // function that actually updates a form afer getting response from the service
        function renderUpdateNote(response){
            //$scope.data[$scope.selectedIndex] = response;
            //console.log(response);
            $scope.name= null;
            $scope.comments= null;
            $scope.selectedIndex = -1;
        }

        // function that deletes a form
        function deleteNote(index){
            var note = $scope.data[index];

            NoteService.deleteNoteById(note._id,renderDeleteNote)
        }

        // function that actually deletes the form and gets the rest of the form from the service
        function renderDeleteNote(response){
            //$scope.data = response;
        }

        // function that selects the form to be updated
        function selectNote(index) {
            $scope.selectedIndex = index;
            var note = $scope.data[index];
            $scope.name= note.name;
            $scope.comments= note.comments;
        }
    }
})();