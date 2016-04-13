(function(){
    "use strict";
    angular
        .module("SplitUpApp")
        .factory("NoteService", NoteService);

    function NoteService($rootScope) {

        // stores the data about all the users
        var notes = {};

        notes= [
            {	"_id":123, "name":"Alice",            "comments":["Sugar and Flour"], },
            {	"_id":234, "name":"Bob",            "comments":["Drinks, Food and Desserts"], },
            {	"_id":345, "name":"John",            "comments":["Movie Tickets and Popcorn"]}
        ];

        var api = {
            findAllNotes : findAllNotes,
            createNote : createNote,
            deleteNoteById : deleteNoteById,
            updateNote : updateNote
        }

        return api;


        // function finds all the users
        function findAllNotes(callback) {
            callback(notes);
        }

        // function creates a new user
        function createNote(note,callback){
            notes.push(note);
            callback(note);
        }

        // function deletes a user
        function deleteNoteById(noteId,callback){
            for(var index in notes){
                if(notes[index]._id==noteId){
                    notes.splice(index,1);
                    break;
                }
            }

            callback(notes);
        }

        // function updates a user entry
        function updateNote(noteId,note,callback){
            for(var index in notes){
                if(notes[index]._id==noteId){
                    notes[index] = note;
                    callback(notes[index]);
                    break;
                }
            }
        }
    }
})();